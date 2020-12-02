import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";

import { VOLUNTEER_APP_STATUS } from "./constants";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export async function getAllOpenVolunteerApps() {
  const apps = await ref
    .collection("volunteer-apps")
    .where("status", "==", VOLUNTEER_APP_STATUS.NEW)
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
    .set({ ...data, status: VOLUNTEER_APP_STATUS.NEW });
  if (successCB) successCB();
}

export async function updateVolunteerAppStatus(id, status) {
  await ref
    .collection("volunteer-apps")
    .doc(id)
    .update({ status: VOLUNTEER_APP_STATUS[status] });
}
