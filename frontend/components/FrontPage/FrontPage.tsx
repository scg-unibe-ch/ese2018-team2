import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Divider } from "semantic-ui-react";
import NavBar from "../Frame/NavBar";
import HowItWorksStudents from "./HowItWorksStudents";
import JobSearch from "./JobSearch";

export default () => (
  <div>
    <NavBar />
    <Container>
      <JobSearch />
      <Divider />
      <HowItWorksStudents />
    </Container>
  </div>
);
