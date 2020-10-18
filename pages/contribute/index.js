import ContributeLayout from "../../components/Layouts/ContributeLayout";
import Input from "../../components/Input";
import TextEditor from "../../components/TextEditor";

export default function Create() {
  return (
    <ContributeLayout title="Contribute">
      <p>random descriptive text</p>

      <Input label="Document Name (required)" required />

      <Input label="Link to original document (required)" required type="url" />

      <Input label="Original creator's name" />

      <Input label="Link to original creator" type="url" />

      <span className="f6 db mb2">
        <span className="b">Transcript</span> (required)
      </span>
      <TextEditor name="transcript" label="Transcript, Rich Text Editor" />

      <Input label="Relevant hashtags" />

      <Input
        label="Transcript can appear in a11ies.info search results"
        type="checkbox"
      />

      <Input label="Custom URL for transcript" />

      <button>Submit Application</button>
    </ContributeLayout>
  );
}
