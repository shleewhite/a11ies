import React from "react";
import Link from "next/link";

import { getAllDocsIds } from "../../lib/docs";
import Layout from "../../components/Layouts/Layout";

export async function getStaticProps() {
  const policyData = await getAllDocsIds("policies");
  return {
    props: {
      policyData,
    },
  };
}

const ResourceList = ({ policyData }) => {
  return (
    <Layout title="Policies">
      <ul>
        {policyData.map((item) => (
          <li key={item.id}>
            <Link href={`/policy/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default ResourceList;
