import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";
import { getMarkdownAsHTML } from "./helpers";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export async function getAllHashtags() {
  const hashtagData = await ref.collection("hashtags");
  return hashtagData
    .get()
    .then((hashtagsSnapshot) => {
      let data = [];
      hashtagsSnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          hashtag: doc.data().formattedHashtag || null,
          transcriptIds: doc.data().transcripts || []
        });
      });
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getHashtagData(id) {
  const doc = await ref.collection("hashtags").doc(id.toLowerCase()).get();
  if (!doc.exists) return null;
  
  else {
    return {
      hashtag: doc.data().formattedHashtag || null,
      transcriptIds: doc.data().transcripts || []
    };
  }
}

export async function addHashtagData(transcriptId, hashtags) {
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    const hashtagId = hashtag.toLowerCase();
    const doc = await ref.collection("hashtags").doc(hashtagId).get();
    if (!doc.exists) {
      await ref.collection("hashtags").doc(hashtagId).set({
        formattedHashtag: hashtag,
        transcripts: [transcriptId]
      });
    } else {
      await ref.collection("hashtags").doc(hashtagId).update({
        transcripts: firebase.firestore.FieldValue.arrayUnion(transcriptId)
      });
    }
  }
}
