import React, { useState } from "react";
import Link from "next/link";

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
      await createRequest({ link, emailAlert, uid }, setIsSubmitted(true));
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <FormAuth cb={setContext}>
      <Layout title="Request">
        {isSubmitted ? (
          <FormSuccess>
            <p>Your request has been submitted!</p>
            <button onClick={resetForm}>Submit another request</button>
            <Link href="/browse">
              <a>Browse existing transcripts</a>
            </Link>
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
