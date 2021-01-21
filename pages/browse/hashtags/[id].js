// import Link from "next/link";

import { getHashtagData, getTranscriptsByHashtag } from "../../../lib/hashtags";
import SecondaryNavLayout from "../../../components/Layouts/SecondaryNavLayout";
// import Card from "../../../components/Card";
import Prompt from "../../../components/Prompt";
import TranscriptList from "../../../components/TranscriptList";

export async function getServerSideProps({ params }) {
  const query = params.id;
  const hashtagData = await getHashtagData(query);
  const transcripts = hashtagData
    ? await getTranscriptsByHashtag(query)
    : null;
  return {
    props: {
      query,
      hashtagData,
      transcripts,
    },
  };
}

export default function Hashtag({ query, hashtagData, transcripts }) {
  if (!hashtagData || transcripts.length === 0) {
    return (
      <>
        <SecondaryNavLayout title="Sorry!" subnav="Browse">
          <div id="main-content">
            <Prompt
              headerLevel="2"
              header={`We couldn't find any transcripts tagged with #${query}!`}
            />
          </div>
        </SecondaryNavLayout>
      </>
    );
  }
  return (
    <>
      <SecondaryNavLayout title={`#${hashtagData.hashtag}`} subnav="Browse">
        <div>
          <h2>Transcripts</h2>
          <TranscriptList transcripts={transcripts} showHashtags={false} />
        </div>
      </SecondaryNavLayout>
      <style jsx>
        {`
          div {
            grid-template-columns: 5fr;
          }

          h2 {
            font-size: var(--text-l);
          }
        `}
      </style>
    </>
  );
}
