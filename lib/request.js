import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

export async function getAllOpenRequests() {
  const requests = await ref
    .collection("requests")
    .where("status", "!=", "complete")
    .get();

  const data = [];

  requests.forEach((doc) => {
    if (doc) data.push({ ...doc.data() });
  });

  return data;
}

export async function createRequest(id, data, successCB) {
  await ref
    .collection("requests")
    .doc(id)
    .set({ ...data, status: "new" });
  if (successCB) successCB();
}
