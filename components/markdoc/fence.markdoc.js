import { nodes } from '@markdoc/markdoc';
import { Code } from '../../components/Code';

export default {
    render: Code,
    attributes: {
      content: { type: String },
      language: {
        type: String,
        description:
          'The programming language of the code block. Place it after the backticks.'
      }
    }
  };

// export default {
//   ...nodes.fence,
//   render: Code,
//   transform(node, config) {
//     const attributes = node.transformAttributes(config);
//     const children = node.children.length
//       ? node.transformChildren(config)
//       : [node.attributes.content];

//     return <Code />;
//   }
// };