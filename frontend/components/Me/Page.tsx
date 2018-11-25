import React from "react";
import { Container, Header } from "semantic-ui-react";
import EnsureLoggedIn from "../../lib/EnsureLoggedIn";
import { withIntialMe, WithMeProps } from "../../lib/withMe";
import NavBar from "../Frame/NavBar";

const Page: React.SFC<WithMeProps> = ({ me }) => {
  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <EnsureLoggedIn>
          <Header as={"h2"}>Profil</Header>
          <p>TODO</p>
        </EnsureLoggedIn>
      </Container>
    </React.Fragment>
  );
};

export default withIntialMe(Page);
