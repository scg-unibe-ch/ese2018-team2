import * as React from "react";
import { Button, Container, GridRow, Header } from "semantic-ui-react";
import Link from "../global/Link";

export default ({ job }) => (
  <GridRow>
    <Header as={"h3"}>{job.title}</Header>
    <Container text>{job.description}</Container>
    <Button as={Link} href={"/jobdetails"}>
      details
    </Button>
  </GridRow>
);
