import React from "react";
import Link from "next/link";

import { getTranscriptData } from "../lib/transcripts";

import Card from "../components/Card";
import Prompt from "../components/Prompt";
import Layout from "../components/Layouts/Layout";

export async function getServerSideProps({ params }) {
  const transcriptData = await getTranscriptData(params.id);
  return {
    props: { transcriptData },
  };
}

export default function Transcript({ transcriptData }) {
  if (!transcriptData) {
    return (
      <Layout title="Hm...">
        <div id="main-content">
          <Prompt/>
        </div>
      </Layout>
    );
  }

  const { name, link, contentHtml, hashtags, creatorName, creatorLink } = transcriptData;
    
  return (
    <>
      <Layout title={name}>
        <div id="main-content">
          <div>
            <Card header="About" headerLevel="2">
              <a href={link} target="_blank" className="i b">{name}</a>
              { creatorName ?
                  creatorLink ?
                    (<>{' by'} <a href={creatorLink} target="_blank" className="b">{creatorName}</a></>) :
                    ' by ' + creatorName
                  : null }
              <ul className="hashtags">
                {hashtags.map((hashtag, i) => {
                  return (
                    <li key={i}>
                      <Link href={`browse/hashtags/${hashtag}`}><a>#{hashtag}</a></Link>
                    </li>)
                })}
              </ul>
            </Card>
          </div>
          <div>
            <h2>Transcript</h2>
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </div>
      </Layout>
      <style jsx>
        {`
          * {
            line-height: var(--lh-m);
          }

          .i {
            font-style: italic;
          }

          .b {
            font-weight: 800;
          }

          ul.hashtags {
            list-style-type: none;
            padding: 0;
          }

          h2 {
            font-size: var(--text-l);
          }

          @media (min-width: 620px) {
            #main-content {
              column-count: 1;
            }
            
            #main-content > div {
              break-inside: avoid;
            }
          }

          @media (min-width: 960px) {
            #main-content {
              column-count: 2;
              column-gap: 80px;
              grid-template-columns: 1fr 400px;
            }

            #main-content div:first-child {
              order: 2;
            }
          }
        `}
      </style>
    </>
  );
}
