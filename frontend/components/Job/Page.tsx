import React from "react";
import { Container } from "semantic-ui-react";
import { withIntialMe } from "../../lib/withMe";
import NavBar from "../Frame/NavBar";
import SingleJobOverview from "./Overview/SingleJobOverview";

export const Page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <SingleJobOverview />
    </Container>
  </React.Fragment>
);

export default withIntialMe(Page);
