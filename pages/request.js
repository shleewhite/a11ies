import Layout from "../components/Layouts/Layout";
import Input from "../components/Input";

export default function Request() {
  return (
    <Layout title="Contribute | A11ies.info">
      <h1>Request</h1>
      <p>Wouldn't it be cool if someone transcribed that thing for you?</p>

      <Input label="Link to original document" required />

      <button>Submit Request</button>
    </Layout>
  );
}
