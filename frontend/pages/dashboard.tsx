import * as React from "react";
import NavBar from "../components/layout/header/NavBar";
import "semantic-ui-css/semantic.min.css";
import { Container, Header } from "semantic-ui-react";
import withAuthorization from "../components/Auth/withAuthorization";

const page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <Header>Dashboard</Header>
    </Container>
  </React.Fragment>
)

export default withAuthorization(page)