import { Client } from "elasticsearch";

const jobMapping = {
  index: "jobs",
  type: "Job",
  body: {
    mappings: {
      Job: {
        properties: {
          title: { type: "text" },
          skills: { type: "keyword" },
          salary: { type: "double" },
          sequenceNumber: { type: "long" }
        }
      }
    }
  }
};

const mappings = [jobMapping];

const _createIndices = async (client: Client) => {
  await Promise.all(mappings.map(mapping => client.index(mapping)));
};

export default _createIndices;
