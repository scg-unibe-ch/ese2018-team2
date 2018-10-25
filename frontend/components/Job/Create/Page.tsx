import * as React from "react";
import { Button, Container, Form, Header, Segment } from "semantic-ui-react";
import NavBar from "../../layout/header/NavBar";
import OrganizationSelect from "../../Organization/OrganizationSelect";
import gql from "graphql-tag";
import { withRouter, SingletonRouter } from "next/router";
import { Mutation } from "react-apollo";
import { GET_ALL_JOBS } from "../../../pages/jobs";

/*const CREATE_JOB = gql`
  mutation CreateJob($id: ID!, $title:String!, $description:) {}
`*/

interface NewJobFormProps {
  onCreate: (
    formData: { title: string; description: string; organization: string }
  ) => void;
  loading: boolean;
}

class NewJobForm extends React.Component<NewJobFormProps> {
  state = {
    title: "",
    description: "",
    organization: ""
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    this.props.onCreate(this.state);
    e.preventDefault();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit} loading={this.props.loading}>
        <Form.Field>
          <label>Title</label>
          <Form.Input
            name={"title"}
            type="text"
            required
            placeholder={"Title"}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <Form.Input
            onChange={this.handleChange}
            name={"description"}
            type="text"
            required
            placeholder={"Description"}
          />
        </Form.Field>
        <Form.Field>
          <label>Organization</label>
          <OrganizationSelect handleChange={this.handleChange} />
        </Form.Field>
        <Button color={"green"} type={"submit"}>
          Create
        </Button>
      </Form>
    );
  }
}

const CREATE_NEW_JOB = gql`
  mutation CREATE_JOB($title: String!, $description: String, $org: ID!) {
    createJob(
      input: { title: $title, description: $description, organization: $org }
    ) {
      id
      title
      description
    }
  }
`;

interface PageProps {
  router?: SingletonRouter;
}

const Page: React.SFC<PageProps> = ({ router }) => (
  <React.Fragment>
    <NavBar />
    <Container>
      <Segment>
        <Header dividing>Create new job</Header>
        <Mutation
          mutation={CREATE_NEW_JOB}
          refetchQueries={[{ query: GET_ALL_JOBS }]}
          awaitRefetchQueries
        >
          {(createJob, { loading }) => (
            <NewJobForm
              loading={loading}
              onCreate={async data => {
                await createJob({
                  variables: {
                    title: data.title,
                    description: data.description,
                    org: data.organization
                  }
                });
                await router.replace("/jobs");
              }}
            />
          )}
        </Mutation>
      </Segment>
    </Container>
  </React.Fragment>
);

export default withRouter(Page);
