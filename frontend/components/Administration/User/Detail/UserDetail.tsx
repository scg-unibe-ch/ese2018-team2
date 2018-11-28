import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { SingletonRouter, withRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import UserForm from "./UserForm";

interface UserDetailProps {
  router?: SingletonRouter;
}

const GET_JOB_WITH_DETAILS = gql`
  query GetUserDetail($id: String!) {
    users(id: $id) {
      id
      email
      firstname
      lastname
      phone
      siteAdmin
    }
  }
`;

// TODO: Mutation, Update and delete
const UserDetail: React.SFC<UserDetailProps> = ({ router }) => (
  <Query query={GET_JOB_WITH_DETAILS} variables={{ id: router.query.detail }}>
    {({ loading, error, data }) => (
      <React.Fragment>
        <Loader active={loading} inline size={"tiny"} />
        {error && error.message}
        {data.users &&
          data.users.length > 0 && <UserForm user={data.users[0]} />}
      </React.Fragment>
    )}
  </Query>
);

export default withRouter(UserDetail);
