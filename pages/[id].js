import React, {useContext} from "react";
import Link from "next/link";

import { getTranscriptData } from "../lib/transcripts";
import { BREAKPOINTS } from "../lib/constants";
import { UserContext } from "../lib/user_context";

import Card from "../components/Card";
import Prompt from "../components/Prompt";
import Layout from "../components/Layouts/Layout";
import SocialMediaEmbed from "../components/SocialMediaEmbed";

export async function getServerSideProps({ params }) {
  const transcriptData = await getTranscriptData(params.id);

  return {
    props: {transcriptData},
  };
}

export default function Transcript({transcriptData}) {
  if (!transcriptData) {
    return (
      <Layout title="Hmm...">
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
    uid,
    id
  } = transcriptData;

  const context = useContext(UserContext);
  const isOwner = context.user !== undefined && context.user.uid === transcriptData.uid;
  const isAdmin = context.user !== undefined && context.user.accessLevel === 2;
  let extraHeaderContent = null;

  if (isOwner) {
    extraHeaderContent = (
      <Link href={`edit/${id}`}>
        <a className="pill pill--inverse">Edit Transcript</a>
      </Link>
    );
  } else if (isAdmin) {
    extraHeaderContent = (
      <Link href={`edit/${id}`}>
        <a>Edit as Admin</a>
      </Link>
    );
  }

  return (
    <>
      <Layout title={name}>
        <div className="transcript-container">
          <div>
            <Card header="About" headerLevel="2" extraHeaderContent={extraHeaderContent}>
              <a href={link} target="_blank" rel="noreferrer" className="i b">
                {name}
              </a>
              {creatorName ? (
                creatorLink ? (
                  <>
                    {" by"}{" "}
                    <a
                      href={creatorLink}
                      target="_blank"
                      rel="noreferrer"
                      className="b"
                    >
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
            <SocialMediaEmbed url={link} msg="Unable to load post." />
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
