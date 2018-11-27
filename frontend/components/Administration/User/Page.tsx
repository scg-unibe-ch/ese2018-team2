import React from "react";
import { Container, Header } from "semantic-ui-react";
import EnsureAdmin from "../../../lib/EnsureAdmin";
import { withIntialMe } from "../../../lib/withMe";
import NavBar from "../../Frame/NavBar";
import Overview from "./Overview";

const Page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <EnsureAdmin>
        <Overview />
      </EnsureAdmin>
    </Container>
  </React.Fragment>
);

export default withIntialMe(Page);
