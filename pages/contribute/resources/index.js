import React from "react";

import Link from "next/link";

import { getAllResourceData } from "../../../lib/resources";
import SecondaryNavLayout from "../../../components/Layouts/SecondaryNavLayout";

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
    <SecondaryNavLayout title="Resources" subnav="Contribute">
      <ul>
        {resourceData.map((item) => (
          <li key={item.id}>
            <Link href={`/resources/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </SecondaryNavLayout>
  );
};

export default ResourceList;
