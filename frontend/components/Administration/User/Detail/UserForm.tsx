import * as React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import UserDetailDeleteButton from "./UserDetailDeleteButton";

interface UserFormProps {
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    siteAdmin: boolean;
  };
}

const UserForm: React.SFC<UserFormProps> = ({ user }) => (
  <Form>
    <Form.Field>
      <label>Email</label>
      <input name="email" placeholder="Email" defaultValue={user.email} />
    </Form.Field>
    <Form.Field>
      <label>Firstname</label>
      <input
        name="firstname"
        placeholder="Firstname"
        defaultValue={user.firstname}
      />
    </Form.Field>
    <Form.Field>
      <label>Lastname</label>
      <input
        name="lastname"
        placeholder="Lastname"
        defaultValue={user.lastname}
      />
    </Form.Field>
    <Form.Field>
      <label>Phone</label>
      <input name="phone" placeholder="Phone" defaultValue={user.phone} />
    </Form.Field>
    <Form.Field>
      <Checkbox label="SiteAdmin" defaultChecked={user.siteAdmin} />
    </Form.Field>
    <Button color="green" type="submit">
      Save
    </Button>
    <UserDetailDeleteButton />
  </Form>
);

export default UserForm;
