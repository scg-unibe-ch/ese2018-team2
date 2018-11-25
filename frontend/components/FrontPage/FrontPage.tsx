import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Divider } from "semantic-ui-react";
import NavBar from "../Frame/NavBar";
import HowItWorksStudents from "./HowItWorksStudents";
import Search from "./Search";

export default () => (
  <div>
    <NavBar />
    <Container>
      <Search />
      <Divider />
      <HowItWorksStudents />
    </Container>
  </div>
);
