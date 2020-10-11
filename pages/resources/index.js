import React from 'react';
import { getAllResourceData } from '../../lib/resources';
import Layout from '../../components/Layout';
import Link from 'next/link';

export async function getStaticProps({}) {
  const resourceData = await getAllResourceData()
  return {
    props: {
      resourceData
    }
  }
}

const ResourceList = ({resourceData}) => {
  return (
    <Layout title="Resources | A11ies.info">
      <ul>
        {
          resourceData.map((item) => (
            <li>
              <Link href={`/resources/${item.id}`}>
                <a>{item.title}</a>
              </Link>
            </li>
          ))
        }
      </ul>
    </Layout>
  )
}

export default ResourceList;
