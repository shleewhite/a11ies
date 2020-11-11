import React from "react";
import Link from "next/link";

import { getTranscriptData } from "../lib/transcripts";

import Card from "../components/Card";
import Layout from "../components/Layouts/Layout";

export async function getServerSideProps({ params }) {
  const transcriptData = await getTranscriptData(params.id);
  return {
    props: { transcriptData },
  };
}

export default function Transcript({ transcriptData }) {
  const { name, link, contentHtml, hashtags, creatorName, creatorLink } = transcriptData;
    
  return (
    <>
      <Layout title={name}>
        <Card header="About" headerLevel="3">
          <a href={link} target="_blank">View original resource</a>

          {creatorName ? ' by ' : null}
          {creatorName ? 
            creatorLink ?
            <a href={creatorLink} target="_blank">{creatorName}</a> :
            creatorName :
          null}

          <ul className="hashtags">
          {hashtags.map((hashtag, i) => {
            return (
              <li key={i}>
                <Link href="something"><a>#{hashtag}</a></Link>
              </li>)
          })}
          </ul>
        </Card>

        <h2>Transcript</h2>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </Layout>
      <style jsx>
        {`
          a {
            font-weight: 800
          }

          ul.hashtags {
            list-style-type: none;
            padding: 0;
          }

          ul.hashtags li {

          }
        `}
      </style>
    </>
  );
}
