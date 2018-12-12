import * as React from "react";
import { Header, Segment } from "semantic-ui-react";
import NewJobForm from "./Forms/NewJobForm";

interface NewJobComponentProps {}

interface NewJobComponentState {}

class NewJobComponent extends React.Component<
  NewJobComponentProps,
  NewJobComponentState
> {
  render() {
    return (
      <Segment.Group>
        <Segment clearing>
          <Header as={"h1"}>Erstelle dein Jobinserat</Header>
          <NewJobForm />
        </Segment>
      </Segment.Group>
    );
  }
}

export default NewJobComponent;
