import { Button, Form, Grid, Header, Loader, Segment } from "semantic-ui-react";
import OrganizationSelect from "../../../Organization/OrganizationSelect";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import * as React from "react";
import { GET_ALL_ORGANIZATION_JOBS } from "../../../Organization/Jobs/OrganisationOverview";
import Link from "next/link";
import ScheduleTabs from "./ScheduleTabs";
import { toast } from "react-toastify";
import { ApolloError } from "apollo-client";
import { useState } from "react";

interface JobInterface {
  title: string;
  description: string;
  organization: string;
  salary: number;
  perHour: boolean;
  start: Date;
  end: Date;
  workload: number;
}

interface NewJobFormComponentProps {
  loading: boolean;
  error: ApolloError;
  passOrgId: (orgId: string) => void;
  onCreate: (formData: JobInterface) => void;
}

interface NewJobFormComponentState extends JobInterface {
  disableButton: boolean;
  scheduleTabs: any;
}

const uniOptions = [
  { key: "uniBern", value: "UniBern", text: "Universität Bern" }
];
const studyProgOptions = [
  { key: "informatik", value: "informaitk", text: "Informatik" }
];

class NewJobFormComponent extends React.Component<
  NewJobFormComponentProps,
  NewJobFormComponentState
> {
  state = {
    title: "",
    description: "",
    organization: "",
    salary: 0,
    perHour: false,
    start: new Date(),
    end: null,
    workload: 0,
    disableButton: false,
    scheduleTabs: <Loader />
  };

  /**
   * Because the parent component is rendered on the server side, and Schedule Tabs
   * needs the window component, it has to be rendered in a second step
   */
  componentDidMount(): void {
    this.setState({
      scheduleTabs: <ScheduleTabs handleChange={this.handleChange} />
    });
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault();
    if (name === "organization") {
      this.props.passOrgId(value);
    }
    this.setState({ [name]: value });
    console.log(name + " : " + value);
  };

  handleSubmit = e => {
    //pass all state attributes except disableButton and scheuleTabs
    let { disableButton, scheduleTabs, ...onCreateArgs } = this.state;
    this.props.onCreate(onCreateArgs);
    this.setState({ disableButton: true });
    this.triggerToast();
    e.preventDefault();
  };

  triggerToast() {
    this.props.error &&
      !this.props.loading &&
      toast.error("Ein Fehler ist aufgetreten");
    !this.props.error &&
      !this.props.loading &&
      toast.success("Jobinserat wurde zur Validierung versandt. ");
  }

  render() {
    return (
      <Segment.Group>
        <Segment clearing>
          <Form onSubmit={this.handleSubmit}>
            <Segment>
              <Header>Grundinformationen</Header>
              <Form.Input
                required
                name={"title"}
                label="Job Titel"
                placeholder="Job Titel"
                onChange={this.handleChange}
                width={6}
              />
              <Form.Field name={"organization"} width={6} required>
                <label>Arbeitgeber</label>
                <OrganizationSelect handleChange={this.handleChange} />
              </Form.Field>
              <Form.TextArea
                required
                name={"description"}
                label="Beschreibung"
                placeholder="Stelle dein Jobangebot kurz vor"
                onChange={this.handleChange}
              />
            </Segment>
            <Segment>
              <Header>Lohn</Header>
              <Grid columns={2}>
                <Grid.Column>
                  <Form.Group inline>
                    <Form.Input
                      name={"salary"}
                      placeholder=" 0.00 CHF"
                      onChange={(e, { name, value }) => {
                        this.handleChange(e, { name: name, value: +value });
                      }}
                      width={4}
                    />
                    <Form.Checkbox
                      name={"perHour"}
                      label="Stundenlohn"
                      checked={this.state.perHour}
                      onChange={() =>
                        this.setState({ perHour: !this.state.perHour })
                      }
                    />
                  </Form.Group>
                </Grid.Column>
                <Grid.Column>
                  <Header>
                    {this.state.salary + " CHF"}
                    {this.state.perHour && "/Stunde"}
                  </Header>
                </Grid.Column>
              </Grid>
            </Segment>
            <Segment>
              <Header>Planung</Header>
              <p>Welche art von Anstellung möchten sie Anbieten?</p>
              {/*Client side rendering of schedule Tabs*/}
              {this.state.scheduleTabs}
            </Segment>
            <Segment>
              <Header>Studenten Profil</Header>
              <p>Welche Universitäten möcheten Sie Hauptsächlich ansprechen?</p>
              <Form.Dropdown
                required
                width={5}
                placeholder="Universität"
                fluid
                multiple
                search
                selection
                options={uniOptions}
              />

              <p>Was für Studiengänge möchten sie Ansprechen?</p>
              <Form.Dropdown
                required
                width={10}
                placeholder="Studiengang"
                fluid
                multiple
                search
                selection
                options={studyProgOptions}
              />
            </Segment>
            {!this.state.disableButton && (
              <Form.Button
                size={"big"}
                type={"Submit"}
                labelPosition={"right"}
                icon={"right arrow"}
                color={"green"}
                floated={"right"}
                content={"Veröffendlichen"}
              />
            )}
            {this.state.disableButton && (
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
  mutation CREATE_JOB(
    $title: String!
    $organization: String!
    $description: String!
    $salary: Float!
    $perHour: Boolean!
    $workload: Float!
    $start: String!
    $end: String
  ) {
    createJob(
      input: {
        title: $title
        organization: $organization
        description: $description
        salary: $salary
        isSalaryPerHour: $perHour
        workload: $workload
        start: $start
        end: $end
      }
    ) {
      id
      title
      description
    }
  }
`;

class NewJobForm extends React.Component {
  state = {
    orgId: ""
  };

  render() {
    return (
      <React.Fragment>
        <Mutation
          mutation={CREATE_NEW_JOB}
          refetchQueries={[
            {
              query: GET_ALL_ORGANIZATION_JOBS,
              variables: { orgId: this.state.orgId }
            }
          ]}
          awaitRefetchQueries
        >
          {(createJob, { loading, error }) => (
            <NewJobFormComponent
              loading={loading}
              error={error}
              passOrgId={orgId => this.setState({ orgId: orgId })}
              onCreate={async data => {
                console.log({ ...data });
                await createJob({
                  variables: { ...data }
                });
              }}
            />
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

export default NewJobForm;
