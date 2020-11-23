import Link from "next/link";

import Layout from "../components/Layouts/Layout";
import Card from "../components/Card";

export default function Home() {
  return (
    <>
      <Layout
        title="a11ies.info"
        subtitle="Let's make resources more accessible."
        styles={`
          main {
            display: grid;
            grid-template-rows: auto 1fr;
          }

          #main-content {
            display: grid;
            grid-gap: var(--space-m) var(--space-s);
            gap: var(--space-m) var(--space-s);
            justify-content: center;
            grid-template-columns: 350px 350px 350px;
            grid-template-rows: auto 1fr;
          }
        `}
      >
        {/* <div id="main-content"> */}
        <Card
          header="How it works"
          headerLevel={2}
          style={`
            grid-column: 1 / span 3;
            max-width: 80%;
            justify-self: center;
          `}
        >
          <p>
            There are a lot of awesome social justice resources circulating
            online to help people take action and make positive change in their
            communities. Unfortunately, many of these resources are in the form
            of images of text, which can present accessibility barriers for a
            bunch of folks, including those who are blind, have learning
            disabilities, or primarily speak a different language.
          </p>
          <p>
            <strong>a11ies.info</strong> exists to help you create and share
            transcripts of key resources, so everyone can access them. We host
            your transcripts at short, customizable URLs so you can easily share
            accessible, text-only versions of the resources you love.
          </p>
        </Card>
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        <Card header="Transcribe" hasTopZazz style={`align-self: start;`}>
          <p>
            Have a resource you want to transcribe, or want to volunteer to
            transcribe a requested resource?
          </p>
          <div className="link-wrapper">
            <Link href="/contribute">
              <a>Transcribe</a>
            </Link>
          </div>
        </Card>
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        <Card header="Request" hasTopZazz style={`align-self: center;`}>
          <p>
            Have a resource you want transcribed? Fill out this form with a link
            to the resource and one of our volunteers will transcribe it for
            you.
          </p>
          <div className="link-wrapper">
            <Link href="/request">
              <a>Request</a>
            </Link>
          </div>
        </Card>
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        <Card header="Guidance" hasTopZazz style={`align-self: end;`}>
          <p>
            There are also a lot of ways to make your resources accessible by
            default. Check out our Resources section for tools, best practices,
            and other info to help you make your movement accessible to all.
          </p>
          <div className="link-wrapper">
            <Link href="/contribute/resources">
              <a>Get Guidance</a>
            </Link>
          </div>
        </Card>
        {/* </div> */}
      </Layout>
      <style jsx>
        {`
          .link-wrapper {
            margin-top: var(--space-m);
          }

          a {
            color: inherit;
            background-color: white;
            border-radius: 9999px;
            padding: var(--space-xs) var(--space-s);
          }
        `}
      </style>
    </>
  );
}
