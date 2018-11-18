import * as React from "react";
import { Form, Button, Confirm } from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import JobDeleteButton from "./JobDeleteButton";
import ApplyButton from "../../student/ApplyButton";

interface JobFormProps {
  data: {
    id: string;
    title: string;
    description?: string;
  };
  onSave?: (formData: FormData) => void;
}

class JobFormComponent extends React.Component<JobFormProps> {
  public static defaultProps: Partial<JobFormProps> = {
    onSave: _ => {}
  };

  state = {
    confirmOpen: false
  };

  openConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ confirmOpen: true });
    e.preventDefault();
  };

  render() {
    const { data, onSave } = this.props;
    return (
      <React.Fragment>
        <Confirm open={this.state.confirmOpen} />
        <Form
          onSubmit={(e: React.FormEvent) => {
            //@ts-ignore
            onSave(new FormData(e.target));
            e.preventDefault();
          }}
        >
          <Form.Field>
            <label>Titel</label>
            <input name="title" placeholder="Titel" defaultValue={data.title} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              name="description"
              placeholder="Description"
              defaultValue={data.description}
            />
          </Form.Field>
          <Button color="green" type="submit">
            Save
          </Button>
          <JobDeleteButton job={data} />
          <ApplyButton jobId={data.id}/>
        </Form>
      </React.Fragment>
    );
  }
}

const UPDATE_JOB = gql`
  mutation UpdateJob($id: ID!, $title: String, $description: String) {
    updateJob(id: $id, title: $title, description: $description) {
      id
      title
      description
    }
  }
`;

const JobForm: React.SFC<JobFormProps> = ({ data }) => (
  <Mutation mutation={UPDATE_JOB}>
    {(updateJob, _) => (
      <JobFormComponent
        data={data}
        onSave={async (formData: FormData) => {
          await updateJob({
            variables: {
              id: data.id,
              title: formData.get("title"),
              description: formData.get("description")
            }
          });
        }}
      />
    )}
  </Mutation>
);

export default JobForm;
