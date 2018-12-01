import { Job } from "@unijobs/backend-modules-models";
import { Client } from "elasticsearch";

export const _uploadJobs = async (client: Client, jobs: Job[]) => {
  client.bulk({
    body: jobs
      .map(job => [
        { index: { _index: "jobs", _type: "Job", _id: job.id } },
        {
          title: job.title,
          salary: job.salary,
          skills: job.skills.map(e => e.id),
          sequenceNumber: job.sequenceNumber
        }
      ])
      .reduce((e, acc) => [...acc, ...e], [])
  });
};

export default _uploadJobs;
