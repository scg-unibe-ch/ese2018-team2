import * as React from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

interface SaveFunc {
  (formData: FormData): void;
}

interface JobFormProps {
  data: {
    id: string;
    title: string;
    description?: string;
  };
  onSave?: SaveFunc;
}

const JobFormComponent: React.SFC<JobFormProps> = ({ data, onSave }) => (
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
  </Form>
);

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
