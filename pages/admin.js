import React, { useContext } from "react";
// import Link from "next/link";

import Layout from "../components/Layouts/Layout";

import { UserContext } from "../lib/user_context";

export default function Admin() {
  const context = useContext(UserContext);

  return (
    <>
      {context.user !== undefined && context.user.accessLevel > 0 ? (
        <Layout title="Admin">
          <h2>Flagged Transcripts</h2>
          <h2>Flagged Users</h2>
        </Layout>
      ) : null}
    </>
  );
}
