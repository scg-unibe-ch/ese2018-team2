import config from "@unijobs/backend-modules-config";
import { Job } from "@unijobs/backend-modules-models";
import { Client } from "elasticsearch";
import _createIndices from "./lib/_createIndices";
import {
  SearchBucket,
  SearchInput,
  SearchNode,
  SearchResult,
  _search
} from "./lib/_search";
import _uploadJobs from "./lib/_uploadJobs";

export const elasticClient = new Client({
  host: config.get("elasticsearch_url"),
  log: "trace" // TODO make configurable via environment variable
});

export const createIndices = () => _createIndices(elasticClient);

export const uploadJobs = (jobs: Job[]) => _uploadJobs(elasticClient, jobs);

export { SearchInput, SearchNode, SearchResult, SearchBucket };

export const search = async (input: SearchInput): Promise<SearchResult> =>
  _search(elasticClient, input);
