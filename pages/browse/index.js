import Link from "next/link";

import { getTranscriptList } from "../../lib/transcripts";
import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Card from "../../components/Card";

export async function getStaticProps() {
  const transcriptList = await getTranscriptList();
  console.log('transcriptList', transcriptList);
  return {
    props: {
      transcriptList
    },
  };
}

export default function Browse({transcriptList}) {
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
          <Card header="Recent hashtags" headerLevel={2} hasTopZazz>
            <ul>
              <li>#BLM</li>
            </ul>
          </Card>
          <Card header="Recent transcripts" headerLevel={2} hasTopZazz>
            <ul>
              {transcriptList.map((transcript) => (
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
