import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";
import { getAllOpenRequests } from "./request";
import { getAllFlaggedTranscripts } from "./transcripts";
import { getAllOpenVolunteerApps } from "./volunteers";

const app = !firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
const ref = firebase.firestore(app);

async function getAllFlaggedUsers() {
  const users = await ref
    .collection("users")
    .where("flagged", "==", true)
    .get();

  const data = [];

  users.forEach((doc) => {
    if (doc) data.push({ ...doc.data() });
  });

  return data;
}

export async function getAdminData(accessLevel) {
  const data = [];
  if (accessLevel > 0) {
    data.push(
      { name: "Open Requests", data: await getAllOpenRequests() },
      {
        name: "Flagged Transcripts",
        data: await getAllFlaggedTranscripts(),
      }
    );
  }

  if (accessLevel > 1) {
    data.push(
      {
        name: "Open Volunteer Applications",
        data: await getAllOpenVolunteerApps(),
      },
      { name: "Flagged Users", data: await getAllFlaggedUsers() }
    );
  }

  return data;
}
