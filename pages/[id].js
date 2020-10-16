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
    <Layout title={`${name} | A11ies.info`}>
      <h1>{name}</h1>
      <h2>Transcript</h2>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
}
