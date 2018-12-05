import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container, Segment } from "semantic-ui-react";
import { withIntialMe } from "../../../lib/withMe";
import NavBar from "../../Frame/NavBar";
import SearchField from "../SearchField";

export default withIntialMe(() => (
  <React.Fragment>
    <NavBar />
    <Segment vertical>
      <Container>
        <SearchField />
      </Container>
    </Segment>
    <Segment vertical>
      <Container>
        <p>Content</p>
      </Container>
    </Segment>
  </React.Fragment>
));
