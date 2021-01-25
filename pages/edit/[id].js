import React, {useContext, useState} from "react";


import AuthModal from "../../components/AuthModal";
import Layout from "../../components/Layouts/Layout";
import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Prompt from "../../components/Prompt";
import TranscriptForm from "../../components/TranscriptForm";

import { UserContext } from "../../lib/user_context";
import { getTranscriptData } from "../../lib/transcripts";

export async function getServerSideProps({ params }) {
  const transcriptData = await getTranscriptData(params.id);
  return {
    props: { transcriptData },
  };
}

export default function Edit({ transcriptData }) {
  const context = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(!context.isLoggedIn);
  console.log(context.user);

  /* not logged in */
  if (!context.isLoggedIn) {
    return (
      <>
        <SecondaryNavLayout title="Edit Transcript" subnav="Contribute">
          <Prompt/>
        </SecondaryNavLayout>
        <AuthModal
          isOpen={isModalOpen}
          handleClose={async () => {
            setIsModalOpen(false);
          }}
        >
          <div>Please log in first.</div>
        </AuthModal>
      </>
    );
  /* transcript doesn't exist / no transcript access */
  } else if (!transcriptData || context.user.uid != transcriptData.uid) {
    return (
      <Layout title="Hmm...">
        <Prompt />
      </Layout>
    );
  } else {
    return (
     <SecondaryNavLayout title="Edit Transcript" subnav="Contribute">
       <TranscriptForm transcriptData={transcriptData}/>
     </SecondaryNavLayout>
    );
  }
}
