import {
  Button,
  Container,
  Dropdown,
  Grid,
  Header,
  Icon,
  Segment
} from "semantic-ui-react";
import * as React from "react";

const skillOptions = [
  { key: "angular", text: "Angular", value: "angular" },
  { key: "css", text: "CSS", value: "css" },
  { key: "design", text: "Graphic Design", value: "design" },
  { key: "ember", text: "Ember", value: "ember" },
  { key: "html", text: "HTML", value: "html" },
  { key: "ia", text: "Information Architecture", value: "ia" },
  { key: "javascript", text: "Javascript", value: "javascript" },
  { key: "mech", text: "Mechanical Engineering", value: "mech" },
  { key: "meteor", text: "Meteor", value: "meteor" },
  { key: "node", text: "NodeJS", value: "node" },
  { key: "plumbing", text: "Plumbing", value: "plumbing" },
  { key: "python", text: "Python", value: "python" },
  { key: "rails", text: "Rails", value: "rails" },
  { key: "react", text: "React", value: "react" },
  { key: "repair", text: "Kitchen Repair", value: "repair" },
  { key: "ruby", text: "Ruby", value: "ruby" },
  { key: "ui", text: "UI Design", value: "ui" },
  { key: "ux", text: "User Experience", value: "ux" }
];

export default () => (
  <Container>
    <Segment basic padded="very">
      <Header as="h1">Find jobs</Header>
    </Segment>
    <Grid columns={4}>
      <Grid.Column>
        <Dropdown
          placeholder="Select skills"
          fluid
          search
          selection
          options={skillOptions}
        />
      </Grid.Column>
      <Grid.Column>
        <Dropdown
          placeholder="Select more skills"
          fluid
          multiple
          search
          selection
          options={skillOptions}
        />
      </Grid.Column>
      <Grid.Column>
        <Dropdown
          placeholder="Select more more skills"
          fluid
          search
          selection
          options={skillOptions}
        />
      </Grid.Column>
      <Grid.Column textAlign="center">
        <Button icon labelPosition="right" fluid>
          Find
          <Icon name="search" />
        </Button>
      </Grid.Column>
    </Grid>
  </Container>
);
