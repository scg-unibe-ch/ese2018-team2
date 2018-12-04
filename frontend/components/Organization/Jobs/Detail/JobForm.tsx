import * as React from "react";
import { Checkbox, Form } from "semantic-ui-react";

interface JobFormProps {
  job: {
    id: string;
    title: string;
    description: string;
    applied: boolean;
  };
}

const JobForm: React.SFC<JobFormProps> = ({ job }) => (
  <Form>
    <Form.Field>
      <label>Title</label>
      <input name="title" placeholder="Title" defaultValue={job.title} />
    </Form.Field>
    <Form.Field>
      <label>Description</label>
      <input
        name="description"
        placeholder="Description"
        defaultValue={job.description}
      />
    </Form.Field>
    <Form.Field>
      <Checkbox label="Applied" defaultChecked={job.applied} />
    </Form.Field>
  </Form>
);

export default JobForm;
