import Link from "next/link";

import { getTranscriptList } from "../../lib/transcripts";
import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Card from "../../components/Card";

const COUNT = 5;

function orderByFrequency(els, limit) {
  let hash = {};

  els.forEach((el) => {
    let lc = el.toLowerCase();
    if (!hash[lc]) hash[lc] = { val: el, count: 0};
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
      <SecondaryNavLayout title="Featured" subnav="Browse">
        <div id="main-content">
          <Card
            headerLevel={2}
            header="How to call your reps when you have social anxiety"
            style={`
            grid-column: 1 / span 2;
            width: auto;
            justify-self: center;
          `}
            imgLink="https://64.media.tumblr.com/5a15fb50c11f9ea5f73db2fcee3c87f8/1c3d528838d133f2-95/s640x960/5dc0be4e790d6cb742460720ed2d29ddaca8d096.jpg"
          >
            <p>
              This is a great explainer on what to say when you call your state
              and federal representatives.
            </p>
          </Card>
          <Card header="Trending hashtags" headerLevel={2} hasTopZazz>
            <ul>
              {hashtags.map((hashtag) => (
                <li key={hashtag.val}>
                  <Link href={`/browse/hashtags/${hashtag.val}`}>
                    <a>#{hashtag.val}</a>
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
                    <a>{transcript.name}</a>
                  </Link>
                </li>
               ))}
            </ul>
          </Card>
        </div>
      </SecondaryNavLayout>
      <style jsx>
        {`
          #main-content {
            grid-template-columns: 3fr 5fr;
          }

          li {
            padding-top: var(--space-xs);
          }

          li:first-child {
            padding-top: var(--space-0);
          }
        `}
      </style>
    </>
  );
}
