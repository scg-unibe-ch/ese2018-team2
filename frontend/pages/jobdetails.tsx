import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Checkbox, Form } from "semantic-ui-react";

interface Job {
  id: number;
  title: string;
  description: string;
  skills: string;
  salary: number;
  schedule: string;
  period: string;
  employer: string;
}

const FormExampleForm = () => (
  <Form>
    <Form.Field>
      <label>title</label>
      <input placeholder="title" />
    </Form.Field>
    <Form.Field>
      <label>description</label>
      <input placeholder="description" />
    </Form.Field>
    <Form.Field>
      <label>skills</label>
      <input placeholder="skills" />
    </Form.Field>
    <Form.Field>
      <label>salary</label>
      <input placeholder="salary" />
    </Form.Field>
    <Form.Field>
      <label>schedule</label>
      <input placeholder="schedule" />
    </Form.Field>
    <Form.Field>
      <label>period</label>
      <input placeholder="period" />
    </Form.Field>
    <Form.Field>
      <label>employer</label>
      <input placeholder="employer" />
    </Form.Field>
    <Button type="submit">Submit</Button>
  </Form>
);

export default FormExampleForm;
