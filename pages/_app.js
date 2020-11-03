import React, { useEffect, useState } from "react";

import { auth, getAccessLevel } from "../lib/auth";

import "../styles/globals.css";

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

  return (
    <Component
      {...{
        user: currentUser,
        ...pageProps,
      }}
    />
  );
}

export default App;
