import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";
import { getMarkdownAsHTML } from "./helpers";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export async function getTranscriptCount(hashtagId) {
  const transcripts = await ref.collection("transcripts")
    .where("hashtagIds", "array-contains", hashtagId.toLowerCase())
    .where("searchable", "==", true);

  return transcripts
    .get()
    .then((transcriptsSnapshot) => {
      return transcriptsSnapshot.size;
    });
}

export async function getTranscriptsByHashtag(hashtagId) {
  const transcripts = await ref.collection("transcripts")
    .where("hashtagIds", "array-contains", hashtagId.toLowerCase())
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
            creatorName: doc.data().creatorName || null,
          });
        }
      });
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getAllActiveHashtags() {
  const hashtags = await ref.collection("hashtags").get();

  const data = [];

  for (let hashtag of hashtags.docs) {
    // let count = await getTranscriptCount(hashtag.id);
    // if (count > 0) {
      data.push({
        id: hashtag.id,
        hashtag: hashtag.data().formattedHashtag || null,
        /* transcriptCount: count*/
      });
    // }
  }

  return data;
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

export async function addHashtagData(hashtags) {
  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    const hashtagId = hashtag.toLowerCase();
    const doc = await ref.collection("hashtags").doc(hashtagId).get();
    if (!doc.exists) {
      await ref.collection("hashtags").doc(hashtagId).set({formattedHashtag: hashtag});
    }
  }
}
