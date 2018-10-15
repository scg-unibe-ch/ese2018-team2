import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import "semantic-ui-css/semantic.min.css";
import { Container, Header, Item, Segment } from "semantic-ui-react";
import JobItem from "../components/joblist/JobItem";
import NavBar from "../components/layout/header/NavBar";
import { AllJobs } from "./__generated__/AllJobs";

const query = gql`
  query AllJobs {
    jobs {
      id
      title
      description
      organization {
        id
        name
      }
    }
  }
`;

interface JobPageProps {
  loading: boolean;
  error: ApolloError;
  data: AllJobs;
}

export const JobPage: React.SFC<JobPageProps> = ({ loading, error, data }) => {
  // TODO: handle loading
  if (loading) {
    return <p>Loading</p>;
  }

  // TODO: handle error
  if (error) {
    return <p>error.message</p>;
  }

  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <Header as={"h1"}>Jobs</Header>
        <Segment attached>
          <Item.Group divided>
            {data.jobs.map(job => (
              <JobItem key={job.id} job={job} />
            ))}
          </Item.Group>
        </Segment>
      </Container>
    </React.Fragment>
  );
};

export default () => (
  <Query query={query}>
    {({ loading, error, data }) => (
      <JobPage data={data} error={error} loading={loading} />
    )}
  </Query>
);
