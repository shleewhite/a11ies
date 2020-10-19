// eslint-disable-next-line import/no-unresolved
import Layout from "./Layout";

import { HEADER_PATHS } from "../../lib/constants";

export default function ContributeLayout({ title, children }) {
  const contributePaths = HEADER_PATHS.find((obj) => obj.name === "Contribute");

  return (
    <Layout title={title} subNavItems={contributePaths.subNav}>
      {children}
    </Layout>
  );
}
