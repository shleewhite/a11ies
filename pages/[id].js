import React from "react";
import Link from "next/link";

import { getTranscriptData } from "../lib/transcripts";
import { BREAKPOINTS } from "../lib/constants";

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
        <Prompt />
      </Layout>
    );
  }

  const {
    name,
    link,
    contentHtml,
    hashtags,
    creatorName,
    creatorLink,
  } = transcriptData;

  return (
    <>
      <Layout title={name}>
        <div className="transcript-container">
          <div>
            <Card header="About" headerLevel="2">
              <a href={link} target="_blank" className="i b">
                {name}
              </a>
              {creatorName ? (
                creatorLink ? (
                  <>
                    {" by"}{" "}
                    <a href={creatorLink} target="_blank" className="b">
                      {creatorName}
                    </a>
                  </>
                ) : (
                  ` by ${creatorName}`
                )
              ) : null}
              <ul className="hashtags">
                {hashtags.map((hashtag, i) => {
                  return (
                    <li key={i}>
                      <Link href={`browse/hashtags/${hashtag}`}>
                        <a className="pill">#{hashtag}</a>
                      </Link>
                    </li>
                  );
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

          li {
            padding-top: var(--space-s);
          }

          h2 {
            font-size: var(--text-l);
          }

          .transcript-container {
            display: grid;
            grid-gap: var(--space-m) var(--space-s);
            gap: var(--space-m) var(--space-s);
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            .transcript-container {
              grid-template-columns: 2fr 1fr;
              column-gap: 80px;
            }

            .transcript-container > div {
              break-inside: avoid;
            }

            .transcript-container div:first-child {
              order: 2;
            }
          }
        `}
      </style>
    </>
  );
}
