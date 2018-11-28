import React from "react";
import { Container, Header, List } from "semantic-ui-react";
import EnsureLoggedIn from "../../lib/EnsureLoggedIn";
import { withIntialMe, WithMeProps } from "../../lib/withMe";
import NavBar from "../Frame/NavBar";

const Page: React.SFC<WithMeProps> = ({ me }) => {
  return (
    <React.Fragment>
      <NavBar />
      <Container>
        <EnsureLoggedIn>
          <Header as={"h1"}>
            {" "}
            {me.firstname} {me.lastname}
          </Header>
          <p>
            <List>
              <List.Item>
                <List.Icon name="mail" />
                <List.Content>
                  <a href="mailto:{me.email}">{me.email}</a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon className="phone icon" />
                <List.Content>{me.phone}</List.Content>
              </List.Item>
            </List>
          </p>
        </EnsureLoggedIn>
      </Container>
    </React.Fragment>
  );
};

export default withIntialMe(Page);
