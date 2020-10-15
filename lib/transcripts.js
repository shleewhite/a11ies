import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export function getAllTranscriptData(onlySearchable, cb) {
  const transcripts = onlySearchable
    ? firebase.firestore(app).collection("test").where("searchable", "==", true)
    : firebase.firestore(app).collection("test").orderBy("name");

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

export async function getAllTranscriptIds() {
  const transcripts = firebase.firestore(app).collection("test");

  return transcripts
    .get()
    .then((transcriptsSnapshot) => {
      console.log("hello");
      transcriptsSnapshot.forEach((doc) => ({
        params: { id: doc.id },
      }));
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getTranscriptData(id) {
  const doc = await ref.collection("test").doc(id).get();
  if (!doc.exists) return null;
  else return doc.data();
}
