import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import NavBar from "../components/Frame/NavBar";
import BuisnessFrontPage from "../components/FrontPage/BuisnessFrontPage";

export default () => (
  <div>
    <NavBar />
    <Container>
      <BuisnessFrontPage />
    </Container>
  </div>
);
