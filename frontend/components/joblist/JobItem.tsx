import * as React from "react";
import { Button, Item, Label } from "semantic-ui-react";
import JobPopup from "./JobPopup";

const popup = (jobId: string, jobTitle: string) => {
  return new JobPopup({ jobId: jobId, jobTitle: jobTitle });
};

interface Job {
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

class JobItem extends React.Component<Job> {
  private readonly child: React.RefObject<JobPopup>;

  constructor(Job) {
    super(Job);
    this.showPopup = this.showPopup.bind(this);
  }

  showPopup() {
    console.log("Parent Method called : showPopup()");
    this.child.open();
  }

  render() {
    return (
      <Item>
        <Item.Image
          src={this.props.job.employer.logo}
          as="a"
          href={"./jobdetails"}
        />
        <Item.Content>
          <Item.Header as="a" href={"./jobdetails"}>
            {this.props.job.title}
          </Item.Header>
          <Item.Meta>
            <span className="schedule">{this.props.job.schedule}</span>
          </Item.Meta>
          <Button
            icon={"eye"}
            floated={"right"}
            onClick={e => this.showPopup()}
          />
          <Item.Description>{this.props.job.description}</Item.Description>
          <Item.Extra>
            {this.props.job.skills.map(skill => (
              <Label key={skill.valueOf()}>{skill}</Label>
            ))}
          </Item.Extra>
          <JobPopup
            ref={instance => (this.child = instance)}
            job={this.props.job}
          />
        </Item.Content>
        {popup}
      </Item>
    );
  }
}

export default JobItem;
