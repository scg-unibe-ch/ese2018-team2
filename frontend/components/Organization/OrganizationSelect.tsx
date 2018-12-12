import gql from "graphql-tag";
import * as React from "react";
import { Query } from "react-apollo";
import { Form } from "semantic-ui-react";

interface OrganizationSelectComponentProps {
  loading: boolean;
  data?: {
    organizations: {
      id: string;
      name: string;
    }[];
  };
  handleChange: (e: any, x: { name; value }) => void;
}

export const OrganizationSelectComponent: React.FC<
  OrganizationSelectComponentProps
> = ({ loading, data, handleChange }) => (
  <Form.Select
    loading={loading}
    placeholder={"Select organization"}
    name={"organization"}
    onChange={handleChange}
    options={
      !loading && !!data
        ? data.organizations.map(org => ({
            key: org.id,
            value: org.id,
            text: org.name
          }))
        : []
    }
  />
);

const GET_ALL_ORGS = gql`
  query GetOrgs {
    organizations {
      id
      name
    }
  }
`;

export default props => (
  <Query query={GET_ALL_ORGS}>
    {({ loading, error, data }) => {
      if (error) {
        return <p>{error.message}</p>;
      }

      return (
        <OrganizationSelectComponent loading={loading} data={data} {...props} />
      );
    }}
  </Query>
);
