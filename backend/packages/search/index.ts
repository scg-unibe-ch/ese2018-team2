import { Client } from "elasticsearch";
import { Connection } from "typeorm";
import config from "@unijobs/backend-modules-config";
import { Job } from "@unijobs/backend-modules-models";
import _createIndices from "./lib/_createIndices";

export const elasticClient = new Client({
  host: config.get("elasticsearch_url"),
  log: "trace" // TODO make configurable via environment variable
});

export const createIndices = () => _createIndices(elasticClient);

export const uploadJobs = async (connection: Connection, jobs: Array<Job>) => {
  const indexExists = await elasticClient.indices.exists({
    index: "jobs"
  });

  if (indexExists) {
    await elasticClient.indices.delete({
      index: "jobs"
    });
  }

  await elasticClient.indices.create({
    index: "jobs",
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
  });

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];

    await elasticClient.create({
      index: "jobs",
      id: job.id,
      type: "Job",
      body: {
        title: job.title,
        salary: job.salary,
        skills: job.skills.map(e => e.id),
        sequenceNumber: job.sequenceNumber
      }
    });
  }
};
