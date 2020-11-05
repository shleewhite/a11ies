import React, { useEffect, useState } from "react";

import { auth, getAccessLevel } from "../lib/auth";
import { UserContext } from "../lib/user_context";

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
    <UserContext.Provider
      value={{
        user: currentUser,
        isLoggedIn: currentUser !== undefined,
      }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default App;
