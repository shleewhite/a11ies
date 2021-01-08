import Link from "next/link";

import { getAllTranscriptData } from "../../lib/transcripts";
import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Prompt from "../../components/Prompt";

export async function getStaticProps() {
  const transcripts = await getAllTranscriptData();
  return {
    props: { transcripts },
  };
}

export default function Transcripts({ transcripts }) {
  return (
    <>
      <SecondaryNavLayout title="All Transcripts" subnav="Browse">
        <div id="main-content">
          <ul>
            {transcripts.map((transcriptData) => (
              <li key={transcriptData.id}>
                <Link href={`/${transcriptData.url}`}>
                  <a>{transcriptData.name}</a>
                </Link>
              </li>
            ))}
          </ul>

          <div>
            <Prompt headerLevel="2" />
          </div>
        </div>
      </SecondaryNavLayout>
      <style jsx>
        {`
          li {
            font-size: var(--text-m);
            padding-top: var(--space-s);
          }
          ul {
            padding-bottom: var(--space-s);
          }
        `}
      </style>
    </>
  );
}
