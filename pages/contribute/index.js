import React, { } from "react";
import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import TranscriptForm from "../../components/TranscriptForm";
import { createTranscript } from "../../lib/transcripts";

export default function Create() {
  return (
    <SecondaryNavLayout title="Transcribe" subnav="Contribute">
      <TranscriptForm/>
    </SecondaryNavLayout>
  );
}
