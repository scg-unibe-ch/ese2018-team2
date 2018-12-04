import * as React from "react";
import { Segment, Header, Form, Button } from "semantic-ui-react";

const SearchBoxComponent = () => (
  <Segment>
    <Header as={"h2"}>Suche nach einem Job.</Header>
    <Form action={"/s"} method={"GET"}>
      <Form.Field>
        <label>WAS?</label>
        <input
          type={"text"}
          placeholder={"Informatik, Lektorat..."}
          name={"search"}
        />
      </Form.Field>
      <Button type="submit" color={"green"}>
        Suche
      </Button>
    </Form>
  </Segment>
);

export default SearchBoxComponent;
