import React, { useContext } from "react";
import shortid from "shortid";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Input from "../../components/Input";
import TextEditor from "../../components/TextEditor";

import { UserContext } from "../../lib/user_context";
import { createTranscript } from "../../lib/transcripts";
// TODO: Url validation: import { URL_REGEX } from '../constants';

export default function Create() {
  const context = useContext(UserContext);

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
      const url = data.get("url") === "" ? shortid.generate() : data.get("url");

      createTranscript(url, {
        link: data.get("link"),
        name: data.get("name"),
        creatorName: data.get("creatorName"),
        creatorLink: data.get("creatorLink"),
        transcript: data.get("transcript"),
        searchable: data.get("searchable"),
        hashtags,
        uid: context.user.uid,
      });
    }
  };

  return (
    <SecondaryNavLayout title="Transcribe" subnav="Contribute">
      <p>random descriptive text</p>
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
