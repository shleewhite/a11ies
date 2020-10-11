import Layout from "../components/Layout";
import Input from "../components/Input";

export default function Contribute() {
  return (
    <Layout title="Contribute | A11ies.info">
      <h1>Contribute</h1>
      <p>
        This is a description of how awesome it is to help out with a11ies.info.
        Wow like it is truly the best decision I have ever made in my life.
      </p>

      <Input label="Why do you want to help transcribe?" required />

      <button>Submit Application</button>
    </Layout>
  );
}
