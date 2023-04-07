import { Tag, nodes } from "@markdoc/markdoc";
import { Document } from "../../components/Document";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...nodes.document,
  render: Document,
  transform(node, config) {
    return new Tag(
      this.render,
      { source: config.source },
      node.transformChildren(config)
    );
  },
};
