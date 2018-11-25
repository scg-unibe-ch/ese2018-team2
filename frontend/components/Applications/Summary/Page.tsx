import { withRouter } from "next/router";
import * as React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../Frame/NavBar";
import ApplicationList from "../ApplicationList";

export default withRouter(props => {
  return (
    <div>
      <NavBar />
      <Container>
        <ApplicationList />
      </Container>
    </div>
  );
});
