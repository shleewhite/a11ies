import firebase from "firebase";

import { FIREBASE_CONFIG } from "./firebase_env";
import { VOLUNTEER_APP_STATUS } from "./constants";
import { getAllOpenRequests, markRequestComplete } from "./request";
import { getAllFlaggedTranscripts } from "./transcripts";
import {
  getAllOpenVolunteerApps,
  updateVolunteerAppStatus,
} from "./volunteers";

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

async function removeFlag(id, collection) {
  await ref.collection(collection).doc(id).update({ flagged: false });
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
    data["volunteer-apps"] = {
      name: "Open Volunteer Applications",
      data: await getAllOpenVolunteerApps(),
    };
    data.users = { name: "Flagged Users", data: await getAllFlaggedUsers() };
  }

  return data;
}

export const ADMIN_TABLES = {
  requests: {
    "column-headers": [
      { id: "status", name: "Status" },
      { id: "link", name: "Resource" },
    ],
    actions: [
      {
        name: "Mark complete",
        function: markRequestComplete,
      },
    ],
  },
  transcripts: {
    "column-headers": [
      { id: "transcriptLink", name: "Transcript" },
      { id: "source", name: "Original Resource" },
      { id: "creator", name: "Original Creator" },
      { id: "publishDate", name: "Publish Date" },
      { id: "hashtags", name: "Hashtags" },
    ],
    actions: [
      {
        name: "Remove flag",
        function: removeFlag,
      },
    ],
  },
  "volunteer-apps": {
    "column-headers": [
      { id: "status", name: "Status" },
      { id: "response", name: "Response" },
    ],
    actions: [
      {
        name: "Accept application",
        function: (id) => {
          updateVolunteerAppStatus(id, VOLUNTEER_APP_STATUS.ACCEPTED);
        },
      },
    ],
  },
  users: {
    "column-headers": [
      { id: "displayName", name: "Display Name" },
      { id: "accessLevel", name: "Access Level" },
    ],
    actions: [
      {
        name: "Remove flag",
        function: removeFlag,
      },
    ],
  },
};
