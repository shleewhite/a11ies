import React from 'react';
import { getAllResourceIds, getResourceData } from '../../lib/resources';

export async function getStaticPaths() {
  const paths = getAllResourceIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const resourceData = getResourceData(params.id)
  return {
    props: {
      resourceData
    }
  }
}


export default function Resource({ resourceData }) {
  return (
    <>{resourceData.title}</>
  )
};
