import { Button, Form, Message, Segment } from "semantic-ui-react";
import OrganizationSelect from "../../Organization/OrganizationSelect";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import * as React from "react";
import { GET_ALL_ORGANIZATION_JOBS } from "../../Organization/Jobs/OrganisationOverview";
import Link from "next/link";

const SuccessMessage = (
  <Segment>
    <Message attached>
      <Message.Header>Jobinserat wurde erfolgreich gespeichert</Message.Header>
      <p>
        Vor der definitiven Veröffendlichung müssen admins das inserat
        validieren. Wir bitten Sie um 1-2 Arbeitstage Geduld.
      </p>
    </Message>
  </Segment>
);

interface NewJobFormComponentProps {
  loading: boolean;
  onCreate: (
    formData: { title: string; description: string; organization: string }
  ) => void;
}

interface NewJobFormComponentState {
  showMessage: boolean;
  title: string;
  description: string;
  organization: "";
}

class NewJobFormComponent extends React.Component<
  NewJobFormComponentProps,
  NewJobFormComponentState
> {
  state = {
    title: "",
    description: "",
    organization: "",
    showMessage: false
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    this.props.onCreate(this.state);
    this.setState({ showMessage: true });
    e.preventDefault();
  };

  render() {
    return (
      <Segment.Group basic>
        {this.state.showMessage && SuccessMessage}
        <Segment clearing>
          <Form>
            <Form.Input
              name={"title"}
              label="Job Titel"
              placeholder="Job Titel"
              onChange={this.handleChange}
            />
            <Form.Field name={"organization"}>
              <label>Organisation</label>
              <OrganizationSelect handleChange={this.handleChange} />
            </Form.Field>
            <Form.TextArea
              name={"description"}
              label="Beschreibung"
              placeholder="Stelle dein Jobangebot kurz vor"
              onChange={this.handleChange}
            />
            {!this.state.showMessage && (
              <Button
                size={"big"}
                type={"Submit"}
                labelPosition={"right"}
                icon={"right arrow"}
                color={"green"}
                floated={"right"}
                content={"Veröffendlichen"}
                onClick={this.handleSubmit}
              />
            )}
            {this.state.showMessage && (
              <Link href={"/org/jobs"}>
                <Button
                  size={"big"}
                  as={"a"}
                  labelPosition={"right"}
                  icon={"right arrow"}
                  color={"green"}
                  floated={"right"}
                  content={"Zurück zur Übersicht"}
                />
              </Link>
            )}
          </Form>
        </Segment>
      </Segment.Group>
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

const NewJobForm: React.SFC<> = () => (
  <React.Fragment>
    <Mutation
      mutation={CREATE_NEW_JOB}
      refetchQueries={[{ query: GET_ALL_ORGANIZATION_JOBS }]}
      awaitRefetchQueries
    >
      {(createJob, { loading }) => (
        <NewJobFormComponent
          loading={loading}
          onCreate={async data => {
            await createJob({
              variables: {
                title: data.title,
                description: data.description,
                org: data.organization
              }
            });
          }}
        />
      )}
    </Mutation>
  </React.Fragment>
);

export default NewJobForm;
