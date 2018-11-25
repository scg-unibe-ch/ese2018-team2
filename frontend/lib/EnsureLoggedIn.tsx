import React from "react";
import Login from "../components/Auth/Login";
import { WithMeProps, WithMeQuery } from "./withMe";
import { Query } from "react-apollo";

// @ts-ignore
const EnsureLoggedIn: React.SFC<WithMeProps> = ({ me, children }) => {
  if (me) {
    return children;
  }
  return <Login />;
};

/**
 * Component to ensure if a user is logged in. It displays the login form if not.
 */
export default ({ children }) => (
  <Query query={WithMeQuery}>
    {({ data, loading, error }) => (
      <EnsureLoggedIn me={!error && !loading && data.me}>
        {children}
      </EnsureLoggedIn>
    )}
  </Query>
);
