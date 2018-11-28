import { Header, Segment, Container, Message } from "semantic-ui-react";
import * as React from "react";
import NewJobForm from "./NewJobForm";

interface NewJobComponentProps {}

interface NewJobComponentState {}

class NewJobComponent extends React.Component<
  NewJobComponentProps,
  NewJobComponentState
> {
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment clearing>
            <Header as={"h1"}>Erstelle dein Jobinserat</Header>
            <NewJobForm />
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

export default NewJobComponent;
