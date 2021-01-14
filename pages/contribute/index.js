import React, { useState, useEffect } from "react";
import { nolookalikes } from "nanoid-generate"; // generates unique id without characters that look similar ie. 1 and I
import * as copy from "copy-to-clipboard"; // copy-to-clipboard
import Link from "next/link";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import IconButton from "../../components/IconButton";
import Input from "../../components/Input";
import TextEditor from "../../components/TextEditor";
import FormAuth from "../../components/FormAuth";
import FormSuccess from "../../components/FormSuccess";

import {
  BREAKPOINTS,
  ERROR_MESSAGES,
  RESERVED_PATHS,
  URL_REGEX,
} from "../../lib/constants";
import { createTranscript } from "../../lib/transcripts";

function hasReservedPathError(url) {
  const lcURL = url.toLowerCase();
  for (let i = 0; i < RESERVED_PATHS.length; i++) {
    if (lcURL === RESERVED_PATHS[i].toLowerCase()) return true;
  }
  return false;
}

function hasInvalidCharacters(url) {
  return !/^[\w\d_-]*$/.test(url);
}

function hasBadLinkFormat(url) {
  return !URL_REGEX.test(url);
}

export default function Create() {
  const [isPublished, setIsPublished] = useState(false);
  const [url, setURL] = useState("");
  const [{ isLoggedIn, uid }, setContext] = useState({
    isLoggedIn: false,
    uid: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    link: null,
    creatorName: null,
    creatorLink: null,
    transcript: null,
    hashtags: null,
    searchable: null,
    url: null,
  });
  const [focusId, setFocusId] = useState(null);

  const validateData = (data) => {
    let firstError = null;
    const errorMap = {
      name: null,
      link: null,
      creatorName: null,
      creatorLink: null,
      transcript: null,
      hashtags: null,
      searchable: null,
      url: null,
    };

    // Check custom short URL for reserved path or special characters
    const rawUrl = data.get("url");
    if (rawUrl.length > 0) {
      if (hasReservedPathError(rawUrl)) {
        errorMap.url = ERROR_MESSAGES.unavailableURL;
        firstError = "url";
      } else if (hasInvalidCharacters(rawUrl)) {
        errorMap.url = ERROR_MESSAGES.invalidURL;
        firstError = "url";
      }
    }

    // Hashtags -- TODO?

    // Transcript -- TODO
    const transcript = data.get("transcript");
    if (transcript.length === 0) {
      errorMap.transcript =
        "Whoops! This transcript isn't terribly useful without any text. Please add some!";
      firstError = "transcript";
    }

    // Creator link
    const creatorLink = data.get("creatorLink");
    if (creatorLink.length > 0 && hasBadLinkFormat(creatorLink)) {
      errorMap.creatorLink = ERROR_MESSAGES.badLinkFormat;
      firstError = "creatorLink";
    }

    // Creator name -- no checks

    // Document link
    const link = data.get("link");
    if (link.length === 0) {
      errorMap.link = ERROR_MESSAGES.required;
      firstError = "link";
    } else if (hasBadLinkFormat(link)) {
      errorMap.link = ERROR_MESSAGES.badLinkFormat;
      firstError = "link";
    }

    // Document title
    if (data.get("name").length === 0) {
      errorMap.name = ERROR_MESSAGES.required;
      firstError = "name";
    }

    setErrors(errorMap);
    setFocusId(firstError);
    return !firstError;
  };

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

      if (validateData(data)) {
        const newURL =
          data.get("url").length > 0 ? data.get("url") : nolookalikes(6);
        setURL(newURL);
        createTranscript(
          newURL,
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
            setErrors({ ...errors, url: ERROR_MESSAGES.unavailableURL });
            setFocusId("url");
          }
        );
      }
    }
  };

  const fetchPost = (rawUrl) => {
    let iframeUrl = undefined;
    if (rawUrl.includes("https://twitter")) {
      iframeUrl = `https://publish.twitter.com/oembed?
      url=${rawUrl}`;
    }
  };

  /* Dynamically focus an element when requested */
  useEffect(() => {
    if (focusId) {
      const el = document.getElementById(focusId);
      if (el) {
        el.focus();
        // clear
        setFocusId(null);
      }
    }
  }, [focusId]);

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
              Your transcript is now published at{" "}
              <Link href={`/${url}`}>
                <a className="b">{`a11ies.info/${url}`}</a>
              </Link>{" "}
              <IconButton
                label="Copy link"
                onClick={() => {
                  copy(`a11ies.info/${url}`);
                }}
              >
                📋
              </IconButton>
            </p>

            <button onClick={resetForm}>Write another transcript</button>
          </FormSuccess>
        ) : (
          <div id="form-wrapper">
            <form
              action=""
              className=""
              onSubmit={submitTranscript}
              id="create"
              noValidate
            >
              <Input
                label="Document title"
                required
                id="name"
                error={errors.name}
              />

              <Input
                label="Link to original document"
                required
                type="url"
                id="link"
                error={errors.link}
              />

              <Input label="Original creator's name" id="creatorName" />

              <Input
                label="Link to original creator"
                type="url"
                id="creatorLink"
                error={errors.creatorLink}
              />

              <div className="full-width-input">
                <TextEditor
                  name="transcript"
                  label="Transcript"
                  id="transcript"
                  required
                  error={errors.transcript}
                />
              </div>

              <Input
                label="Relevant hashtags"
                id="hashtags"
                type="textarea"
                description="Use a comma-separated list and capitalize the first letter
                of each word, e.g. #ThisIsAHashtag, #ThisIsAnother"
              />

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
                error={errors.url}
              />

              <input type="submit" value="Publish Transcript" name="submit" />
            </form>
            <div>tweet goes here</div>
          </div>
        )}
      </SecondaryNavLayout>
      <style jsx>
        {`
          #form-wrapper {
            display: grid;
            grid-template-columns: 5fr 1fr;
          }
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
