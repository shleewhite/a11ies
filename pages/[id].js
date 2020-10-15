import React from "react";
import { useRouter } from "next/router";

import { getTranscriptData } from "../lib/transcripts";

import Layout from "../components/Layout";

export async function getServerSideProps({ params }) {
  const transcriptData = await getTranscriptData(params.id);
  return {
    props: {
      transcriptData,
    },
  };
}

export default function Transcript({ transcriptData }) {
  const id = useRouter().query.id;
  return (
    <Layout title={`${id} | A11ies.info`}>
      <h1>{id}</h1>
      {/* <div dangerouslySetInnerHTML={{ __html: transcriptData.contentHtml }} /> */}
    </Layout>
  );
}
