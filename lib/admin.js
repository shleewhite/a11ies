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
    if (doc) {
      // eslint-disable-next-line no-unused-vars
      const { flagged, doc_data } = doc.data();
      data.push({ ...doc_data });
    }
  });

  return data;
}

export async function getAdminData(accessLevel) {
  const data = {};
  if (accessLevel > 0) {
    data.requests = { name: "Open Requests", data: await getAllOpenRequests() };
    data.transcripts = {
      name: "Flagged Transcripts",
      data: await getAllFlaggedTranscripts(),
    };
  }

  if (accessLevel > 1) {
    data.volunteers = {
      name: "Open Volunteer Applications",
      data: await getAllOpenVolunteerApps(),
    };
    data.users = { name: "Flagged Users", data: await getAllFlaggedUsers() };
  }

  return data;
}

export const ADMIN_TABLE_HEADERS = {
  requests: [
    { id: "status", name: "Status" },
    { id: "link", name: "Resource" },
  ],
  transcripts: [
    { id: "transcriptLink", name: "Transcript" },
    { id: "source", name: "Original Resource" },
    { id: "creator", name: "Original Creator" },
    { id: "publishDate", name: "Publish Date" },
    { id: "hashtags", name: "Hashtags" },
  ],
  volunteers: [
    { id: "status", name: "Status" },
    { id: "response", name: "Response" },
  ],
  users: [
    { id: "displayName", name: "Display Name" },
    { id: "accessLevel", name: "Access Level" },
  ],
};
