import Link from "next/link";

import { getAllHashtags } from "../../../lib/hashtags";
import SecondaryNavLayout from "../../../components/Layouts/SecondaryNavLayout";
// import Accordion from "../../../components/Accordion";
// import Card from "../../../components/Card";
import Prompt from "../../../components/Prompt";

export async function getStaticProps() {
  const hashtags = await getAllHashtags();
  return {
    props: { hashtags },
  };
}

export default function Hashtags({ hashtags }) {
  return (
    <>
      <SecondaryNavLayout
        title="All Hashtags"
        subnav="Browse"
        styles="
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: var(--space-m) var(--space-l);
          gap: var(--space-m) var(--space-l);
          justify-content: center;
          align-items: end;
        "
        wideStyles="
          grid-template-columns: 1fr 300px;
        "
      >
        <ul>
          {hashtags.map((hashtagData) => (
            <li key={hashtagData.id}>
              <Link href={`/browse/hashtags/${hashtagData.hashtag}`}>
                <a>
                  <span>#{hashtagData.hashtag}</span> (
                  {hashtagData.transcriptIds.length})
                </a>
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <Prompt headerLevel="2" />
        </div>
      </SecondaryNavLayout>
      <style jsx>
        {`
          li {
            font-size: var(--text-m);
            padding-top: var(--space-s);
          }

          ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          a span {
            color: black;
          }
        `}
      </style>
    </>
  );
}
