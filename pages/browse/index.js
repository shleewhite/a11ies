import Link from "next/link";

import { BREAKPOINTS } from "../../lib/constants";
import { getTranscriptList } from "../../lib/transcripts";
import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Card from "../../components/Card";

const COUNT = 5;

function orderByFrequency(els, limit) {
  let hash = {};

  els.forEach((el) => {
    let lc = el.toLowerCase();
    if (!hash[lc]) hash[lc] = { val: el, count: 0 };
    hash[lc].count++;
  });

  let values = Object.values(hash).sort((a, b) => {return b.count - a.count});
  return limit ? values.slice(0, limit) : values;
}

export async function getStaticProps() {
  const transcripts = await getTranscriptList(COUNT);
  let hashtags = [];
  transcripts.forEach((transcript) => {
    hashtags = hashtags.concat(transcript.hashtags);
  });
  return {
    props: {
      transcripts: transcripts,
      hashtags: orderByFrequency(hashtags, COUNT)
    },
  };
}

export default function Browse({transcripts, hashtags}) {
  return (
    <>
      <SecondaryNavLayout
        title="Featured"
        subnav="Browse"
        styles="
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: var(--space-m) var(--space-l);
          gap: var(--space-m) var(--space-l);
          justify-content: center;
        "
        wideStyles="
          grid-template-columns: 1fr 1fr;
        "
      >
        <div className="top-card">
          <Card
            headerLevel={2}
            header="Featured Transcript: How to call your reps when you have social anxiety"
            imgLink="https://64.media.tumblr.com/5a15fb50c11f9ea5f73db2fcee3c87f8/1c3d528838d133f2-95/s640x960/5dc0be4e790d6cb742460720ed2d29ddaca8d096.jpg"
          >
            <p>
              This is a great explainer on what to say when you call your state
              and federal representatives.
            </p>
             <Link href={`/call-your-reps`}>
              <a className="pill">Read the transcript →</a>
            </Link>
          </Card>
        </div>
        <Card header="Recent hashtags" headerLevel={2} hasTopZazz>
          <ul>
            {hashtags.map((hashtag) => (
              <li key={hashtag.val}>
                <Link href={`/browse/hashtags/${hashtag.val}`}>
                  <a className="pill">#{hashtag.val}</a>
                </Link>
              </li>
             ))}
          </ul>
        </Card>
        <Card header="Recent transcripts" headerLevel={2} hasTopZazz>
          <ul>
            {transcripts.map((transcript) => (
              <li key={transcript.id}>
                <Link href={transcript.id}>
                  <a className="pill">{transcript.name}</a>
                </Link>
              </li>
             ))}
          </ul>
        </Card>
      </SecondaryNavLayout>
      <style jsx>
        {`
          ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          li {
            padding: var(--space-s) 0 var(--space-s) 0;
          }

          .top-card {
            width: auto;
            justify-self: center;
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            .top-card {
              grid-column: 1 / span 2;
            }
          }          
        `}
      </style>
    </>
  );
}
