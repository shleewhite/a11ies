import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";
import { getMarkdownAsHTML } from "./helpers";
import { addHashtagData } from "./hashtags";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export function getAllTranscriptData(onlySearchable, cb) {
  const transcripts = onlySearchable
    ? firebase
        .firestore(app)
        .collection("transcripts")
        .where("searchable", "in", [true, "on"])
    : firebase.firestore(app).collection("transcripts").orderBy("name");

  transcripts
    .get()
    .then((transcriptsSnapshot) => {
      const data = [];
      transcriptsSnapshot.forEach((doc) => {
        if (doc) {
          data.push({ ...doc.data(), url: doc.id });
        }
      });

      data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      console.log("Queried DB");
      if (cb) cb(data);
    })
    .catch((err) => {
      console.log("Error fetching transcripts", err);
    });
}

export async function getTranscriptList(limit) {
  // todo, order by date
  const transcripts = 
    limit ? 
      await ref
        .collection("transcripts")
        .where("searchable", "==", true)
        .limit(parseInt(limit)) :
      await ref
        .collection("transcripts")
        .where("searchable", "==", true);

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
  const transcripts = ref.collection("transcripts");

  return transcripts
    .get()
    .then((transcriptsSnapshot) => {
      transcriptsSnapshot.forEach((doc) => ({
        params: { id: doc.id },
      }));
    })
    .catch((err) => {
      console.log(err);
    });
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
      creatorLink: doc.data().creatorLink || null
    };
  }
}

export async function getTranscriptsData(ids) {
  let data = [];
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const doc = await ref.collection("transcripts").doc(id).get();
    if (doc.exists && doc.data().searchable) {
      data.push({
        id: doc.id || null,
        name: doc.data().name || null
      });
    }
  }
  return data;
}

export async function createTranscript(url, data, successCB) {
  // add to transcript collection
  await ref.collection("transcripts").doc(url).set(data);
  // update hashtag collection to reference new transcript
  if (data.searchable) await addHashtagData(url, data.hashtags);

  if (successCB) successCB();
}
