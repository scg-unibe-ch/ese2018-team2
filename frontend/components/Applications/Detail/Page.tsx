import { withRouter } from "next/router";
import * as React from "react";
import { Container } from "semantic-ui-react";
import ApplicationDetails from "./ApplicationDetails";
import NavBar from "../../Frame/NavBar";

export default withRouter(props => {
  return (
    <div>
      <NavBar />
      <Container>
        <ApplicationDetails application={props.router.query["id"] as string} />
      </Container>
    </div>
  );
});
