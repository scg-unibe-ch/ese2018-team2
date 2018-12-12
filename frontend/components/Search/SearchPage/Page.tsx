import gql from "graphql-tag";
import { withRouter, WithRouterProps } from "next/router";
import * as React from "react";
import { Query } from "react-apollo";
import "semantic-ui-css/semantic.min.css";
import { Card, Container, Segment } from "semantic-ui-react";
import { withIntialMe } from "../../../lib/withMe";
import NavBar from "../../Frame/NavBar";
import Content from "./Content";
import JobCard from "../../Job/JobCard";

const query = gql`
  query JobSearch($search: String) {
    search(search: $search) {
      nodes {
        id
        title
        description
        organization {
          id
          name
        }
        salary
      }
    }
  }
`;

const SearchSegmentComponent: React.SFC<WithRouterProps> = ({ router }) => (
  <Query
    query={query}
    variables={{ search: router.query && router.query.search }}
  >
    {({ loading, data }) => (
      <Segment loading={loading} vertical style={{ paddingTop: "0" }}>
        <Container>
          <Card.Group stackable itemsPerRow={4}>
            {!data.loading &&
              data.search &&
              data.search.nodes &&
              (data.search.nodes as {
                id: string;
                title: string;
                description: string;
                organization: {
                  name: string;
                };
                salary: number;
              }[]).map(job => (
                <JobCard key={job.id} href={"/job?id=" + job.id} job={job} />
              ))}
          </Card.Group>
        </Container>
      </Segment>
    )}
  </Query>
);

const SearchSegment = withRouter(SearchSegmentComponent);

const panels = [
  {
    key: "salary",
    title: "Salär",
    content: {
      content: <p>Salär</p>
    }
  }
];

export default withIntialMe(() => (
  <React.Fragment>
    <NavBar />
    <Content />
  </React.Fragment>
));
