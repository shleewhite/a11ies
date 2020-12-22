import React, { useState, useEffect } from "react";
import { nolookalikes } from "nanoid-generate"; // generates unique id without characters that look similar ie. 1 and I
import Link from "next/link";

import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Input from "../../components/Input";
import TextEditor from "../../components/TextEditor";
import FormAuth from "../../components/FormAuth";
import FormSuccess from "../../components/FormSuccess";

import { RESERVED_PATHS, BREAKPOINTS, URL_REGEX } from "../../lib/constants";
import { createTranscript } from "../../lib/transcripts";
// TODO: Url validation: import { URL_REGEX } from '../constants';

const errorMessages = {
  required: `Whoops! This field is required.`,
  badLinkFormat: `Please make sure this URL is properly formatted.`,
  unavailableURL: `Alas, this short URL isn't available. Please choose 
    another one or leave blank to have one auto-generated.`,
  invalidURL: `Alas, we can only accept custom short URLs with letters, numbers,
    hyphens, and/or underscores. Please remove special characters.`
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

function hasBadLinkFormat(url) {
  return !(URL_REGEX.test(url));
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
    url: null
  });
  const [focusId, setFocusId] = useState(null);

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
        let newURL = data.get("url").length > 0 ? data.get("url") : nolookalikes(6);
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
            setErrors({...errors, url: errorMessages.unavailableURL});
            setFocusId('url');
          }
        );
      }
    }
  };

  const validateData = (data) => {
    let firstError = null;
    let errorMap = {
      name: null,
      link: null,
      creatorName: null,
      creatorLink: null,
      transcript: null,
      hashtags: null,
      searchable: null,
      url: null
    };

    // Check custom short URL for reserved path or special characters
    let url = data.get("url");
    if (url.length > 0) {
      if (hasReservedPathError(url)) {
        errorMap["url"] = errorMessages.unavailableURL;
        firstError = "url";
      } else if (hasInvalidCharacters(url)) {
        errorMap["url"] = errorMessages.invalidURL;
        firstError = "url";
      }
    }

    // Hashtags
    // No checks

    // Transcript
    // TODO

    // Creator link
    let creatorLink = data.get("creatorLink");
    if (creatorLink.length > 0 && hasBadLinkFormat(creatorLink)) {
      errorMap["creatorLink"] = errorMessages.badLinkFormat;
      firstError = "creatorLink";
    }

    // Creator name
    // No checks

    // Document link
    let link = data.get("link");
    if (link.length == 0) {
      errorMap["link"] = errorMessages.required;
      firstError = "link";
    } else if (hasBadLinkFormat(link)) {
      errorMap["link"] = errorMessages.badLinkFormat;
      firstError = "link";
    }

    // Document title
    if (data.get("name").length == 0) {
      errorMap["name"] = errorMessages.required;
      firstError = "name";
    }

    setErrors(errorMap);
    setFocusId(firstError);
    return !firstError;
  }

  /* Dynamically focus an element when requested */
  useEffect(() => {
    if (focusId) {
      let el = document.getElementById(focusId);
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
              Your transcript is now published at:{" "}
              <Link href={`/${url}`}>
                <a>{`a11ies.info/${url}`}</a>
              </Link>
            </p>
            <button onClick={resetForm}>Write another transcript</button>
          </FormSuccess>
        ) : (
          <form action="" className="" onSubmit={submitTranscript} id="create" noValidate >
            <Input label="Document title (required)" required id="name" error={errors.name} />

            <Input
              label="Link to original document (required)"
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
                label="Transcript (required)"
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
              error={errors.url}
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
