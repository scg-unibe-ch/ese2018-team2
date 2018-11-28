import React from "react";
import { Container } from "semantic-ui-react";
import EnsureAdmin from "../../../lib/EnsureAdmin";
import { withIntialMe } from "../../../lib/withMe";
import NavBar from "../../Frame/NavBar";
import Overview from "./Overview";
import EnsureLoggedIn from "../../../lib/EnsureLoggedIn";

const Page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <EnsureLoggedIn>
        <EnsureAdmin>
          <Overview />
        </EnsureAdmin>
      </EnsureLoggedIn>
    </Container>
  </React.Fragment>
);

export default withIntialMe(Page);
