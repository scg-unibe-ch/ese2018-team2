import { SingletonRouter, withRouter } from "next/router";
import { ReactElement } from "react";
import Detail from "./Detail/Detail";
import * as React from "react";

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
