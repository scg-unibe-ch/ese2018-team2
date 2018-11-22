import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import FrontPageNavBar from "../components/FrontPage/FrontPageNavBar";
import BuisnessFrontPage from "../components/FrontPage/BuisnessFrontPage";

export default () => (
  <div>
    <FrontPageNavBar />
    <Container>
      <BuisnessFrontPage />
    </Container>
  </div>
);
