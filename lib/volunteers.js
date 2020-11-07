import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export async function getAllOpenVolunteerApps() {
  const apps = await ref
    .collection("volunteer-apps")
    .where("isAccepted", "==", false)
    .get();

  const data = [];

  apps.forEach((doc) => {
    if (doc) data.push({ ...doc.data() });
  });

  return data;
}

export async function createVolunteerApp(id, data, successCB) {
  await ref
    .collection("volunteer-apps")
    .doc(id)
    .set({ ...data, isAccepted: false });
  if (successCB) successCB();
}
