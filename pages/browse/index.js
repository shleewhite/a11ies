import Link from "next/link";

import { BREAKPOINTS } from "../../lib/constants";
import { getTranscriptList } from "../../lib/transcripts";
import { getHashtagList } from "../../lib/hashtags";
import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Card from "../../components/Card";

const COUNT = 5;

export async function getStaticProps() {
  const transcripts = await getTranscriptList(true, COUNT);
  const hashtags = await getHashtagList(true, COUNT);
  return {
    props: { transcripts, hashtags }
  };
}

export default function Browse({ transcripts, hashtags }) {
  return (
    <>
      <SecondaryNavLayout
        title="Featured"
        subnav="Browse"
        styles="
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: var(--space-m) var(--space-l);
          gap: var(--space-m) var(--space-l);
          justify-content: center;
        "
        wideStyles="
          grid-template-columns: 1fr 1fr;
        "
      >
        <div className="top-card">
          <Card
            headerLevel={2}
            header="Featured Transcript: Preventing Burnout"
            imgLink="https://scontent-sjc3-1.cdninstagram.com/v/t51.2885-15/e35/101447688_1659169064236953_3535803827729120082_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com&_nc_cat=109&_nc_ohc=HxsPdguFgT8AX9LUFxA&tp=1&oh=0a418be66ec4e7ac0d301feb839fa411&oe=602D92AE"
          >
            <p>
              Burnout happens to everyone. It's important to learn how to
              recognize the signs and recover.
            </p>
            <Link href="/preventing-burnout">
              <a className="pill">Read the transcript →</a>
            </Link>
          </Card>
        </div>
        <Card header="Top hashtags" headerLevel={2} hasTopZazz>
          <ul>
            {hashtags.map((hashtag) => (
              <li key={hashtag.id}>
                <Link href={`/browse/hashtags/${hashtag.id}`}>
                  <a className="pill">#{hashtag.formattedHashtag}</a>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
        <Card header="Recent transcripts" headerLevel={2} hasTopZazz>
          <ul>
            {transcripts.map((transcript) => (
              <li key={transcript.id}>
                <Link href={transcript.id}>
                  <a className="pill">{transcript.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </SecondaryNavLayout>
      <style jsx>
        {`
          ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }

          li {
            padding: var(--space-s) 0 var(--space-s) 0;
          }

          .top-card {
            width: auto;
            justify-self: center;
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            .top-card {
              grid-column: 1 / span 2;
              max-width: 70%;
            }
          }
        `}
      </style>
    </>
  );
}
