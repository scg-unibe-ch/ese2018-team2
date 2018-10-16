import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Container, List } from "semantic-ui-react";
import NavBar from "../components/layout/header/NavBar";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const query = gql`
  query GetJobs {
    jobs {
      id
      title
      organization {
        id
        name
      }
    }
  }
`;

interface GetJobs {
  jobs: {
    id: string;
    title: string;
    organization: { id: string; name: string };
  }[];
}

export default () => (
  <div>
    <NavBar />
    <Container text>
      <h1>Jobs</h1>

      <Query query={query}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading</div>;
          }

          if (error) {
            return <div>error.message</div>;
          }

          const GetJobs = data as GetJobs;

          return (
            <List>
              {GetJobs.jobs.map(job => (
                <List.Item key={job.id}>{`${job.title} from ${
                  job.organization.name
                }`}</List.Item>
              ))}
            </List>
          );
        }}
      </Query>
      <Button>Klicken</Button>
    </Container>
  </div>
);
