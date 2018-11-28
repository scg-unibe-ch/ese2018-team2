import gql from "graphql-tag";
import * as React from "react";
import { ApolloConsumer } from "react-apollo";
import {
  Container,
  Header,
  Search,
  Segment,
  Card,
  Message,
  Button
} from "semantic-ui-react";
import Link from "next/link";

interface SearchFieldProps {}
interface SearchFieldState {
  loading: boolean;
  results: {
    id: string;
    title: string;
    description: string;
    applied: boolean;
  }[];
}

const query = gql`
  query Search($search: String) {
    search(search: $search) {
      nodes {
        id
        title
        description
        applied
      }
      buckets {
        role {
          id
          title
        }
      }
    }
  }
`;

class SearchField extends React.Component<SearchFieldProps, SearchFieldState> {
  state = {
    loading: false,
    results: []
  };

  render() {
    const { loading, results } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <React.Fragment>
            <Search
              minCharacters={5}
              fluid
              noResultsMessage={"Keine Jobs gefunden"}
              loading={loading}
              open={false}
              onSearchChange={async (event, data) => {
                this.setState({ loading: true });
                const result = await client.query({
                  query: query,
                  variables: { search: data.value }
                });

                this.setState({
                  loading: false,
                  // @ts-ignore
                  results: result.data.search.nodes
                });
              }}
            />
            <Segment loading={loading}>
              {results.length === 0 && (
                <Message info>Suche nach einem Job</Message>
              )}
              <Card.Group>
                {results.map(job => (
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
            </Segment>
          </React.Fragment>
        )}
      </ApolloConsumer>
    );
  }
}

export default () => (
  <Container>
    <Segment basic>
      <Header as="h2">Suche nach einem Job</Header>
      <SearchField />
    </Segment>
  </Container>
);
