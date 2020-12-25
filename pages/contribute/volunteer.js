import React, { useState, useEffect } from "react";
import Link from "next/link";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import TextEditor from "../../components/TextEditor";
import FormAuth from "../../components/FormAuth";
import FormSuccess from "../../components/FormSuccess";

import { BREAKPOINTS } from "../../lib/constants";
import { createVolunteerApp } from "../../lib/volunteers";

export default function Contribute() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [{ isLoggedIn, uid }, setContext] = useState({
    isLoggedIn: false,
    uid: "",
  });
  const [responseError, setResponseError] = useState(null);
  const [focusId, setFocusId] = useState(null);

  const submitApplication = async () => {
    if (isLoggedIn) {
      const response = document.getElementsByName("free-response")[0].value;
      if (response.length == 0) {
        setResponseError("Please provide a brief answer. Thanks!");
        setFocusId("free-response");
      } else {
        await createVolunteerApp(uid, { response }, setIsSubmitted(true));  
      }
     
    }
  };

  /* Dynamically focus an element when requested */
  useEffect(() => {
    if (focusId) {
      let el = document.getElementById(focusId);
      if (el) { 
        el.focus();
        // clear
        setFocusId(null);
      }
    }
  }, [focusId]);

  return (
    <FormAuth cb={setContext}>
      <SecondaryNavLayout title="Volunteer" subnav="Contribute">
        {isSubmitted ? (
          <FormSuccess>
            <p>
              Thank you for applying to volunteer! We will get back to you as soon as
              possible.
            </p>
            <Link href="/contribute/resources">
              <a className="pill">Learn how to write transcripts</a>
            </Link>
          </FormSuccess>
        ) : (
          <div className="container">
            <p>
              Thanks for your interest! We're always looking for volunteers to 
              help transcribe content and moderate submissions! 
            </p>
            <div>
              <TextEditor
                label="Why do you want to help transcribe?"
                name="free-response"
                id="free-response"
                required
                error={responseError}
              />
            </div>
            <button onClick={submitApplication}>Submit volunteer application</button>
          </div>
        )}
      </SecondaryNavLayout>
      <style jsx>
        {
          `
            .container {
              display: grid;
              grid-template-columns: 1fr;
              grid-gap: var(--space-m);
              gap: var(--space-m);
            }

            @media ${BREAKPOINTS.MEDIUM_LARGE} {
              .container {
                grid-template-columns: 80%;
                grid-gap: var(--space-l) var(--space-m);
                gap: var(--space-l) var(--space-m);
              }

              button {
                width: 50%;
              }
            } 
          `
        }
      </style>
    </FormAuth>
  );
}
