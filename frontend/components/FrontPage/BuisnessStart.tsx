import { Button, Container, Icon, Segment } from "semantic-ui-react";
import * as React from "react";

export default () => (
  <Container>
    <Segment basic padded="very" textAlign="center">
      <Button icon labelPosition="right">
        Get Started
        <Icon name="arrow right" />
      </Button>
    </Segment>
  </Container>
);
