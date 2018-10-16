import { withRouter } from "next/router";
import * as React from "react";

export default withRouter(props => {
  return <h1>{props.router.query.id}</h1>;
});
