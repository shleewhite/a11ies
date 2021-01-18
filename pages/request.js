import React, { useState, useEffect } from "react";
import Link from "next/link";

import Layout from "../components/Layouts/Layout";
import Input from "../components/Input";
import FormAuth from "../components/FormAuth";
import FormSuccess from "../components/FormSuccess";

import { BREAKPOINTS, ERROR_MESSAGES, URL_REGEX } from "../lib/constants";
import { createRequest } from "../lib/request";

export default function Request() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [{ isLoggedIn, uid }, setContext] = useState({
    isLoggedIn: false,
    uid: "",
  });
  const [linkError, setLinkError] = useState(null);
  const [focusId, setFocusId] = useState(null);

  const submitRequest = async () => {
    if (isLoggedIn) {
      const link = document.getElementById("link").value;
      /* Error handling -- requiredness */
      if (link.length === 0) {
        setLinkError(ERROR_MESSAGES.required);
        setFocusId("link");
        /* Error handling -- formatting */
      } else if (!URL_REGEX.test(link)) {
        setLinkError(ERROR_MESSAGES.badLinkFormat);
        setFocusId("link");
      } else {
        const emailAlert = document.getElementById("email-alert").checked;
        await createRequest({ link, emailAlert, uid }, setIsSubmitted(true));
      }
    }
  };

  /* Dynamically focus an element when requested */
  useEffect(() => {
    if (focusId) {
      const el = document.getElementById(focusId);
      if (el) {
        el.focus();
        // clear
        setFocusId(null);
      }
    }
  }, [focusId]);

  const resetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <FormAuth cb={setContext}>
      <Layout title="Request">
        {isSubmitted ? (
          <FormSuccess>
            <p>Your transcript request has been submitted!</p>
            <button onClick={resetForm}>Submit another request</button>
            <Link href="/browse">
              <a>Browse existing transcripts</a>
            </Link>
          </FormSuccess>
        ) : (
          <div className="container">
            <p>
              Request a transcript for a specific document and we'll add it to
              our volunteer transcription queue.
            </p>
            <div className="half-width-input">
              <Input
                id="link"
                label="Link to original document"
                required
                error={linkError}
              />
            </div>
            <Input
              label="Email me when the transcript's ready"
              type="checkbox"
              id="email-alert"
            />
            <button onClick={submitRequest}>Submit Request</button>
          </div>
        )}
      </Layout>
      <style jsx>
        {`
          .container {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: var(--space-m);
            gap: var(--space-m);
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            .container {
              grid-template-columns: 50%;
              grid-gap: var(--space-l) var(--space-m);
              gap: var(--space-l) var(--space-m);
            }

            button {
              width: 50%;
            }
          }
        `}
      </style>
    </FormAuth>
  );
}
