import React from "react";

import { getAllResourceIds, getResourceData } from "../../../lib/resources";

import ContributeLayout from "../../../components/Layouts/ContributeLayout";

export async function getStaticPaths() {
  const paths = getAllResourceIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resourceData = await getResourceData(params.id);
  return {
    props: {
      resourceData,
    },
  };
}

export default function Resource({ resourceData }) {
  return (
    <ContributeLayout title={resourceData.title}>
      <div dangerouslySetInnerHTML={{ __html: resourceData.contentHtml }} />
    </ContributeLayout>
  );
}
