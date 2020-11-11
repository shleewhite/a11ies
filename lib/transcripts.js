import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";
import { getMarkdownAsHTML } from "./helpers";

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

// export async function getAllSearchableTranscriptsData() {
//   const transcripts = firebase
//         .firestore(app)
//         .collection("transcripts")
//         .where("searchable", "in", [true, "on"])
//         .orderBy("name");

//   return transcripts
//     .get()
//     .then((transcriptsSnapshot) => {
//       const data = [];
//       transcriptsSnapshot.forEach((doc) => {
//         if (doc) {
//           data.push({ ...doc.data(), url: doc.id });
//         }
//       });
//     })
//     .catch((err) => {
//       console.log("Error fetching transcripts", err);
//     });
// }

export async function getAllTranscriptIds() {
  const transcripts = firebase.firestore(app).collection("transcripts");

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
      creatorName: doc.data().creatorName,
      creatorLink: doc.data().creatorLink
    };
  }
}

export async function createTranscript(url, data, successCB) {
  await ref.collection("transcripts").doc(url).set(data);
  if (successCB) successCB();
}
