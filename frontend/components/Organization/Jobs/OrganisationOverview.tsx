import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import gql from "graphql-tag";
import { ApolloError } from "apollo-boost";
import { Query } from "react-apollo";
import OrganisationContainer from "./OrganisationContainer";
import IsDetail from "./IsDetail";

interface OrganisationOverviewComponentProps {
  loading: boolean;
  error: ApolloError;
  data: {
    organizations: {
      id: string;
      name: string;
      jobs: {
        id: string;
        title: string;
      }[];
    }[];
  };
}

const OrganisationOverviewComponent: React.FC<
  OrganisationOverviewComponentProps
> = ({ loading, error, data }) => (
  <IsDetail>
    <Container>
      <Header as={"h2"}>Übersicht Jobinserate</Header>
      <Segment basic loading={loading}>
        {error && <p>{error.message}</p>}
        {!loading &&
          !error &&
          data &&
          data.organizations.map(org => (
            <OrganisationContainer key={org.id} org={org} />
          ))}
      </Segment>
    </Container>
  </IsDetail>
);

export const GET_ALL_ORGANIZATION_JOBS = gql`
  query organizations {
    organizations {
      id
      name
      jobs {
        id
        title
      }
    }
  }
`;

export default () => (
  <Query query={GET_ALL_ORGANIZATION_JOBS}>
    {({ loading, error, data }) => (
      <OrganisationOverviewComponent
        loading={loading}
        error={error}
        data={data}
      />
    )}
  </Query>
);
