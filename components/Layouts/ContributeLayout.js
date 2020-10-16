// eslint-disable-next-line import/no-unresolved
import Layout from "./Layout";

import { HEADER_PATHS } from "../../lib/constants";

export default function ContributeLayout({ children }) {
  const contributePaths = HEADER_PATHS.find((obj) => obj.name === "Contribute");

  return (
    <Layout
      title="Contribute | A11ies.info"
      subNavItems={contributePaths.subNav}
    >
      {children}
    </Layout>
  );
}
