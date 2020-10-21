import Link from "next/link";

import HomeLayout from "../components/Layouts/HomeLayout";
import Card from "../components/Card";

export default function Home() {
  return (
    <>
      <HomeLayout>
        <div id="main-content">
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
              online to help people take action and make positive change in
              their communities. Unfortunately, many of these resources are in
              the form of images of text, which can present accessibility
              barriers for a bunch of folks, including those who are blind, have
              learning disabilities, or primarily speak a different language.
            </p>
            <p>
              <strong>a11ies.info</strong> exists to help you create and share
              transcripts of key resources, so everyone can access them. We host
              your transcripts at short, customizable URLs so you can easily
              share accessible, text-only versions of the resources you love.
            </p>
          </Card>
          <Card
            header="Transcribe"
            hasTopZazz
            style={`
            align-self: start;
            max-width: 90%;
          `}
          >
            <p>
              Have a resource you want to transcribe, or want to volunteer to
              transcribe a requested resource?
            </p>
            <Link href="/contribute">
              <a>Transcribe</a>
            </Link>
          </Card>
          <Card
            header="Request"
            hasTopZazz
            style={`
            align-self: center;
            max-width: 90%;
          `}
          >
            <p>
              Have a resource you want transcribed? Fill out this form with a
              link to the resource and one of our volunteers will transcribe it
              for you.
            </p>
            <Link href="/request">
              <a>Request</a>
            </Link>
          </Card>
          <Card
            header="Guidance"
            hasTopZazz
            style={`
            align-self: end;
            max-width: 90%;
          `}
          >
            <p>
              There are also a lot of ways to make your resources accessible by
              default. Check out our Resources section for tools, best
              practices, and other info to help you make your movement
              accessible to all.
            </p>
            <Link href="/contribute/resources">
              <a>Get Guidance</a>
            </Link>
          </Card>
        </div>
      </HomeLayout>
      <style jsx>
        {`
          #main-content {
            margin: var(--space-l) var(--space-m) var(--space-l) var(--space-m);
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: var(--space-l) var(--space-s);
            gap: var(--space-l) var(--space-s);
          }
        `}
      </style>
    </>
  );
}
