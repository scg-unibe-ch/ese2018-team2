import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Divider } from "semantic-ui-react";
import NavBar from "../layout/header/NavBar";
import Search from "./Search";
import HowItWorksStudents from "./HowItWorksStudents";

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
