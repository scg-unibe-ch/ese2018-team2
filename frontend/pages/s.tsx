import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import NavBar from "../components/Frame/NavBar";
import { Container, Segment, Header, Search } from "semantic-ui-react";
import { withIntialMe } from "../lib/withMe";

export default withIntialMe(() => (
  <React.Fragment>
    <NavBar />
    <Segment vertical>
      <Container>
        <Search />
      </Container>
    </Segment>
    <Segment vertical>
      <Container>
        <p>Content</p>
      </Container>
    </Segment>
  </React.Fragment>
));
