import React from "react";

import { getTranscriptData } from "../lib/transcripts";

import Layout from "../components/Layouts/Layout";

export async function getServerSideProps({ params }) {
  const transcriptData = await getTranscriptData(params.id);
  return {
    props: { transcriptData },
  };
}

export default function Transcript({ transcriptData }) {
  const { name, link, contentHtml, hashtags } = transcriptData;
  return (
    <Layout title={name}>
      <h2>Transcript</h2>
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
}
