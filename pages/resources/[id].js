import React from "react";

import { getAllDocsIds, getDocData } from "../../lib/docs";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";

export async function getStaticPaths() {
  const paths = getAllDocsIds("resources");
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resourceData = await getDocData(params.id, "resources");
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
      <style jsx>
        {`
          a {
            font-weight: bold;
          }
        `}
      </style>
    </SecondaryNavLayout>
  );
}
