import React, { useState } from "react";

import Layout from "../components/Layouts/Layout";
import Input from "../components/Input";
import FormAuth from "../components/FormAuth";

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

  if (isSubmitted) {
    return <div>woo</div>;
  }

  return (
    <FormAuth cb={setContext}>
      <Layout title="Request">
        {/* <p>Wouldn't it be cool if someone transcribed that thing for you?</p> */}

        <Input id="link" label="Link to original document" required />
        <Input
          label="Email me when it has been transcribed"
          type="checkbox"
          id="email-alert"
        />

        <button onClick={submitRequest}>Submit Request</button>
      </Layout>
    </FormAuth>
  );
}
