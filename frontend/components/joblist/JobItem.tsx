import * as React from "react";
import {
  Button,
  Container,
  GridRow,
  Header,
  Icon,
  Segment
} from "semantic-ui-react";
import Link from "../global/Link";

export default ({ job }) => (
  <GridRow>
    <Segment>
      <Header as={"h3"}>{job.title}</Header>
      <Container text>{job.description}</Container>
      <Link href={"/jobdetails"}>details</Link>
      <Button>
        <Icon name={"trash"} />
        Delete
      </Button>
    </Segment>
  </GridRow>
);
