import Link from "next/link";

import { BREAKPOINTS } from "../lib/constants";

import Layout from "../components/Layouts/Layout";
import Card from "../components/Card";

export default function Home() {
  return (
    <>
      <Layout
        title="a11ies.info"
        subtitle="Let's make resources more accessible."
        styles="
          display: grid;
          grid-gap: var(--space-m) var(--space-s);
          gap: var(--space-m) var(--space-s);
          justify-content: center;
          grid-template: auto / 1fr;

        "
        wideStyles="
          grid-template: auto 1fr / 1fr 1fr 1fr;
        "
      >
        <div className="top-card">
          <Card
            header="How it works"
            headerLevel={2}
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
        </div>
        <div className="card">
          <Card header="Transcribe" hasTopZazz>
            <p>
              Have a resource you want to transcribe, or want to volunteer to
              transcribe a requested resource? Contribute a transcript to A11ies.info!
            </p>
            <div className="link-wrapper">
              <Link href="/contribute">
                <a className="pill">Transcribe</a>
              </Link>
            </div>
          </Card>
        </div>
        <Card header="Request" hasTopZazz>
          <p>
            Have a resource you want transcribed? Fill out this form with a link
            to the resource and one of our volunteers will transcribe it for
            you.
          </p>
          <div className="link-wrapper">
            <Link href="/request">
              <a className="pill">Request</a>
            </Link>
          </div>
        </Card>
        <Card header="Learn" hasTopZazz>
          <p>
            There are a lot of ways to make your resources accessible. 
            Discover tools and best practices to help make your 
            movement accessible to all.
          </p>
          <div className="link-wrapper">
            <Link href="/resources">
              <a className="pill">Learn</a>
            </Link>
          </div>
        </Card>
      </Layout>
      <style jsx>
        {`
          .link-wrapper {
            margin-top: var(--space-m);
          }

          .top-card {
            grid-column: 1;
            justify-self: center;
          }

          @media ${BREAKPOINTS.MEDIUM_LARGE} {
            .top-card {
              grid-column: 1 / span 3;
              max-width: 70%;
            }
          }
        `}
      </style>
    </>
  );
}
