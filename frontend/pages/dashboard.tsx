import * as React from "react";
import NavBar from "../components/layout/header/NavBar";
import "semantic-ui-css/semantic.min.css";
import { Container, Header } from "semantic-ui-react";
import withAuthorization from "../components/Auth/withAuthorization";
import Me from "../components/Auth/Me";

const page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <Header as={"h1"}>Dashboard</Header>
      <Me />
    </Container>
  </React.Fragment>
);

export default withAuthorization(page);
