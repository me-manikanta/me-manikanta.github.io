import * as nodes from "./components/markdoc/nodes";
import CodeBlock from "./components/CodeBlock";
import { ResumeJob } from "./components/ResumeJob";
import { Center } from "./components/Center";

const config = {
  nodes: {
    ...nodes,
  },
  tags: {
    job: {
      render: "ResumeJob",
      attributes: {
        role: { type: String },
        company: { type: String },
        timeline: { type: String },
        team: { type: String },
        location: { type: String },
      },
    },
    center: {
      render: "Center",
    },
  },
};

export const components = {
  CodeBlock,
  ResumeJob,
  Center,
};

export default config;
