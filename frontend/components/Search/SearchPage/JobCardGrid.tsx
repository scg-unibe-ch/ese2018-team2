import { ApolloError } from "apollo-boost";
import Link from "next/link";
import React from "react";
import {
  Card,
  Container,
  Header,
  Placeholder,
  Segment,
  Icon
} from "semantic-ui-react";
import JobCard from "../../Job/JobCard";

interface JobCardGridProps {
  loading: boolean;
  data?: {
    id: string;
    title: string;
    description: string;
    organization: {
      name: string;
    };
    salary: number;
  }[];
  error?: ApolloError;
}

const placeholders = new Array(12).fill(0).map((_, i) => (
  <Card key={i}>
    <Card.Content>
      <Placeholder>
        <Placeholder.Header>
          <Placeholder.Line length="very short" />
          <Placeholder.Line length="medium" />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Card.Content>
  </Card>
));

const JobCardGrid: React.FC<JobCardGridProps> = ({ loading, data }) => (
  <Segment>
    <Card.Group>
      {loading && placeholders}
      {!loading &&
        data &&
        data.length > 0 &&
        data.map(job => (
          <JobCard key={job.id} href={"/job?id=" + job.id} job={job} />
        ))}
      {!loading && data && data.length === 0 && (
        <Container style={{ padding: "10px" }}>
          <Header as={"h2"}>Keine Ergebnisse</Header>
          <Header as={"h3"}>
            Erhalte mehr Ergebnisse, in dem du die Filter anpasst.
          </Header>
        </Container>
      )}
    </Card.Group>
  </Segment>
);

export default JobCardGrid;
