import React from "react";
import Head from "next/head";

import Footer from "../Footer";
import Header from "../Header";
import SubNav from "../SubNav";
import Hero from "../Hero";

export default function Layout({ children, title, subNavItems }) {
  const formattedTitle =
    title === "A11ies.info" ? title : `${title} | A11ies.info`;
  return (
    <>
      <Head>
        <title>{formattedTitle}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div id="page-container">
        <div id="nav-container">
          <Header />
          {subNavItems ? <SubNav items={subNavItems} /> : null}
        </div>
        <main>
          <Hero title={title} />
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
