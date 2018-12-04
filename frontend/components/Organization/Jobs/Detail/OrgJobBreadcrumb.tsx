import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import React from "react";
import { Query } from "react-apollo";
import { Breadcrumb, Loader } from "semantic-ui-react";
import { GET_JOB } from "./Detail";

interface OrgJobBreadcrumbComponentProps {
  router?: SingletonRouter;
}

const OrgJobBreadcrumb: React.SFC<
  OrgJobBreadcrumbComponentProps
  > = ({ router }) => (
  <Breadcrumb size="big">
    {router.query && router.query.detail ? (
      <Link href={"/org/jobs"} passHref>
        <Breadcrumb.Section>Übersicht Jobinserate</Breadcrumb.Section>
      </Link>
    ) : (
      <Breadcrumb.Section>Übersicht Jobinserate</Breadcrumb.Section>
    )}

    {router.query && router.query.detail && <Breadcrumb.Divider />}

    {router.query &&
    router.query.detail && (
      <Query query={GET_JOB} variables={{ id: router.query.detail }}>
        {({ loading, error, data }) => (
          <Breadcrumb.Section>
            <Loader active={loading} inline size={"tiny"} />
            {error && error.message}
            {data.job &&
            data.job.description}
          </Breadcrumb.Section>
        )}
      </Query>
    )}
  </Breadcrumb>
);

export default withRouter(OrgJobBreadcrumb);
