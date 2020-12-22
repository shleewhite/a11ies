import React, { useState } from "react";
import { nolookalikes } from "nanoid-generate"; // generates unique id without characters that look similar ie. 1 and I
import Link from "next/link";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Input from "../../components/Input";
import TextEditor from "../../components/TextEditor";
import FormAuth from "../../components/FormAuth";
import FormSuccess from "../../components/FormSuccess";

import { RESERVED_PATHS, BREAKPOINTS } from "../../lib/constants";
import { createTranscript } from "../../lib/transcripts";
// TODO: Url validation: import { URL_REGEX } from '../constants';
// TODO: Url validation: throw an error if the short url already exists

const errors = {
  required: `Whoops! Don't forget this field is required.`,
  unavailableURL: `Alas, this short URL isn't available. Please choose 
    another one or leave blank to have one auto-generated.`,
  invalidURL: `Whoops! We can only accept short URLs with letters, numbers,
    hyphens, and/or underscores. Please correct stray characters.`
};

function hasReservedPathError(url) {
  let lcURL = url.toLowerCase();
  for (let i = 0; i < RESERVED_PATHS.length; i++) {
    if (lcURL === RESERVED_PATHS[i].toLowerCase()) return true;
  }
  return false;
}

function hasInvalidCharacters(url) {
  return !(/^[\w\d_-]*$/.test(url));
}

export default function Create() {
  const [isPublished, setIsPublished] = useState(false);
  const [url, setURL] = useState("");
  const [{ isLoggedIn, uid }, setContext] = useState({
    isLoggedIn: false,
    uid: "",
  });

  // TODO, streamline error messages w/ arrays?
  const [transcriptError, setTranscriptError] = useState(null);
  const [urlError, setURLError] = useState(null);

  const validateClientsideURL = (url) => {
    if (hasReservedPathError(url)) {
      setURLError(errors.unavailableURL);
      return false;
    }

    if (hasInvalidCharacters(url)) {
      setURLError(errors.invalidURL);
      return false;
    }

    setURLError(null);
    return true;
  }

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

      let tempURL = data.get("url").length > 0 ? data.get("url") : nolookalikes(6);

      if (validateClientsideURL(tempURL)) {
        setURL(tempURL);
        createTranscript(
          tempURL,
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
          /* success callback */
          () => {
            setIsPublished(true);
          },
          /* failure callback */
          () => {
            setURLError(errors.unavailableURL);
          }
        );
      }
    }
  };

  const handleErrors = () => {

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
            <Input label="Document title (required)" required id="name" />

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

            <div className="full-width-input">
              <span>
                <span className="b">Transcript</span> (required)
              </span>
              <TextEditor
                name="transcript"
                label="Transcript (required), Rich Text Editor"
                id="transcript"
              />
            </div>

            <Input label="Relevant hashtags" id="hashtags" type="textarea"
              description="Use a comma-separated list and capitalize the first letter
                of each word, e.g. #ThisIsAHashtag, #ThisIsAnother" />

            <div></div>

            <div className="full-width-input">
              <Input
                label="Make transcript searchable"
                description="Transcript can appear in a11ies.info browse views and search results"
                type="checkbox"
                id="searchable"
              />
            </div>

            <Input
              label="Custom short URL"
              prefix="a11ies.info/"
              description="If you don't provide one, we'll generate one for you!"
              id="url" 
              variant="short" 
              error={urlError}
            />

            <div></div>

            <input type="submit" value="Publish Transcript" name="submit" />
          </form>
        )}
      </SecondaryNavLayout>
      <style jsx>
        {`
          form {
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: var(--space-m);
            gap: var(--space-m);
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            form {
              width: 80%;
              grid-template-columns: 2fr 3fr;
              grid-gap: var(--space-l) var(--space-m);
              gap: var(--space-l) var(--space-m);
            }

            .full-width-input {
              grid-column: 1 / span 2;
            }
          } 
        `}
      </style>
    </FormAuth>
  );
}
