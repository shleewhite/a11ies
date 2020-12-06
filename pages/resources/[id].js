import React from "react";

import { getAllResourceIds, getResourceData } from "../../lib/resources";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";

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
    <SecondaryNavLayout title={resourceData.title} subnav="Contribute">
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: resourceData.contentHtml }} />
    </SecondaryNavLayout>
  );
}
