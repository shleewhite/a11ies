import React from "react";

import Link from "next/link";

import { getAllResourceData } from "../../../lib/resources";
import ContributeLayout from "../../../components/Layouts/ContributeLayout";

export async function getStaticProps() {
  const resourceData = await getAllResourceData();
  return {
    props: {
      resourceData,
    },
  };
}

const ResourceList = ({ resourceData }) => {
  return (
    <ContributeLayout title="Resources">
      <ul>
        {resourceData.map((item) => (
          <li key={item.id}>
            <Link href={`/resources/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </ContributeLayout>
  );
};

export default ResourceList;
