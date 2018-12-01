import { Client } from "elasticsearch";
import { Connection } from "typeorm";
import config from "@unijobs/backend-modules-config";
import { Job } from "@unijobs/backend-modules-models";
import _createIndices from "./lib/_createIndices";
import _uploadJobs from "./lib/_uploadJobs";

export const elasticClient = new Client({
  host: config.get("elasticsearch_url"),
  log: "trace" // TODO make configurable via environment variable
});

export const createIndices = () => _createIndices(elasticClient);

export const uploadJobs = (jobs: Job[]) => _uploadJobs(elasticClient, jobs);
