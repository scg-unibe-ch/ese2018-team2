import { ApolloError } from "apollo-boost";
import gql from "graphql-tag";
import Link from "next/link";
import * as React from "react";
import { Query } from "react-apollo";
import { Card, Message, Segment } from "semantic-ui-react";
import ApplicationItem from "./ApplicationItem";

interface ApplicationListComponentProps {
  loading: boolean;
  error: ApolloError;
  data: GetUserApplications;
}

const ApplicationListComponent: React.SFC<ApplicationListComponentProps> = ({
  loading,
  error,
  data
}) => (
  <Segment loading={loading}>
    {error && (
      <Message error>
        <Message.Header>Error :(</Message.Header>
        <p>{error.message}</p>
      </Message>
    )}
    {data.applications &&
      data.applications.length > 0 && (
        <Card.Group dividied="true">
          {data.applications.map(application => (
            <ApplicationItem key={application.id} application={application} />
          ))}
        </Card.Group>
      )}
    {data.applications &&
      data.applications.length === 0 && (
        <Message icon={"info"} positive>
          <Message.Header>
            Keine offenen Bewerbungen. Suche&nbsp;
            <Link href={"/"} passHref>
              <a>hier</a>
            </Link>
            &nbsp;nach einem Job, welcher zu <strong>dir</strong> passt.
          </Message.Header>
        </Message>
      )}
  </Segment>
);

export const GET_ALL_USER_APPLICATIONS = gql`
  query GetAllUserApplications {
    applications {
      id
      state
      job {
        id
        title
        description
      }
      user {
        id
        firstname
        lastname
        email
      }
    }
  }
`;

interface GetUserApplications {
  applications: {
    id: string;
    state: string;
    job: {
      id: string;
      title: string;
      description: string;
    };
    user: {
      id: string;
      firstname: string;
      lastname: string;
      email: string;
    };
  }[];
}

const ApplicationList: React.SFC = () => {
  return (
    <Query query={GET_ALL_USER_APPLICATIONS} ssr>
      {({ loading, error, data }) => (
        <ApplicationListComponent
          loading={loading}
          error={error}
          data={!loading && (data as GetUserApplications)}
        />
      )}
    </Query>
  );
};

export default ApplicationList;
