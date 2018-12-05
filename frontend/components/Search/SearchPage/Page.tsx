import gql from "graphql-tag";
import { withRouter, WithRouterProps } from "next/router";
import * as React from "react";
import { Query } from "react-apollo";
import "semantic-ui-css/semantic.min.css";
import { Card, Container, Segment } from "semantic-ui-react";
import { withIntialMe } from "../../../lib/withMe";
import NavBar from "../../Frame/NavBar";
import SearchField from "../SearchField";
import Link from "next/link";

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
      <Segment loading={loading} vertical>
        <Container>
          <Card.Group stackable itemsPerRow={4}>
            {!data.loading &&
              data.search &&
              data.search.nodes &&
              (data.search.nodes as {
                id: string;
                title: string;
                description: string;
              }[]).map(job => (
                <Link
                  key={job.id}
                  href={{ pathname: "/job", query: { id: job.id } }}
                  passHref
                >
                  <Card link>
                    <Card.Content>
                      <Card.Header>{job.title}</Card.Header>
                      <Card.Description>{job.description}</Card.Description>
                    </Card.Content>
                  </Card>
                </Link>
              ))}
          </Card.Group>
        </Container>
      </Segment>
    )}
  </Query>
);

const SearchSegment = withRouter(SearchSegmentComponent);

export default withIntialMe(() => (
  <React.Fragment>
    <NavBar />
    <Segment vertical>
      <Container>
        <SearchField />
      </Container>
    </Segment>
    <SearchSegment />
  </React.Fragment>
));
