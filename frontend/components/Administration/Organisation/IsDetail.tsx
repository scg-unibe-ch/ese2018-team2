import { SingletonRouter, withRouter } from "next/router";
import * as React from "react";
import { ReactElement } from "react";
import Detail from "./Detail/Detail";

interface IsDetailComponentProps {
  router?: SingletonRouter;
  children: ReactElement<any>;
}

const IsDetailComponent: React.SFC<IsDetailComponentProps> = ({
  router,
  children
}) => {
  if (router.query && router.query.detail) {
    return <Detail />;
  }
  return children;
};

export default withRouter(IsDetailComponent);
