import React, { useState } from "react";

import Layout from "../components/Layouts/Layout";
import Input from "../components/Input";
import FormAuth from "../components/FormAuth";
import FormSuccess from "../components/FormSuccess";

import { createRequest } from "../lib/request";

export default function Request() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [{ isLoggedIn, uid }, setContext] = useState({
    isLoggedIn: false,
    uid: "",
  });

  const submitRequest = async () => {
    if (isLoggedIn) {
      const link = document.getElementById("link").value;
      const emailAlert = document.getElementById("email-alert").checked;
      await createRequest(uid, { link, emailAlert }, setIsSubmitted(true));
    }
  };

  return (
    <FormAuth cb={setContext}>
      <Layout title="Request">
        {isSubmitted ? (
          <FormSuccess
            ctaButtons={[
              { link: "", label: "Submit another request" },
              { link: "/browse", label: "Browse transcripts" },
            ]}
          >
            <p>Your request has been submitted!</p>
          </FormSuccess>
        ) : (
          <>
            <Input id="link" label="Link to original document" required />
            <Input
              label="Email me when it has been transcribed"
              type="checkbox"
              id="email-alert"
            />
            <button onClick={submitRequest}>Submit Request</button>
          </>
        )}
      </Layout>
    </FormAuth>
  );
}
