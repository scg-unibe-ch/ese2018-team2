import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Divider } from "semantic-ui-react";
import BuisnessHowItWorks from "./BuisnessHowItWorks";
import BuisnessStart from "./BuisnessStart";
import NavBar from "../Frame/NavBar";
import { withIntialMe } from "../../lib/withMe";

export default withIntialMe(() => (
  <div>
    <NavBar />
    <Container>
      <BuisnessStart />
      <Divider />
      <BuisnessHowItWorks />
    </Container>
  </div>
));
