import React, { useState, useEffect } from "react";
import { nolookalikes } from "nanoid-generate"; // generates unique id without characters that look similar ie. 1 and I
import * as copy from "copy-to-clipboard"; // copy-to-clipboard
import Link from "next/link";

import Layout from "../../components/Layouts/Layout";
import Prompt from "../../components/TranscriptForm";
import TranscriptForm from "../../components/TranscriptForm";
import { getTranscriptData } from "../../lib/transcripts";

export async function getServerSideProps({ params }) {
  const transcriptData = await getTranscriptData(params.id);
  return {
    props: { transcriptData },
  };
}

export default function Edit({ transcriptData }) {
  if (!transcriptData) {
    return (
      <Layout title="Hmm...">
        <Prompt />
      </Layout>
    );
  }

  return (
    <TranscriptForm transcriptData={transcriptData} />
  );
}
