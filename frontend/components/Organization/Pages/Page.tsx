import React from "react";
import { withIntialMe } from "../../../lib/withMe";
import NavBar from "../../Frame/NavBar";
import {
  Container,
  Header,
  Segment,
  Table,
  Input,
  Label,
  Button
} from "semantic-ui-react";
import gql from "graphql-tag";
import { ALL_PAGES_QUERY } from "./__generated__/ALL_PAGES_QUERY";
import { Query } from "react-apollo";
import Link from "next/link";
import EnsureLoggedIn from "../../../lib/EnsureLoggedIn";

export const all_page_query = gql`
  query ALL_PAGES_QUERY {
    organizations {
      id
      name
      pages {
        id
        studyPrograms {
          id
          title
        }
      }
    }
  }
`;

class AllPagesQuery extends Query<ALL_PAGES_QUERY> {}

const Page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <EnsureLoggedIn>
        <Header>Pages</Header>
        <AllPagesQuery query={all_page_query}>
          {({ loading, data, error }) => (
            <Segment loading={loading}>
              <Link href={"/org/pages/create"} passHref>
                <Button as={"a"} color={"green"}>
                  Neue Page erstellen
                </Button>
              </Link>
              {!loading && !error && data.organizations && (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>ID</Table.HeaderCell>
                      <Table.HeaderCell>Fächer</Table.HeaderCell>
                      <Table.HeaderCell>Einbetten</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {data.organizations
                      .map(org => org.pages)
                      .reduce((acc, e) => [...acc, ...e], [])
                      .map(e => (
                        <Table.Row key={e.id}>
                          <Table.Cell>{e.id}</Table.Cell>
                          <Table.Cell>
                            {e.studyPrograms.map(s => (
                              <Label key={s.id}>{s.title}</Label>
                            ))}
                          </Table.Cell>
                          <Table.Cell>
                            <Input value={`<iframe src="xcxasdasdsadasdasdasd${e.id}"></iframe>`} />
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
              )}
            </Segment>
          )}
        </AllPagesQuery>
      </EnsureLoggedIn>
    </Container>
  </React.Fragment>
);

export default withIntialMe(Page);
