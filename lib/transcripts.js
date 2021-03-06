import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";
import { getMarkdownAsHTML } from "./helpers";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export async function getAllTranscriptData(onlySearchable, cb) {
  const transcripts = onlySearchable
    ? await ref
        .collection("transcripts")
        .where("searchable", "==", true)
        .get()
    : await ref.collection("transcripts").get();

  const data = [];
  transcripts.forEach((doc) => {
    if (doc && doc.data().searchable) {
      data.push({ ...doc.data(), id: doc.id });
    }
  });

  if (cb) cb(data);
  return data;
}

export async function getAllFlaggedTranscripts() {
  const transcripts = await ref
    .collection("transcripts")
    .where("flagged", "==", true)
    .get();

  const data = [];

  transcripts.forEach((doc) => {
    if (doc) {
      const {
        // eslint-disable-next-line no-unused-vars
        transcript,
        // eslint-disable-next-line no-unused-vars
        flagged,
        // eslint-disable-next-line no-unused-vars
        searchable,
        creatorLink,
        creatorName,
        link,
        name,
        ...doc_data
      } = doc.data();

      data.push({
        transcriptLink: { link: doc.id, name },
        source: { name, link },
        creator: { name: creatorName, link: creatorLink },
        id: doc.id,
        ...doc_data,
      });
    }
  });

  return data;
}

export async function getTranscriptList(sortByRecency, limit) {
  const transcripts = sortByRecency ?
    await ref
      .collection("transcripts")
      .orderBy("publishDate", "desc") :
    await ref
      .collection("transcripts")
      .orderBy("name");

  return transcripts
    .get()
    .then((transcriptsSnapshot) => {
      const data = [];
      let count = 0;
      transcriptsSnapshot.forEach((doc) => {
        if (!limit || count < limit) {
          /* only get searchable */
          if (doc && doc.data().searchable) {
            data.push({
              id: doc.id || null,
              name: doc.data().name || null,
              creatorName: doc.data().creatorName || null,
              hashtags: doc.data().hashtags || []
            });
            count++;
          }
        }
      });
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getTranscriptListByIds(ids, onlySearchable) {
  const data = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const doc = await ref.collection("transcripts").doc(id).get();
    if (doc.exists && (!onlySearchable || doc.data().searchable)) {
      data.push({
        id: doc.id || null,
        name: doc.data().name || null,
        creatorName: doc.data().creatorName || null,
        hashtags: doc.data().hashtags || []
      });
    }
  }
  return data;
}

export async function getTranscriptListByUserId(uid, onlySearchable) {
  const transcripts = await ref
    .collection("transcripts")
    .where("uid", "==", uid)
    .get();

  const data = [];

  transcripts.forEach((doc) => {
    if (doc.exists && (!onlySearchable || doc.data().searchable)) {
      data.push({
        id: doc.id || null,
        name: doc.data().name || null,
        creatorName: doc.data().creatorName || null,
        hashtags: doc.data().hashtags || [],
        searchable: doc.data().searchable
      });
    }
  });

  return data;
}

export async function getAllTranscriptIds() {
  const transcripts = await ref.collection("transcripts").get();
  return transcripts.forEach((doc) => ({
    params: { id: doc.id },
  }));
}

// Generic function to get transcript data from DB
// Don't return all info b/c don't need to
export async function getTranscriptData(id) {
  const doc = await ref.collection("transcripts").doc(id).get();
  if (!doc.exists) return null;
  else {
    const contentHtml = await getMarkdownAsHTML(doc.data().transcript);
    return {
      id: id,
      name: doc.data().name,
      contentHtml,
      link: doc.data().link,
      hashtags: doc.data().hashtags,
      creatorName: doc.data().creatorName || null,
      creatorLink: doc.data().creatorLink || null,
      uid: doc.data().uid || null,
      searchable: doc.data().searchable || false
    };
  }
}

export async function createTranscript(url, data, successCB, failCB) {
  // add to transcript collection
  const docRef = await ref.collection("transcripts").doc(url);
  const doc = await docRef.get();

  if (!doc.exists) {
    await docRef.set(data);
    if (successCB) successCB();
  } else if (failCB) {
    failCB();
  }
}

export async function updateTranscript(url, data, successCB, failCB) {
  // add to transcript collection
  const docRef = await ref.collection("transcripts").doc(url);
  return docRef.update(data)
    .then(successCB)
    .catch(failCB);
}
