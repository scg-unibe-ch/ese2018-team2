import * as React from "react";
import { Button, Item, Label } from "semantic-ui-react";
import JobPopup from "./JobPopup";
import { Link, Router, matchPath } from "../../lib/routes";

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

/**
 * Item containing a Job-insert preview. By clicking on the
 * eye-icon a detailed view of the insert is displayed.
 */
class JobItem extends React.Component<Job> {
  //Reference to the child component JobPopup for calling functions from it
  private child: JobPopup;

  constructor(Job) {
    super(Job);
    //bind the function to this.(Is not bound by default)
    this.showPopup = this.showPopup.bind(this);
  }

  /**
   * Calls the openPopup() function from the child JobPopup
   * for changing its state and to trigger the rerender
   */
  showPopup() {
    console.log("Parent Method called : showPopup()");
    this.child.openPopup();
  }

  render() {
    return (
      <Item>
        <Link route={"/jobdetails"}>
          <a>
            <Item.Image
              src={this.props.job.employer.logo}
              as={"a"}
              href={"/jobdetails"}
            />
          </a>
        </Link>
        <Item.Content>
          <Item.Header as="a" href={"./jobdetails"}>
            {this.props.job.title}
          </Item.Header>
          <Item.Meta>
            <span className="schedule">{this.props.job.schedule}</span>
          </Item.Meta>
          <Button
            compact
            icon={"eye"}
            floated={"right"}
            size={"huge"}
            onClick={this.showPopup}
          />
          <Item.Description>{this.props.job.description}</Item.Description>
          {/*Creat for each required skill for a job a Label*/}
          <Item.Extra>
            {this.props.job.skills.map(skill => (
              <Label key={skill.valueOf()}>{skill}</Label>
            ))}
          </Item.Extra>
          {/*store the reference of this component in the local child field*/}
          <JobPopup
            ref={instance => (this.child = instance)}
            job={this.props.job}
            router={Router}
          />
        </Item.Content>
      </Item>
    );
  }
}

export default JobItem;
