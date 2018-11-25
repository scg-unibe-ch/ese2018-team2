import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import Login from "../components/Auth/Login";
import NavBar from "../components/Frame/NavBar";
import Router from "next/router";

export default () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <Login
        handleSuccess={async () => {
          await Router.replace("/");
        }}
      />
    </Container>
  </React.Fragment>
);
