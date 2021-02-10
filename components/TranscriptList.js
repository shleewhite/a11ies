import React from "react";
import Link from "next/link";

const TranscriptList = ({ transcripts, showHashtags }) => {
  return (
    <>
      <ul>
        {transcripts.map((transcript) => (
          <li key={transcript.id}>
            <TranscriptListItem
              transcript={transcript}
              showHashtags={showHashtags}
            />
          </li>
        ))}
      </ul>
      <style jsx>
        {`
          ul {
            margin: 0;
            padding: 0;
            list-style-type: none;
          }
        `}
      </style>
    </>
  );
};

const TranscriptListItem = ({ transcript, showHashtags }) => {
  return (
    <>
      <div>
        <Link href={`/${transcript.id}`}>
          <a className="transcriptName">{transcript.name}</a>
        </Link>
        {transcript.creatorName ? (
          <span>by {transcript.creatorName}</span>
        ) : null}
        {showHashtags && transcript.hashtags ? (
          <ul aria-label="Hashtags">
            {transcript.hashtags.map((hashtag, i) => (
              <li key={i}>
                <Link href={`/browse/hashtags/${hashtag}`}>
                  <a>#{hashtag}</a>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <style jsx>
        {`
          div {
            padding: var(--space-s) 0;
            margin-top: var(--space-s);
            border-radius: 5px;
          }

          .transcriptName {
            font-size: var(--text-m);
          }

          span {
            padding-left: var(--space-xs);
          }

          ul {
            padding: var(--space-xs) 0;
            list-style-type: none;
          }

          li {
            display: inline-block;
            padding-right: var(--space-xs);
          }

          li a {
            color: var(--body-c);
          }
        `}
      </style>
    </>
  );
};

export default TranscriptList;
