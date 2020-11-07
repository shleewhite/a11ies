import React, { useContext, useState } from "react";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Input from "../../components/Input";
import TextEditor from "../../components/TextEditor";

import { createVolunteerApp } from "../../lib/volunteers";
import { UserContext } from "../../lib/user_context";

export default function Contribute() {
  const context = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submitApplication = async () => {
    if (context.isLoggedIn) {
      const response = {};
      // const response = document.getElementById("free-response").value;
      await createVolunteerApp(
        context.user.uid,
        { response },
        setIsSubmitted(true)
      );
    }
  };

  if (isSubmitted) {
    return (
      <SecondaryNavLayout title="Success" subnav="Contribute">
        <p>
          Your application has been submitted. We will get back to you as soon
          as possible.
        </p>
      </SecondaryNavLayout>
    );
  }

  return (
    <SecondaryNavLayout title="Volunteer" subnav="Contribute">
      {/* <p>
        This is a description of how awesome it is to help out with a11ies.info.
        Wow like it is truly the best decision I have ever made in my life.
      </p> */}

      <span className="f6 db mb2">
        <span className="b">Why do you want to help transcribe?</span>{" "}
        (required)
      </span>
      <TextEditor
        label="Why do you want to help transcribe? (required), rich text editor"
        name="free-response"
      />

      <button onClick={submitApplication}>Submit Application</button>
    </SecondaryNavLayout>
  );
}
