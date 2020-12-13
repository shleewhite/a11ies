import React from "react";

import Link from "next/link";

import { getAllDocsData } from "../../lib/docs";
import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";

export async function getStaticProps() {
  const resourceData = await getAllDocsData("resources");
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
