import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import InstagramEmbed from "react-instagram-embed";

export default function SocialMediaEmbed({ url, msg }) {
  if (url.includes("https://twitter")) {
    const {
      groups: { id },
    } = url.match(/status\/(?<id>\d+)/);
    return <TwitterTweetEmbed tweetId={id} />;
  }

  if (url.includes("https://instag") || url.includes("https://www.instag")) {
    console.log("hi", url);
    return (
      <InstagramEmbed
        url={url}
        protocol="https"
        clientAccessToken="823545711754213|b1a8bcf48e0d19dbddd4f4ec5f9d13ed"
        onLoading={() => {
          console.log("loadign.......");
        }}
        onSuccess={(res) => {
          console.log("hell yeah", res.error.message);
        }}
        onFailure={() => {
          console.log("bummer");
        }}
      />
    );
  }

  return <span>{msg || "Sorry! Something is wrong..."}</span>;
}
