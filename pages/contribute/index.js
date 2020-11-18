import React, { useState } from "react";
import { nolookalikes } from "nanoid-generate"; // generates unique id without characters that look similar ie. 1 and I
import Link from "next/link";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Input from "../../components/Input";
import TextEditor from "../../components/TextEditor";
import FormAuth from "../../components/FormAuth";
import FormSuccess from "../../components/FormSuccess";

import { createTranscript } from "../../lib/transcripts";
// TODO: Url validation: import { URL_REGEX } from '../constants';
// TODO: Url validation: throw an error if the short url already exists

export default function Create() {
  const [isPublished, setIsPublished] = useState(false);
  const [url, setURL] = useState("");
  const [{ isLoggedIn, uid }, setContext] = useState({
    isLoggedIn: false,
    uid: "",
  });

  const submitTranscript = (event) => {
    event.preventDefault();
    if (isLoggedIn) {
      const data = new FormData(document.forms.create);
      const hashtags =
        data.get("hashtags") === ""
          ? []
          : data
              .get("hashtags")
              .replace("#", "")
              .split(/\s*,*\s+#*/);

      setURL(data.get("url").length > 0 ? nolookalikes(6) : data.get("url"));

      createTranscript(
        url,
        {
          link: data.get("link"),
          name: data.get("name"),
          creatorName: data.get("creatorName"),
          creatorLink: data.get("creatorLink"),
          transcript: data.get("transcript"),
          searchable: data.get("searchable") !== null,
          publishDate: Date.now(),
          hashtags,
          uid,
        },
        () => {
          setIsPublished(true);
        }
      );
    }
  };

  const resetForm = () => {
    setIsPublished(false);
    setURL("");
  };

  return (
    <FormAuth cb={setContext}>
      <SecondaryNavLayout title="Transcribe" subnav="Contribute">
        {isPublished ? (
          <FormSuccess>
            <p>
              Your transcript is now published at:{" "}
              <Link href={`/${url}`}>
                <a>{`a11ies.info/${url}`}</a>
              </Link>
            </p>
            <button onClick={resetForm}>Write another transcript</button>
          </FormSuccess>
        ) : (
          <form action="" className="" onSubmit={submitTranscript} id="create">
            <Input label="Document Name (required)" required id="name" />

            <Input
              label="Link to original document (required)"
              required
              type="url"
              id="link"
            />

            <Input label="Original creator's name" id="creatorName" />

            <Input
              label="Link to original creator"
              type="url"
              id="creatorLink"
            />

            <span className="f6 db mb2">
              <span className="b">Transcript</span> (required)
            </span>
            <TextEditor
              name="transcript"
              label="Transcript (required), Rich Text Editor"
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
        )}
      </SecondaryNavLayout>
    </FormAuth>
  );
}
