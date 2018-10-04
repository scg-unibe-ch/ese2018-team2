import * as React from "react";
import {
  Button,
  Container,
  Segment,
  TransitionablePortal
} from "semantic-ui-react";
import BerisComponent from "./BerisComponent";

interface JobProps {
  job: {
    id: string;
    title: string;
    description: string;
    skills: string[];
    salary: number;
    schedule: string[];
    period: string;
    employer: {
      name: string;
      logo: string;
    };
  };
}

type popupState = {
  open: boolean;
};

class JobPopup extends React.Component<JobProps, popupState> {
  constructor(JobProps) {
    super(JobProps);
    this.state = { open: false };
    this.open = this.open.bind(this);
  }

  close = () => {
    this.setState({ open: false });
    console.log("Child Method called : close()");
    this.render();
  };

  open = () => {
    this.setState({ open: true });
    console.log("Child Method called : open()");
    this.render();
  };

  render(): React.ReactNode {
    return (
      <TransitionablePortal open={this.state.open}>
        <Container
          text
          style={{
            left: "31.65%",
            position: "fixed",
            top: "20%",
            zIndex: 1000
          }}
        >
          <Segment style={{ padding: "50px" }}>
            <Button icon={"close"} onClick={this.close} floated={"right"} />
            <BerisComponent job={this.props.job} />
          </Segment>
        </Container>
      </TransitionablePortal>
    );
  }
}

export default JobPopup;
