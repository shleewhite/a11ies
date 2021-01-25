const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { flagged_words, flagged_hashtags } = require("./moderator");

const db = admin.initializeApp().firestore();

exports.moderator = functions.firestore
  .document("/test/{documentId}")
  .onCreate((snap, context) => {
    const transcript = snap.data().transcript;
    const hashtags = snap.data().hashtags.join("|");
    let flagged = false;

    if (new RegExp(flagged_words.join("|")).test(transcript)) {
      flagged = true;
    }

    if (new RegExp(flagged_hashtags.join("|").test(hashtags))) {
      flagged = true;
    }

    return snap.ref.set({ flagged }, { merge: true });
  });

exports.createProfile = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    accessLevel: 0,
    flagged: false,
  });
});

exports.changeAccessLevel = functions.firestore
  .document("/users/{uid}")
  .onUpdate((change, context) => {
    return admin
      .auth()
      .setCustomUserClaims(context.params.uid, {
        accessLevel: change.after.data().accessLevel,
      })
      .then(() => {
        return admin.auth().getUser(context.params.uid);
      });
  });

exports.acceptVolunteerApp = functions.firestore
  .document("/volunteer-apps/{uid}")
  .onUpdate((change, context) => {
    if (change.after.data().isAccepted) {
      return admin
        .firestore()
        .collection("users")
        .doc(context.params.uid)
        .update({ accessLevel: 1 });
    }
    return admin.firestore().collection("users").doc(context.params.uid);
  });

function difference(a1, a2) {
  var a2Set = new Set(a2);
  return a1.filter(function(x) { return !a2Set.has(x); });
}

/* Update hashtag collection to add the given transcriptId to 
   each given hashtag's list of transcripts. If the hashtag doesn't
   exist in the hashtag collection, create it. */
async function addTranscriptToHashtagsList(transcriptId, hashtags) {
  const hashtagCollection = db.collection("hashtags");
  let batch = db.batch();

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    const docRef = hashtagCollection.doc(hashtag.toLowerCase());
    const doc = await docRef.get();
    if (!doc.exists) {
      batch.set(docRef, {
        formattedHashtag: hashtag,
        transcripts: [transcriptId]
      });
    } else {
      batch.update(docRef, {
        transcripts: admin.firestore.FieldValue.arrayUnion(transcriptId)
      });
    }
  }

  return batch.commit();
}

/* Update hashtag collection to remove the given transcriptId
   from each given hashtag's list of transcripts. */
async function removeTranscriptFromHashtagsList(transcriptId, hashtags) {
  const hashtagCollection = db.collection("hashtags");
  let batch = db.batch();

  for (let i = 0; i < hashtags.length; i++ ) {
    let hashtagId = hashtags[i].toLowerCase();
    batch.update(hashtagCollection.doc(hashtagId), {
      transcripts: admin.firestore.FieldValue.arrayRemove(transcriptId)
    });
  }

  return batch.commit();
}

exports.createHashtagMappingForTranscript = functions.firestore
  .document("/transcripts/{id}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    if (data.searchable && data.hashtags) {
      return addTranscriptToHashtagsList(snap.id, data.hashtags);
    }

    return;
  });

exports.deleteHashtagMappingForTranscript = functions.firestore
  .document("/transcripts/{id}")
  .onDelete(async (snap, context) => {
    const data = snap.data();
    if (data.searchable && data.hashtags) {
      return removeTranscriptFromHashtagsList(snap.id, data.hashtags);
    }

    return;
  });

exports.updateHashtagMappingForTranscript = functions.firestore
  .document("/transcripts/{id}")
  .onUpdate(async (change, context) => {
    const transcriptId = change.before.id;
    const oldData = change.before.data();
    const newData = change.after.data();

    // If transcript is no longer searchable,
    // remove it from hashtags' transcript lists
    if (!newData.searchable && oldData.searchable) {
      return removeTranscriptFromHashtagsList(transcriptId, oldData.hashtags);
    // If transcript is newly searchable, add it 
    // to hashtags' transcripts lists
    } else if (newData.searchable && !oldData.searchable) {
      return addTranscriptToHashtagsList(transcriptId, newData.hashtags);
    // Otherwise, for searchable transcripts, ensure
    // hashtag lists are up to date with latest changes
    } else if (newData.searchable) {

      await removeTranscriptFromHashtagsList(transcriptId,
        difference(oldData.hashtags, newData.hashtags));

      return addTranscriptToHashtagsList(transcriptId,
        difference(newData.hashtags, oldData.hashtags));
    }

    return;
  });
  