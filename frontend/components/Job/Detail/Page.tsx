import { withRouter } from "next/router";
import * as React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../layout/header/NavBar";
import JobDetailGroupComponent from "./JobDetailGroup";

export default withRouter(props => {
  console.log(props.router.query["id"]);
  return (
    <div>
      <NavBar />
      <Container>
        <JobDetailGroupComponent job={props.router.query["id"] as string} />
      </Container>
    </div>
  );
});
