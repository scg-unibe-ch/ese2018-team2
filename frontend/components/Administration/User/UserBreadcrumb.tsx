import gql from "graphql-tag";
import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import React from "react";
import { Query } from "react-apollo";
import { Breadcrumb, Loader } from "semantic-ui-react";

const query = gql`
  query GetUserDetail($id: String!) {
    users(id: $id) {
      id
      email
    }
  }
`;

interface UserBreadcrumbComponentProps {
  router?: SingletonRouter;
}

const UserBreadcrumbComponent: React.SFC<UserBreadcrumbComponentProps> = ({
  router
}) => (
  <Breadcrumb size="big">
    {router.query && router.query.detail ? (
      <Link href={"/admin/users"} passHref>
        <Breadcrumb.Section>Übersicht Benutzende</Breadcrumb.Section>
      </Link>
    ) : (
      <Breadcrumb.Section>Übersicht Benutzende</Breadcrumb.Section>
    )}

    {router.query && router.query.detail && <Breadcrumb.Divider />}

    {router.query &&
      router.query.detail && (
        <Query query={query} variables={{ id: router.query.detail }}>
          {({ loading, error, data }) => (
            <Breadcrumb.Section>
              <Loader active={loading} inline size={"tiny"} />
              {error && error.message}
              {data.users && data.users.length > 0 && data.users[0].email}
            </Breadcrumb.Section>
          )}
        </Query>
      )}
  </Breadcrumb>
);

export default withRouter(UserBreadcrumbComponent);
