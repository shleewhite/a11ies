import React from "react";

import { getAllDocsIds, getDocData } from "../../lib/docs";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";

export async function getStaticPaths() {
  const paths = getAllDocsIds("policies/");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const policyData = await getDocData(params.id, "policies");
  return {
    props: {
      policyData,
    },
  };
}

export default function Resource({ policyData }) {
  return (
    <SecondaryNavLayout title={policyData.title} subnav="Contribute">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: policyData.contentHtml }} />
    </SecondaryNavLayout>
  );
}
