import React from "react";
import Head from "next/head";

import Footer from "../Footer";
import Header from "../Header";
import SubNav from "../SubNav";

export default function Layout({ children, title, subNavItems }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      {subNavItems ? <SubNav items={subNavItems} /> : null}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
