import Link from "next/link";

import { getAllHashtags } from "../../../lib/hashtags";
import SecondaryNavLayout from "../../../components/Layouts/SecondaryNavLayout";
import Accordion from "../../../components/Accordion";
import Card from "../../../components/Card";
import Prompt from "../../../components/Prompt";

export async function getStaticProps() {
  const hashtags = await getAllHashtags();
  return {
    props: { hashtags },
  };
}

export default function Hashtags({hashtags}) {
  return (
    <>
      <SecondaryNavLayout title="Browse hashtags" subnav="Browse">
        <div id="main-content">
          <ul>
            {hashtags.map((hashtagData) => (
              <li key={hashtagData.id}>
                <Link href={`/browse/hashtags/${hashtagData.hashtag}`}>
                  <a>#{hashtagData.hashtag} ({hashtagData.transcriptIds.length})</a>
                </Link>
              </li>
             ))}
          </ul>

          <div>
            <Prompt headerLevel="2" />
          </div>
        </div>
      </SecondaryNavLayout>
      <style jsx>
        {`
          @media (min-width: 620px) {
            #main-content {
              column-count: 1;
            }
          }

          @media (min-width: 960px) {
            #main-content {
              column-count: 2;
              column-gap: 80px;
              grid-template-columns: 1fr 300px;
            }

            #main-content > div {
              align-self: end;
            }
          }

          li {
            font-size: var(--text-l);
            padding-top: var(--space-s);
          }
        `}
      </style>
    </>
  );
}
