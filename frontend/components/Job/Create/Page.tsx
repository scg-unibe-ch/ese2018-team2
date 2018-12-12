import NavBar from "../../Frame/NavBar";
import EnsureLoggedIn from "../../../lib/EnsureLoggedIn";
import NewJobComponent from "./NewJobComponent";
import * as React from "react";
import { Container } from "semantic-ui-react";

const Page = () => (
  <React.Fragment>
    <NavBar />
    <Container>
      <EnsureLoggedIn>
        <NewJobComponent />
      </EnsureLoggedIn>
    </Container>
  </React.Fragment>
);

export default Page;
