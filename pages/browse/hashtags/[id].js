import Link from "next/link";

import { getHashtagData } from "../../../lib/hashtags";
import { getTranscriptsData } from "../../../lib/transcripts";
import SecondaryNavLayout from "../../../components/Layouts/SecondaryNavLayout";
import Card from "../../../components/Card";
import Prompt from "../../../components/Prompt";

export async function getServerSideProps({ params }){
  const query = params.id;
  const hashtagData = await getHashtagData(query);
  const transcripts = hashtagData ? await getTranscriptsData(hashtagData.transcriptIds) : null;
  return {
    props: { 
      query,
      hashtagData,
      transcripts
    },
  };
}

export default function Hashtag({query, hashtagData, transcripts}) {
  if (!hashtagData) {
    return (
      <>
        <SecondaryNavLayout title="Sorry!" subnav="Browse">
          <div id="main-content">
            <Prompt headerLevel="2" header={`We couldn't find any transcripts tagged with #${query}!`}>
            </Prompt>
          </div>
        </SecondaryNavLayout>
      </>
    );
  }
  return (
    <>
      <SecondaryNavLayout title={`#${hashtagData.hashtag}`} subnav="Browse">
        <div id="main-content">
          <h2>Transcripts</h2>
          <ul>
            {transcripts.map((transcript) => (
              <li key={transcript.id}>
                <Link href={`/${transcript.id}`}>
                  <a>{transcript.name}</a>
                </Link>
              </li>
             ))}
          </ul>
        </div>
      </SecondaryNavLayout>
      <style jsx>
        {`
          #main-content {
            grid-template-columns: 5fr;
          }

          h2 {
            font-size: var(--text-l);
          }

          li {
            padding-top: var(--space-xs);
          }
        `}
      </style>
    </>
  );
}