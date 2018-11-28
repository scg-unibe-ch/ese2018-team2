import gql from "graphql-tag";
import { SingletonRouter, withRouter } from "next/router";
import React from "react";
import { Query } from "react-apollo";
import { Segment } from "semantic-ui-react";
import SingleJobComponent from "./SingleJob";

interface SingleJobOverviewComponentProps {
  router?: SingletonRouter;
}

const query = gql`
  query GetJob($id: String!) {
    job(id: $id) {
      id
      title
      description
      organization {
        id
        name
        email
      }
      applied
    }
  }
`;

const SingleJobOverviewComponent: React.SFC<
  SingleJobOverviewComponentProps
> = ({ router }) => (
  <React.Fragment>
    {!router.query.id && <p>Error</p>}
    {router.query.id && (
      <Query query={query} variables={{ id: router.query.id }}>
        {({ loading, error, data }) => (
          <Segment loading={loading}>
            {!loading && error && <p>{error.message}</p>}
            {!loading && !error && <SingleJobComponent job={data.job} />}
          </Segment>
        )}
      </Query>
    )}
  </React.Fragment>
);

export default withRouter(SingleJobOverviewComponent);
