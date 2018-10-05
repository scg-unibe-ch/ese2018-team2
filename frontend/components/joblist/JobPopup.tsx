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

/**
 * Popup to display Job information. In this view the user
 * should be able to edit or delete the entry, mark it
 * as favourite or apply for the job
 * @param JobProps: the job to display with its fields
 * @param popupState:  state interface with visibility state in it
 */
class JobPopup extends React.Component<JobProps, popupState> {
  constructor(JobProps) {
    super(JobProps);
    //Popup is closed by default
    this.state = { open: false };
    //binding function to this (It is not bound by default in TSX)
    this.openPopup = this.openPopup.bind(this);
  }

  /**
   * Closes the Popup by first changing the state and
   * afterwards rerendering the JobPopup-Component
   */
  closePopup = () => {
    this.setState({ open: false });
    console.log("Child Method called : closePopup()");
    this.render();
  };

  /**
   * Opens the Popup by first changing the state and
   * afterwards rerendering the JobPopup-Component
   */
  openPopup = () => {
    this.setState({ open: true });
    console.log("Child Method called : openPopup()");
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
            {/*
                         TODO: insert Beris component and maybe passing the close-button to it
                         */}
            <Button
              icon={"close"}
              onClick={this.closePopup}
              floated={"right"}
            />
            {/*
                        passing the job that is bounded to this popup to the display component
                        */}
            <BerisComponent job={this.props.job} />
          </Segment>
        </Container>
      </TransitionablePortal>
    );
  }
}

export default JobPopup;
