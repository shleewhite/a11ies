import React, { useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as cn from "classnames";
import Menu from "./Menu";
import AuthModal from "./AuthModal";

import { HEADER_PATHS, BREAKPOINTS } from "../lib/constants";
import { signOut } from "../lib/auth";
import { UserContext } from "../lib/user_context";

const UserMenu = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const label = "Account";

  const menuButtonContent = 
    context.user && context.user.profilePhoto ? 
      (<img src={context.user.profilePhoto} alt={label} title={label} />) :
      (<span>{label}</span>)
    ;

  const menuItems = [
    { label: "Manage transcripts", onClick: () => {router.push('/manage')} },
    { label: "Sign out", onClick: signOut }
  ];

  if (context.user !== undefined && context.user.accessLevel > 0) {
    menuItems.unshift({ label: "Do admin stuff", onClick: () => {router.push('/admin')}});
  }

  return (
    <Menu
      buttonContent={menuButtonContent}
      items={menuItems}
      label={label}
    />
  );
}

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
        </div>
        <div className="nav-secondary">
          {context.isLoggedIn ? (
            <UserMenu context={context} />
          ) : (
            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Sign in
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
            grid-template-columns: 80% 1fr;
          }

          .nav-link-container {
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
            justify-self: end;
            align-self: end;
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

              justify-self: auto;
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

          @media ${BREAKPOINTS.MEDIUM} {
            nav {
              grid-template-columns: 40rem 1fr;
            }
          }

          a {
            color: var(--body-c);
          }
        `}
      </style>
    </>
  );
};

export default Header;
