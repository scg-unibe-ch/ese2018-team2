import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import React from "react";
import { Query } from "react-apollo";
import { Breadcrumb, Loader } from "semantic-ui-react";
import { GET_ORGANIZATION } from "./Detail";

interface OrganizationBreadcrumbComponentProps {
  router?: SingletonRouter;
}

const OrganizationBreadcrumb: React.SFC<
  OrganizationBreadcrumbComponentProps
> = ({ router }) => (
  <Breadcrumb size="big">
    {router.query && router.query.detail ? (
      <Link href={"/admin/organizations"} passHref>
        <Breadcrumb.Section>Übersicht Unternehmen</Breadcrumb.Section>
      </Link>
    ) : (
      <Breadcrumb.Section>Übersicht Unternehmen</Breadcrumb.Section>
    )}

    {router.query && router.query.detail && <Breadcrumb.Divider />}

    {router.query &&
      router.query.detail && (
        <Query query={GET_ORGANIZATION} variables={{ id: router.query.detail }}>
          {({ loading, error, data }) => (
            <Breadcrumb.Section>
              <Loader active={loading} inline size={"tiny"} />
              {error && error.message}
              {data.organizations &&
                data.organizations.length > 0 &&
                data.organizations[0].name}
            </Breadcrumb.Section>
          )}
        </Query>
      )}
  </Breadcrumb>
);

export default withRouter(OrganizationBreadcrumb);
