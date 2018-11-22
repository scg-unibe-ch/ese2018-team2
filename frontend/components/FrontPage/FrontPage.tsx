import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import {Container, Divider} from "semantic-ui-react";
import Search from "./Search";
import HowItWorksStudents from "./HowItWorksStudents";
import FrontPageNavBar from "./FrontPageNavBar";

export default () => (
  <div>
    <FrontPageNavBar/>
    <Container>
      <Search />
      <Divider />
      <HowItWorksStudents />
    </Container>
  </div>
);
