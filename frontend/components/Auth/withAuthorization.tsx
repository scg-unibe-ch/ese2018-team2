import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Loader, Container } from "semantic-ui-react";
import Login from "./Login";

const WITH_ME_QUERY = gql`
  query withMe {
    me {
      id
    }
  }
`;

const withAuthorization = WrappedComponent => () => (
  <Query query={WITH_ME_QUERY}>
    {({ loading, error }) => {
      console.log("HERE")
      if (loading) {
        return <Loader active />;
      }

      if (error) {
        return <Container><Login /></Container>;
      }

      return <WrappedComponent />;
    }}
  </Query>
);

export default withAuthorization;
