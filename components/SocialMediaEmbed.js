import React, { useEffect, useRef } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";

export default function SocialMediaEmbed({ url, msg }) {
  const urlRef = useRef();

  const handleRender = () => {
    if (url.includes("https://twitter")) {
      const {
        groups: { id },
      } = url.match(/status\/(?<id>\d+)/);
      return <TwitterTweetEmbed tweetId={id} />;
    }

    if (url.includes("https://www.instag")) {
      return (
        <InstagramEmbed
          url={url}
          clientAccessToken="823545711754213|b1a8bcf48e0d19dbddd4f4ec5f9d13ed"
        />
      );
    }

    return <span>{msg || "Unable to show preview."}</span>;
  };

  useEffect(() => {
    if (url !== urlRef.current) {
      urlRef.current = url;
      handleRender();
    }
  });

  return handleRender();
}
