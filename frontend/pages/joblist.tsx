import React from "react";
import JobList from "../components/joblist/JobList";
import JobItem from "../components/joblist/JobItem";
import { Container, Header } from "semantic-ui-react";

interface Job {
  id: string;
  title: string;
  description: string;
  skills: string[];
  salary: number;
  schedule: string[];
  period: string;
  employer: string;
}

const joblist: Array<Job> = [
  {
    id: "c41426d7-219e-4353-b38f-a7d6b2e5dac5",
    title: "Frontend Developer",
    description: "Part time Junior frontend developer",
    skills: ["HTML", "CSS", "JavaScript or TypeScript", "NextJS"],
    salary: 24.5,
    schedule: ["Monday morning", "Tuesday morning"],
    period: "undefined",
    employer: "BWL GmbH"
  },
  {
    id: "0e12a329-66fd-4669-9420-c04520e372a4",
    title: "Backend Developer",
    description: "Part time Junior backend developer",
    skills: ["JavaScript or TypeScript", "GraphQL"],
    salary: 25.5,
    schedule: ["Thursday morning", "Friday morning"],
    period: "undefined",
    employer: "BWL GmbH"
  }
];

export default () => (
  <Container>
    <Header as={"h1"}>Job List</Header>
    <JobList>
      {joblist.map(job => (
        <JobItem job={job} key={job.id} />
      ))}
    </JobList>
  </Container>
);
