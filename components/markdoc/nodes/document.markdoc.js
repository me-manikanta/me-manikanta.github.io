import { Tag, nodes } from '@markdoc/markdoc';
import { Document } from '../../components/Document';

export default {
  ...nodes.document,
  render: Document,
  transform(node, config) {
    return new Tag(
      this.render,
      { source: config.source },
      node.transformChildren(config)
    );
  }
};