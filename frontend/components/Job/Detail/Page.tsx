import * as React from "react";
import { Container } from "semantic-ui-react";
import JobDetailGroupComponent from "./JobDetailGroup";
import NavBar from "../../Frame/NavBar";

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
