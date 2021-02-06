import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/Layouts/Layout";
import Card from "../components/Card";
import PageNotFound from "./404";
import TranscriptList from "../components/TranscriptList";
import { BREAKPOINTS } from "../lib/constants";
import { getTranscriptListByUserId } from "../lib/transcripts";
import { UserContext } from "../lib/user_context";

const Section = ({ heading, description, transcripts, dataLoaded }) => {
  return (
    <section>
      <h2>{heading}</h2>
      <p>{description}</p>
      {(transcripts.length == 0) ? 
        (<div>{`You have no ${heading.toLowerCase()}.`}</div>) :
        (<TranscriptList 
          transcripts={transcripts}
          showHashtags={true}
          showEdit={true} />
        )}
      <style jsx>
        {`
          p {
            font-size: 1.25em;
            font-style: italic;
            margin-top: 0;
          }

          h2 {
            font-size: var(--text-l);
            margin-bottom: var(--space-xs);
          }

        `}
      </style>
    </section>
  );
}

export default function Create() {
  const context = useContext(UserContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [transcriptCount, setTranscriptCount] = useState(-1);
  const [searchableTranscripts, setSearchableTranscripts] = useState([]);
  const [unlistedTranscripts, setUnlistedTranscripts] = useState([]);

  useEffect(() => {
    async function getData() {
      let data = await getTranscriptListByUserId(context.user.uid);
      data.sort((a, b) => {return (a.name < b.name) ? -1 : 1});
      let searchable = [];
      let unlisted = [];
      data.forEach((transcript) => {
        if (transcript.searchable) {
          searchable.push(transcript);
        } else {
          unlisted.push(transcript);
        }
      });
      setSearchableTranscripts(searchable);
      setUnlistedTranscripts(unlisted);
      setTranscriptCount(data.length);
      setDataLoaded(true);
    }

    if (context.isLoggedIn) getData();
  }, [context]);

  return (
    <>
      {context.isLoggedIn ? (
        <Layout title="My Transcripts">
          <div className="transcript-list-container">

            <div>
              <Card header={context.user ? `Hi ${context.user.name}!` : "Hi!"} headerLevel="2" hasTopZazz>
                {dataLoaded ? 
                  transcriptCount > 0 ?
                  (<p>
                    {`You've contributed ${transcriptCount} 
                    transcript${transcriptCount !== 1 ? 's' : ''} so far.`}
                   </p>
                  ) : (
                    <p>You haven't contributed any transcripts yet.</p>
                  ) : (
                    null
                  )
                }
                <Link href="/contribute">
                  <a className="pill">Create a new transcript</a>
                </Link>
              </Card>
            </div>

            { !dataLoaded ? 
              (<div>Loading your transcripts...</div>) :
              (<div>
                <Section 
                  heading="Searchable transcripts" 
                  description={
                    `These transcripts will appear on a11ies.info's browse pages.`}
                  transcripts={searchableTranscripts}
                />
                <Section
                  heading="Unlisted transcripts"
                  description={
                    `These transcripts will not appear when people browse a11ies.info.
                     However, anyone can access these transcripts if they have the URL.`}
                  transcripts={unlistedTranscripts}
                />
              </div>)
            }

          </div>
        </Layout>
      ) : (<PageNotFound/>)}
      <style jsx>
        {`
          .transcript-list-container {
            display: grid;
            grid-gap: var(--space-m) var(--space-s);
            gap: var(--space-m) var(--space-s);
          }

          .span {
            display: block;
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            .transcript-list-container {
              grid-template-columns: 2fr 1fr;
              column-gap: 80px;
            }

            .transcript-list-container div:first-child {
              order: 2;
            }
          }
        `}
      </style>
    </>
  );
}
