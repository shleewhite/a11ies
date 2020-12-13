import React, { useEffect, useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import Link from "next/link";
import Router from "next/router";

import { auth, getAccessLevel } from "../lib/auth";
import { UserContext } from "../lib/user_context";
import * as gtag from "../lib/gtag";

import "../styles/globals.css";

import Layout from "../components/Layouts/Layout";

// count pageview when router changes
Router.events.on("routeChangeComplete", (url) => gtag.pageview(url));

function App({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const accessLevel = await getAccessLevel();

        setCurrentUser({
          name: user.displayName,
          profilePhoto: user.photoURL,
          uid: user.uid,
          accessLevel,
        });
      }
    });
  }, []);

  const components = {
    layout: Layout,
    link: Link,
  };

  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        isLoggedIn: currentUser !== undefined,
      }}
    >
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </UserContext.Provider>
  );
}

export default App;
