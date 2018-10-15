import * as React from "react";
import { Button, Item } from "semantic-ui-react";
import { Link } from "../../lib/routes";

interface Job {
  job: {
    id: string;
    title: string;
    description: string;
    organization: {
      id: string;
      name: string;
    };
  };
}

const JobItem: React.SFC<Job> = ({ job }) => (
  <Item>
    <Item.Content>
      <Item.Header>
        {job.title} | {job.organization.name}
      </Item.Header>
      <Item.Meta>
        <span className="schedule" />
      </Item.Meta>
      <Link route={"jobdetails"} params={{ id: job.id }} passHref>
        <Button as="a" compact icon={"eye"} floated={"right"} size={"huge"} />
      </Link>
      <Item.Description>{job.description}</Item.Description>
    </Item.Content>
  </Item>
);

export default JobItem;
