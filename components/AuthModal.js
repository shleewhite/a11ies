import React, { useEffect, useRef } from "react";
import * as Modal from "react-modal";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { uiConfig, auth } from "../lib/auth";

const AuthModal = ({ isOpen, handleClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    Modal.setAppElement(body);
  }, []);

  return (
    <Modal isOpen={isOpen} contentLabel="Log In" ref={modalRef}>
      <h2>Log in to a11ies.info</h2>
      {children}
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
      <button aria-label="close" onClick={handleClose}>
        X
      </button>
    </Modal>
  );
};

export default AuthModal;
