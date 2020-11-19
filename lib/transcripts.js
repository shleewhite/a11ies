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
}

export async function getAllFlaggedTranscripts() {
  const transcripts = await ref
    .collection("transcripts")
    .where("flagged", "==", true)
    .get();

  const data = [];

  transcripts.forEach((doc) => {
    if (doc) data.push({ ...doc.data() });
  });

  return data;
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
    };
  }
}

export async function createTranscript(url, data, successCB) {
  await ref.collection("transcripts").doc(url).set(data);
  if (successCB) successCB();
}
