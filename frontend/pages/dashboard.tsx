import * as React from "react";
import NavBar from "../components/layout/header/NavBar";
import "semantic-ui-css/semantic.min.css";
import {Container} from "semantic-ui-react";
import withAuthorization from "../components/Auth/withAuthorization";
import StudentDashboard from "../components/student/dashboard/StudentDashboard";

const page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <StudentDashboard/>
    </Container>
  </React.Fragment>
);

export default withAuthorization(page);
