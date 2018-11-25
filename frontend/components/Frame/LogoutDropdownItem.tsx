import gql from "graphql-tag";
import React from "react";
import { graphql } from "react-apollo";
import { Dropdown } from "semantic-ui-react";
import Router from "next/router";

const doLogout = gql`
  mutation doLogout {
    logout
  }
`;

interface LogoutMenuItemComponentProps {
  logout: () => void;
}

const LogoutMenuItemComponent: React.SFC<LogoutMenuItemComponentProps> = ({
  logout
}) => (
  <Dropdown.Item
    onClick={() => {
      logout();
    }}
  >
    Logout
  </Dropdown.Item>
);

LogoutMenuItemComponent.defaultProps = {
  logout: () => {}
};

export default graphql(doLogout)(({ mutate }) => (
  <LogoutMenuItemComponent
    logout={async () => {
      await mutate();
      await Router.replace("/");
      window.location.reload(true);
    }}
  />
));
