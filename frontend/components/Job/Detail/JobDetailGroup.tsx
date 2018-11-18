import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Container, Dimmer, Header, Loader, Segment } from "semantic-ui-react";
import JobForm from "./JobForm";
import * as React from "react";

interface JobDetailGroupComponentProps {
  loading: boolean;
  error: ApolloError;
  data: GetJobsWithDetails;
}

export const JobDetailGroupComponent: React.SFC<
  JobDetailGroupComponentProps
> = ({ loading, error, data }) => (
  <Container text>
    {error && <p>{error.message}</p>}
    <Dimmer.Dimmable dimmed={loading}>
      <Dimmer active={loading}>
        <Loader active={loading} />
      </Dimmer>
      <Header block attached="top">
        {!loading && data.jobs[0].title}
      </Header>
      <Segment attached>{!loading && <JobForm data={data.jobs[0]} />}</Segment>
    </Dimmer.Dimmable>
  </Container>
);

export const GET_JOB_WITH_DETAILS = gql`
  query GetJobWithDetails($id: String!) {
    jobs(id: $id) {
      id
      title
      description
    }
  }
`;

interface GetJobsWithDetails {
  jobs: {
    id: string;
    title: string;
    description: string;
  }[];
}

interface JobDetailGroupProps {
  job: string;
}

const JobDetailGroup: React.SFC<JobDetailGroupProps> = ({ job }) => {
  return (
    <Query query={GET_JOB_WITH_DETAILS} variables={{ id: job }} ssr>
      {({ loading, error, data }) => (
        <JobDetailGroupComponent
          loading={loading}
          error={error}
          data={data as GetJobsWithDetails}
        />
      )}
    </Query>
  );
};

export default JobDetailGroup;
