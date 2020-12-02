import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";

import { REQUEST_STATUS } from "./constants";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export async function getAllOpenRequests() {
  const requests = await ref
    .collection("requests")
    .where("status", "!=", REQUEST_STATUS.COMPLETED)
    .get();

  const data = [];

  requests.forEach((doc) => {
    if (doc) data.push({ ...doc.data() });
  });

  return data;
}

export async function createRequest(data, successCB) {
  await ref
    .collection("requests")
    .add({ ...data, status: REQUEST_STATUS.COMPLETED });
  if (successCB) successCB();
}

export async function markRequestComplete(id, successCB) {
  await ref.collection("requests").doc(id).update({
    status: REQUEST_STATUS.COMPLETED,
  });
  if (successCB) successCB();
}
