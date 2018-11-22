import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Divider } from "semantic-ui-react";
import NavBar from "../layout/header/NavBar";
import BuisnessHowItWorks from "./BuisnessHowItWorks";
import BuisnessStart from "./BuisnessStart";

export default () => (
  <div>
    <NavBar />
    <Container>
      <BuisnessStart />
      <Divider />
      <BuisnessHowItWorks />
    </Container>
  </div>
);
