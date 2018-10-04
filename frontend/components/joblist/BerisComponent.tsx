import * as React from "react";
import { Button, Container, Header, Segment } from "semantic-ui-react";

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

class BerisComponent extends React.Component<JobProps> {
  constructor(JobProps) {
    super(JobProps);
  }

  render(): React.ReactNode {
    return (
      <div>
        <Header as={"h1"}>{this.props.job.title}</Header>
        <Button.Group floated={"right"}>
          <Button icon={"edit"} />
          <Button icon={"trash"} />
        </Button.Group>
        <p>{this.props.job.description}</p>
        <Button size={"big"}>Apply</Button>
      </div>
    );
  }
}

export default BerisComponent;
