import React, { useContext, useState } from "react";
import shortid from "shortid";
import Link from "next/link";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Input from "../../components/Input";
import TextEditor from "../../components/TextEditor";

import { UserContext } from "../../lib/user_context";
import { createTranscript } from "../../lib/transcripts";
// TODO: Url validation: import { URL_REGEX } from '../constants';
// TODO: Url validation: throw an error if the short url already exists

export default function Create() {
  const context = useContext(UserContext);
  const [isPublished, setIsPublished] = useState(false);
  let url;

  const submitTranscript = (event) => {
    event.preventDefault();
    if (context.isLoggedIn) {
      const data = new FormData(document.forms.create);
      const hashtags =
        data.get("hashtags") === ""
          ? []
          : data
              .get("hashtags")
              .replace("#", "")
              .split(/\s*,*\s+#*/);
      url = data.get("url") === "" ? shortid.generate() : data.get("url");

      createTranscript(
        url,
        {
          link: data.get("link"),
          name: data.get("name"),
          creatorName: data.get("creatorName"),
          creatorLink: data.get("creatorLink"),
          transcript: data.get("transcript"),
          searchable: data.get("searchable") !== null,
          hashtags,
          uid: context.user.uid,
        },
        () => {
          setIsPublished(true);
        }
      );
    }
  };

  if (isPublished) {
    return (
      <SecondaryNavLayout title="Success" subnav="Contribute">
        <p>
          Your transcript is now published at:{" "}
          <Link href={`/${url}`}>
            <a>{`a11ies.info/${url}`}</a>
          </Link>
        </p>
      </SecondaryNavLayout>
    );
  }

  return (
    <SecondaryNavLayout title="Transcribe" subnav="Contribute">
      {/* <p>random descriptive text</p> */}
      <form action="" className="" onSubmit={submitTranscript} id="create">
        <Input label="Document Name (required)" required id="name" />

        <Input
          label="Link to original document (required)"
          required
          type="url"
          id="link"
        />

        <Input label="Original creator's name" id="creatorName" />

        <Input label="Link to original creator" type="url" id="creatorLink" />

        <span className="f6 db mb2">
          <span className="b">Transcript</span> (required)
        </span>
        <TextEditor
          name="transcript"
          label="Transcript, Rich Text Editor"
          id="transcript"
        />

        <Input label="Relevant hashtags" id="hashtags" />

        <Input
          label="Transcript can appear in a11ies.info search results"
          type="checkbox"
          id="searchable"
        />

        <Input label="Custom URL for transcript" id="url" />

        <input type="submit" value="Publish Transcript" name="submit" />
      </form>
    </SecondaryNavLayout>
  );
}
