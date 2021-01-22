import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export async function getHashtagList(sortByFrequency, limit) {
  return ref.collection("hashtags").get()
    .then(function(hashtagDocs) {
      let results = [];
      hashtagDocs.forEach(function(doc) {
        let data = doc.data();
        let transcriptCount = data.transcripts.length;
        if (transcriptCount > 0) {
          results.push({
            id: doc.id,
            formattedHashtag: data.formattedHashtag || null,
            transcriptCount: transcriptCount
          });
        }
      });
      if (sortByFrequency) {
        results.sort((a, b) => b.transcriptCount - a.transcriptCount);
      }
      if (limit) {
        return results.slice(0, limit);
      }
      return results;
  });
}

export async function getHashtagData(id) {
  const doc = await ref
    .collection("hashtags")
    .doc(id.toLowerCase())
    .get();
  if (!doc.exists) return null;
  
  else {
    return {
      hashtag: doc.data().formattedHashtag || null,
      transcriptIds: doc.data().transcripts || []
    };
  }
}
