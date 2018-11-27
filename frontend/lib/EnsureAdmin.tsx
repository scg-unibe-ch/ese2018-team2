import React from "react";
import { WithMeProps, WithMeQuery } from "./withMe";
import { Query } from "react-apollo";

// @ts-ignore
const EnsureAdmin: React.SFC<WithMeProps> = ({ me, children }) => {
  if (me && me.siteAdmin) {
    return children;
  }
  // TODO, Make better site
  return <p>404</p>;
};

export default ({ children }) => (
  <Query query={WithMeQuery}>
    {({ data, loading, error }) => (
      <EnsureAdmin me={!error && !loading && data.me}>{children}</EnsureAdmin>
    )}
  </Query>
);
