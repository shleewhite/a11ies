const functions = require("firebase-functions");
const admin = require("firebase-admin");

const { flagged_words } = require("./flagged-words");

admin.initializeApp();

exports.moderator = functions.firestore
  .document("/test/{documentId}")
  .onCreate((snap, context) => {
    const transcript = snap.data().transcript;
    let flagged = false;

    if (new RegExp(flagged_words.join("|")).test(transcript)) {
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
