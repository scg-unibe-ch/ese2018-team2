import gql from "graphql-tag";
import { NextContext } from "next";
import * as React from "react";
import { graphql } from "react-apollo";

export interface WithMeProps {
  me?: {
    id: string;
    firstname: string;
    lastname: string;
    siteAdmin: boolean;
    email: string;
    phone: string;
    hasOrganizations: string;
  };
}

export const WithMeQuery = gql`
  query WithMe {
    me {
      id
      firstname
      lastname
      siteAdmin
      email
      phone
      hasOrganizations
    }
  }
`;

/**
 * Useful HOC to get current user as initial props.
 * Only works with pages, as getInitialProps is only executed on the first component of the tree.
 */
export const withIntialMe = <P extends object>(
  Component: React.ComponentType<P>
) =>
  class extends React.Component<P & WithMeProps> {
    static async getInitialProps(ctx: NextContext) {
      //@ts-ignore
      const client = ctx.apolloClient;

      const defaultReturn = { data: { me: null } };
      const {
        data: { me }
      } = await client.query({ query: WithMeQuery }).catch(() => defaultReturn);

      return {
        me
      };
    }

    render() {
      return <Component {...this.props} />;
    }
  };

/**
 * Useful HOC to get current user.
 */
export const withMe = graphql<WithMeProps>(WithMeQuery, {
  //@ts-ignore
  props: ({ data, error }) => ({
    //@ts-ignore
    me: !error && data.me
  })
});
