import * as React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../layout/header/NavBar";
import JobDetailGroupComponent from "./JobDetailGroup";

const Page = ({ job }) => (
  <div>
    <NavBar />
    <Container>
      <JobDetailGroupComponent job={job} />
    </Container>
  </div>
);

Page.getInitialProps = ({ query }) => ({ job: query["id"] });

export default Page;
