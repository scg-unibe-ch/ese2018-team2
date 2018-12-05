import React from "react";
import { WithRouterProps, withRouter } from "next/router";
import { Search } from "semantic-ui-react";

const SearchFieldComponent: React.SFC<WithRouterProps> = ({ router }) => {
  console.log(router);
  return (
    <Search
      defaultValue={router.query ? (router.query.search as string) : ""}
    />
  );
};

export default withRouter(SearchFieldComponent);
