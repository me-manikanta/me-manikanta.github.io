import { link } from "@markdoc/next.js/tags";

import { AppLink } from "../../components/AppLink";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...link,
  render: AppLink,
};
