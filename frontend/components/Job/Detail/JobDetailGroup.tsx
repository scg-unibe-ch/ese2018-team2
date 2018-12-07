import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Container, Dimmer, Header, Loader, Segment } from "semantic-ui-react";
import JobForm from "./JobForm";
import * as React from "react";
import {
  GetJobWithDetails,
  GetJobWithDetailsVariables
} from "./__generated__/GetJobWithDetails";

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
        {!loading && data.job.title}
      </Header>
      <Segment attached>{!loading && <JobForm data={data.job} />}</Segment>
    </Dimmer.Dimmable>
  </Container>
);

export const GET_JOB_WITH_DETAILS = gql`
  query GetJobWithDetails($id: String!) {
    job(id: $id) {
      id
      title
      description
    }
  }
`;

class GetJobWithDetailsQuery extends Query<
  GetJobWithDetails,
  GetJobWithDetailsVariables
> {}

interface GetJobsWithDetails {
  job: {
    id: string;
    title: string;
    description: string;
  };
}

interface JobDetailGroupProps {
  job: string;
}

const JobDetailGroup: React.SFC<JobDetailGroupProps> = ({ job }) => {
  return (
    <GetJobWithDetailsQuery
      query={GET_JOB_WITH_DETAILS}
      variables={{ id: job }}
      ssr
    >
      {({ loading, error, data }) => (
        <JobDetailGroupComponent
          loading={loading}
          error={error}
          data={data as GetJobsWithDetails}
        />
      )}
    </GetJobWithDetailsQuery>
  );
};

export default JobDetailGroup;
