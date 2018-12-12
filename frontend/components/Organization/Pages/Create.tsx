import React from "react";
import { Container, Form, Header, Segment, Button } from "semantic-ui-react";
import EnsureLoggedIn from "../../../lib/EnsureLoggedIn";
import { withIntialMe } from "../../../lib/withMe";
import NavBar from "../../Frame/NavBar";
import OrganizationSelect from "../OrganizationSelect";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { all_available_programs } from "./__generated__/all_available_programs";
import { all_page_query } from "./Page";
import { toast } from "react-toastify";
import Router from "next/router";

const all_available_programs_query = gql`
  query all_available_programs {
    availableStudyPrograms {
      id
      title
    }
  }
`;

class AllAvailablePrograms extends Query<all_available_programs> {}

interface PageProps {}
interface PageState {
  org?: string;
  programs: string[];
}

const create_page_mutation = gql`
  mutation createPage(
    $organizationSlug: String!
    $studyProgramSlugs: [String!]!
  ) {
    createPage(
      organizationSlug: $organizationSlug
      studyProgramSlugs: $studyProgramSlugs
    )
  }
`;

class Page extends React.Component<PageProps, PageState> {
  state = {
    org: null,
    programs: []
  };

  handleChange = (e, x) => {
    this.setState({ ...this.state, org: x.value });
    console.log(this.state);
  };

  handleProgramChange = (e, x) => {
    this.setState({ ...this.state, programs: [...x.value] });
    console.log(this.state);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <EnsureLoggedIn>
            <Header>Neue Seite erstellen</Header>
            <Segment>
              <Mutation mutation={create_page_mutation}>
                {mutation => (
                  <Form onSubmit={async (e) => {
                      const {org, programs} = this.state;
                      await mutation({variables: { organizationSlug: org, studyProgramSlugs: programs }, awaitRefetchQueries: true, refetchQueries: [{
                          query: all_page_query
                      }]})

                      await Router.replace("/org/pages")
                    toast.success("Page erstellt.")

                  }}>
                    <Form.Field name={"organization"} width={6} required>
                      <label>Arbeitgeber</label>
                      <OrganizationSelect handleChange={this.handleChange} />
                    </Form.Field>

                    <Form.Field name={"programs"} width={6} required>
                      <label>Fächer</label>
                      <AllAvailablePrograms
                        query={all_available_programs_query}
                      >
                        {({ loading, data }) => (
                          <Form.Dropdown
                            onChange={this.handleProgramChange}
                            required
                            loading={loading}
                            placeholder="Fächer"
                            fluid
                            multiple
                            search
                            selection
                            options={
                              loading
                                ? []
                                : data.availableStudyPrograms.map(e => ({
                                    key: e.title,
                                    value: e.id,
                                    text: e.title
                                  }))
                            }
                          />
                        )}
                      </AllAvailablePrograms>
                    </Form.Field>
                    <Button color={"green"}>
                        Erstellen
                    </Button>
                  </Form>
                )}
              </Mutation>
            </Segment>
          </EnsureLoggedIn>
        </Container>
      </React.Fragment>
    );
  }
}
export default withIntialMe(Page);
