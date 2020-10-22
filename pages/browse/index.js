import SecondaryNavLayout from "../../components/Layouts/SecondaryNavLayout";
import Card from "../../components/Card";

export default function Home() {
  return (
    <>
      <SecondaryNavLayout title="Featured" subnav="Browse">
        <div id="main-content">
          <Card
            headerLevel={2}
            header="How to call your reps when you have social anxiety"
            style={`
            grid-column: 1 / span 2;
            width: auto;
            justify-self: center;
          `}
            imgLink="https://64.media.tumblr.com/5a15fb50c11f9ea5f73db2fcee3c87f8/1c3d528838d133f2-95/s640x960/5dc0be4e790d6cb742460720ed2d29ddaca8d096.jpg"
          >
            <p>
              This is a great explainer on what to say when you call your state
              and federal representatives.
            </p>
          </Card>
          <Card header="Recent hashtags" headerLevel={2} hasTopZazz>
            <ul>
              <li>#BLM</li>
            </ul>
          </Card>
          <Card header="Recent transcripts" headerLevel={2} hasTopZazz>
            <ul>
              <li>How to call your reps when you have social anxiety</li>
            </ul>
          </Card>
        </div>
      </SecondaryNavLayout>
      <style jsx>
        {`
          #main-content {
            grid-template-columns: 3fr 5fr;
          }
        `}
      </style>
    </>
  );
}
