import React, { useState, useContext, useEffect } from "react";

import AuthModal from "./AuthModal";

import { UserContext } from "../lib/user_context";

export default function FormAuth({ cb, children }) {
  const context = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(!context.isLoggedIn);
    if (cb && context.isLoggedIn)
      cb({ isLoggedIn: context.isLoggedIn, uid: context.user.uid });
  }, []);

  return (
    <>
      {children}
      <AuthModal
        isOpen={isModalOpen}
        handleClose={async () => {
          setIsModalOpen(false);
        }}
      >
        <div>Please log in first</div>
      </AuthModal>
    </>
  );
}
