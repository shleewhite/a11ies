import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as cn from "classnames";

import AuthModal from "./AuthModal";

import { HEADER_PATHS, BREAKPOINTS } from "../lib/constants";
import { signOut } from "../lib/auth";
import { UserContext } from "../lib/user_context";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const context = useContext(UserContext);

  return (
    <>
      <nav aria-label="Primary">
        <div className="nav-link-container">
          {HEADER_PATHS.map((link, i) => {
            let isCurrent;

            if (router.pathname === "/" || link.href === "/")
              isCurrent = router.pathname === link.href;
            else {
              const cleanedPath = router.pathname.replace("/", "");
              const cleanedHref = link.href.replace("/", "");
              isCurrent = cleanedPath.includes(cleanedHref);
            }

            return (
              <div className="nav-link" key={i}>
                <div
                  className={cn({
                    "half-circle": isCurrent,
                    "hidden-half-circle": !isCurrent,
                  })}
                />
                <Link href={link.href}>
                  <a aria-current={isCurrent}>{link.name}</a>
                </Link>
              </div>
            );
          })}
          {context.user !== undefined && context.user.accessLevel > 0 ? (
            <div className="nav-link">
              <div
                className={cn({
                  "half-circle": router.pathname.includes("admin"),
                  "hidden-half-circle": !router.pathname.includes("admin"),
                })}
              />
              <Link href="/admin">
                {/* TODO: make this not false */}
                <a aria-current={false}>Admin</a>
              </Link>
            </div>
          ) : null}
        </div>
        <div className="nav-secondary">
          <div />
          <label htmlFor="global-search">Search</label>
          <input id="global-search" type="search" />
          {context.isLoggedIn ? (
            <button onClick={signOut}>Log Out</button>
          ) : (
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Login
            </button>
          )}
        </div>
      </nav>
      <AuthModal
        isOpen={isModalOpen}
        handleClose={async () => {
          setIsModalOpen(false);
        }}
      />

      <style jsx>
        {`
          nav {
            font-size: var(--text-s);
            display: grid;
            grid-template-columns: 1fr;


          }

          .nav-link-container {
            grid-column: 1 / 3;
            display: grid;
            grid-template-columns: repeat(
              ${HEADER_PATHS.length +
              (context.user !== undefined && context.user.accessLevel > 0
                ? 1
                : 0)},
              auto
            );
          }

          .nav-secondary {
            justify-self: center;
            align-self: center;

            display: grid;
            grid-template-columns: auto 2fr 1fr;
            grid-template-rows: 10px auto;
            align-items: center;
            gap: 0px 20px;
            grid-gap: 0px 20px;
            justify-items: center;
          }

          .nav-secondary > :first-child {
            grid-column: 1 / span 3;
          }

          .nav-link {
            display: grid;
            grid-template-rows: auto 1fr;
            justify-items: center;
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            nav {
              grid-template-columns: 1fr 2fr;
              grid-column: 1 / span 3;
            }

            .nav-link-container {
              grid-column: 1/2;
            }

            .nav-secondary {
              justify-self: end;
              align-self: end;
            }
          }

          .half-circle {
            width: 40px;
            height: 20px;
            border-radius: 0 0 150px 150px;
            background-color: var(--zazz-c);
          }

          .hidden-half-circle {
            width: 40px;
            height: 20px;
          }

          button {
            width: 80%;
          }

          label {
            font-size: var(--text-s);
            justify-self: end;
          }
        `}
      </style>
    </>
  );
};

export default Header;
