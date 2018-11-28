import {
  Container,
  Grid,
  Header,
  Icon,
  Label,
  Segment
} from "semantic-ui-react";
import * as React from "react";

export default () => (
  <Container>
    <Segment basic padded="very">
      <Header size={"huge"}>How it works</Header>
    </Segment>
    <Grid textAlign="center" columns={4}>
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Label circular color={"grey"} size={"massive"}>
            1
          </Label>
        </Grid.Column>
        <Grid.Column>
          <Label circular color={"grey"} size={"massive"}>
            2
          </Label>
        </Grid.Column>
        <Grid.Column>
          <Label circular color={"grey"} size={"massive"}>
            3
          </Label>
        </Grid.Column>
        <Grid.Column>
          <Label circular color={"grey"} size={"massive"}>
            4
          </Label>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Icon name="user outline" size="big" />
          <Header as="h2" icon textAlign="center">
            <Header.Content>Register</Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Icon name="search" size="big" />
          <Header as="h2" icon textAlign="center">
            <Header.Content>Find job</Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Icon name="file alternate outline" size="big" />
          <Header as="h2" icon textAlign="center">
            <Header.Content>Apply</Header.Content>
          </Header>
        </Grid.Column>
        <Grid.Column>
          <Icon name="checkmark" size="big" />
          <Header as="h2" icon textAlign="center">
            <Header.Content>Done</Header.Content>
          </Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
);
