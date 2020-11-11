import React from "react";
import Head from "next/head";

import Footer from "../Footer";
import Header from "../Header";
import SubNav from "../SubNav";
import Hero from "../Hero";

export default function Layout({
  children,
  title,
  subtitle,
  subNavItems,
  mainStyles,
}) {
  const formattedTitle =
    title === "a11ies.info" ? title : `${title} | a11ies.info`;

  return (
    <>
      <Head>
        <title>{formattedTitle}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div id="page-container">
        <div id="nav-container">
          <div>
            <Header />
            {subNavItems ? <SubNav items={subNavItems} /> : null}
          </div>
        </div>

        <main>
          <Hero title={title} subtitle={subtitle} />
          {children}
        </main>
        <Footer />
      </div>

      <style jsx>
        {`
          main {
            ${mainStyles}
          }
        `}
      </style>
    </>
  );
}
