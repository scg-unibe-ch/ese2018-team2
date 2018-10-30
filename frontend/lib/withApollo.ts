import ApolloClient from "apollo-boost";
import withApollo from "next-with-apollo/lib/withApollo";

export default withApollo(
  () =>
    new ApolloClient({
      uri: "http://localhost:4000",
      credentials: "include"
    })
);
