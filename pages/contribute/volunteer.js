import React, { useState } from "react";
import Link from "next/link";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import TextEditor from "../../components/TextEditor";
import FormAuth from "../../components/FormAuth";
import FormSuccess from "../../components/FormSuccess";

import { createVolunteerApp } from "../../lib/volunteers";

export default function Contribute() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [{ isLoggedIn, uid }, setContext] = useState({
    isLoggedIn: false,
    uid: "",
  });

  const submitApplication = async () => {
    if (isLoggedIn) {
      const response = document.getElementById("free-response").value;
      await createVolunteerApp(uid, { response }, setIsSubmitted(true));
    }
  };

  return (
    <FormAuth cb={setContext}>
      <SecondaryNavLayout title="Volunteer" subnav="Contribute">
        {isSubmitted ? (
          <FormSuccess>
            <p>
              Thank you for applying! We will get back to you as soon as
              possible.
            </p>
            <Link href="/contribute/resources">
              <a>Learn how to write transcripts</a>
            </Link>
          </FormSuccess>
        ) : (
          <>
            <span className="f6 db mb2">
              <span className="b">Why do you want to help transcribe?</span>{" "}
              (required)
            </span>
            <TextEditor
              label="Why do you want to help transcribe? (required), rich text editor"
              name="free-response"
            />

            <button onClick={submitApplication}>Submit Application</button>
          </>
        )}
      </SecondaryNavLayout>
    </FormAuth>
  );
}
