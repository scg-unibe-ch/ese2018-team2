import ApolloClient from "apollo-boost";
import withApollo from "next-with-apollo/lib/withApollo";

export default withApollo(
  ({ headers }) =>
    new ApolloClient({
      uri: "http://localhost:4000",
      credentials: "include",
      headers
    }),
  { getDataFromTree: "ssr" }
);
