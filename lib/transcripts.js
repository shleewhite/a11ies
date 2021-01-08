import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";
import { getMarkdownAsHTML } from "./helpers";
import { addHashtagData } from "./hashtags";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export async function getAllTranscriptData(onlySearchable, cb) {
  const transcripts = onlySearchable
    ? await ref
        .collection("transcripts")
        .where("searchable", "==", true)
        .orderBy("name")
        .get()
    : await ref.collection("transcripts").orderBy("name").get();

  const data = [];
  transcripts.forEach((doc) => {
    if (doc) {
      data.push({ ...doc.data(), url: doc.id });
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

export async function getTranscriptList(limit) {
  // todo, order by date
  const transcripts = limit
    ? await ref
        .collection("transcripts")
        .where("searchable", "==", true)
        .limit(parseInt(limit, 10))
    : await ref.collection("transcripts").where("searchable", "==", true);

  return transcripts
    .get()
    .then((transcriptsSnapshot) => {
      const data = [];
      transcriptsSnapshot.forEach((doc) => {
        if (doc) {
          data.push({
            id: doc.id || null,
            name: doc.data().name || null,
            hashtags: doc.data().hashtags || [],
          });
        }
      });
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
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
      name: doc.data().name,
      contentHtml,
      link: doc.data().link,
      hashtags: doc.data().hashtags,
      creatorName: doc.data().creatorName || null,
      creatorLink: doc.data().creatorLink || null,
    };
  }
}

export async function getTranscriptsData(ids) {
  const data = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const doc = await ref.collection("transcripts").doc(id).get();
    if (doc.exists && doc.data().searchable) {
      data.push({
        id: doc.id || null,
        name: doc.data().name || null,
      });
    }
  }
  return data;
}

export async function createTranscript(url, data, successCB, failCB) {
  // add to transcript collection
  const docRef = await ref.collection("transcripts").doc(url);
  const doc = await docRef.get();

  if (!doc.exists) {
    await docRef.set(data);

    // update hashtag collection to reference new transcript
    if (data.searchable) await addHashtagData(url, data.hashtags);

    if (successCB) successCB();
  } else {
    if (failCB) failCB();
  }
}
