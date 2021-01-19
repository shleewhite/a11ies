// import Link from "next/link";

import { getAllTranscriptData } from "../../lib/transcripts";
import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Prompt from "../../components/Prompt";
import TranscriptList from "../../components/TranscriptList";

export async function getStaticProps() {
  const transcripts = await getAllTranscriptData(true);
  return {
    props: { transcripts },
  };
}

export default function Transcripts({ transcripts }) {
  return (
    <SecondaryNavLayout
      title="All Transcripts"
      subnav="Browse"
      styles="
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: var(--space-m) var(--space-l);
        gap: var(--space-m) var(--space-l);
        justify-content: center;
        align-items: end;
      "
      wideStyles="
        grid-template-columns: 1fr 300px;
      "
    >
      <TranscriptList transcripts={transcripts} showHashtags />

      <div>
        <Prompt headerLevel="2" />
      </div>
    </SecondaryNavLayout>
  );
}
