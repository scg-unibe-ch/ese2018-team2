import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Login from "../components/Auth/Login";
import NavBar from "../components/layout/header/NavBar";

export default () => (
  <div>
    <NavBar />
    <Container text>
      <Login />
    </Container>
  </div>
);
