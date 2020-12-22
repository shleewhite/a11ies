export const RESERVED_PATHS = [
  "",
  "browse",
  "contact",
  "contact-us",
  "contribute",
  "policy",
  "privacy",
  "a11ies",
  "resources",
  "volunteer",
  "admin",
  "transcribe"
];


export const BREAKPOINTS = {
  MEDIUM_LARGE: '(min-width: 42em)',
  LARGE: '(min-width: 64em)',
  X_LARGE: '(min-width: 84em)'
};

export const HEADER_PATHS = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Browse",
    href: "/browse",
    subNav: [
      { name: "Featured", href: "/browse" },
      {
        name: "Transcripts",
        href: "/browse/transcripts",
      },
      {
        name: "Hashtags",
        href: "/browse/hashtags",
      },
    ],
  },
  {
    name: "Contribute",
    href: "/contribute",
    subNav: [
      {
        name: "Transcribe",
        href: "/contribute",
      },
      {
        name: "Volunteer",
        href: "/contribute/volunteer",
      },
      {
        name: "Resources",
        href: "/resources",
      },
    ],
  },
  {
    name: "Request",
    href: "/request",
  },
];

export const VOLUNTEER_APP_STATUS = {
  NEW: "new",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

export const REQUEST_STATUS = {
  NEW: "new",
  ASSIGNED: "assigned",
  COMPLETED: "completed",
};

/* URL regex by Diego Perini. See also:
   -  https://mathiasbynens.be/demo/url-regex
   -  https://gist.github.com/729294 */
// eslint-disable-next-line max-len
export const URL_REGEX = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
