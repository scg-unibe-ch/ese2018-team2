import gql from "graphql-tag";
import Router from "next/router";
import React from "react";
import { Query } from "react-apollo";
import { Icon, Segment, Table } from "semantic-ui-react";
import IsDetail from "./IsDetail";
import OrganizationBreadcrumb from "./Detail/OrganizationBreadcrumb";

export const GET_ALL_ORGANIZATIONS = gql`
  query GetAllOrganizations {
    organizations {
      id
      name
      email
      approved
    }
  }
`;

interface OverviewProps {}

interface OverviewState {}

class Overview extends React.Component<OverviewProps, OverviewState> {
  render() {
    return (
      <IsDetail>
        <React.Fragment>
          <OrganizationBreadcrumb />
          <Query query={GET_ALL_ORGANIZATIONS}>
            {({ loading, error, data }) => (
              <Segment basic loading={loading}>
                {error && <p>{error.message}</p>}
                {!error && (
                  <Table singleLine fixed selectable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Organization</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Approved</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {data.organizations &&
                        data.organizations.map(organization => (
                          <Table.Row
                            key={organization.id}
                            onClick={async e => {
                              e.preventDefault();
                              await Router.push({
                                pathname: "/admin/organizations",
                                query: {
                                  detail: organization.id
                                }
                              });
                            }}
                          >
                            <Table.Cell>{organization.name}</Table.Cell>
                            <Table.Cell>{organization.email}</Table.Cell>
                            <Table.Cell>
                              {organization.approved ? (
                                <Icon
                                  color="green"
                                  name="checkmark"
                                  size="large"
                                />
                              ) : (
                                ""
                              )}
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                )}
              </Segment>
            )}
          </Query>
        </React.Fragment>
      </IsDetail>
    );
  }
}

export default Overview;
