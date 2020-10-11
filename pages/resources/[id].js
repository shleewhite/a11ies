import React from "react";

import { getAllResourceIds, getResourceData } from "../../lib/resources";

import Layout from "../../components/Layout";

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
    <Layout title={`${resourceData.title} | A11ies.info`}>
      <div dangerouslySetInnerHTML={{ __html: resourceData.contentHtml }} />
      <style jsx />
    </Layout>
  );
}
