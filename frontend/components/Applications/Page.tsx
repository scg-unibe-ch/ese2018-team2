import React from "react";
import NavBar from "../Frame/NavBar";
import { Container, Header } from "semantic-ui-react";
import { withIntialMe } from "../../lib/withMe";
import EnsureLoggedIn from "../../lib/EnsureLoggedIn";
import ApplicationList from "./ApplicationList";

const Page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <EnsureLoggedIn>
        <Header as={"h2"}>Bewerbungen</Header>
        <ApplicationList />
      </EnsureLoggedIn>
    </Container>
  </React.Fragment>
);

export default withIntialMe(Page);
