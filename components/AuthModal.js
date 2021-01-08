import React, { useEffect, useRef } from "react";
import * as Modal from "react-modal";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Link from "next/link";

import { uiConfig, auth } from "../lib/auth";

const AuthModal = ({ isOpen, handleClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    Modal.setAppElement(body);
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Sign In"
      ref={modalRef}
      style={{
        overlay: {
          backgroundColor: "rgba(34, 34, 34, 0.65)",
        },
        content: {
          borderRadius: "20px",
          width: "350px",
          height: "40vh",
          maxHeight: "60vh",
          margin: "auto auto",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gridGap: "var(--space-m)",
          padding: "var(--space-m) var(--space-l)",
        },
      }}
    >
      <div className="header">
        <h2>Sign in</h2>
        <button
          className="modal-close"
          aria-label="close"
          onClick={handleClose}
        >
          ×
        </button>
      </div>
      <div>
        {children}
        <StyledFirebaseAuth
          uiConfig={{
            ...uiConfig,
            callbacks: {
              // Avoid redirects after sign-in.
              signInSuccessWithAuthResult: () => {
                handleClose();
                return false;
              },
            },
          }}
          firebaseAuth={auth}
        />
      </div>
      <p>
        By clicking Sign in with Google or Twitter, you agree to a11ies.info's{" "}
        <Link href="/policy/terms-of-use">
          <a>Terms of Use</a>
        </Link>{" "}
        and{" "}
        <Link href="/policy/privacy-policy">
          <a>Privacy Policy</a>
        </Link>
        .
      </p>
      <style jsx>
        {`
          a {
            font-weight: bold;
          }

          button:focus,
          a:focus {
            border-bottom: 2px solid var(--border-c);
          }

          .header {
            display: flex;
            justify-content: space-between;
          }

          .modal-close {
            border: none;
            font-weight: bold;
            font-size: var(--text-l);
            border-radius: 0px;
          }
        `}
      </style>
    </Modal>
  );
};

export default AuthModal;
