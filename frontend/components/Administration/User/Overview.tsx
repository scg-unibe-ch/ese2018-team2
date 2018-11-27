import gql from "graphql-tag";
import Router from "next/router";
import React from "react";
import { Query } from "react-apollo";
import { Icon, Radio, Segment, Table } from "semantic-ui-react";
import IsDetail from "./IsDetail";
import UserBreadcrumb from "./UserBreadcrumb";

const query = gql`
  query GET_USERS($onlyAdmins: Boolean) {
    users(onlyAdmins: $onlyAdmins) {
      id
      email
      firstname
      lastname
      siteAdmin
    }
  }
`;

interface OverviewProps {}
interface OverviewState {
  onlyAdmins: boolean;
}

class Overview extends React.Component<OverviewProps, OverviewState> {
  state = {
    onlyAdmins: false
  };

  toggleOnlyAdmins = () => {
    this.setState({ onlyAdmins: !this.state.onlyAdmins });
  };

  render() {
    return (
      <IsDetail>
        <React.Fragment>
          <UserBreadcrumb />
          <Segment basic>
            <Radio
              toggle
              checked={this.state.onlyAdmins}
              label={"Nur Admin"}
              onChange={this.toggleOnlyAdmins}
            />
          </Segment>

          <Query
            query={query}
            variables={{ onlyAdmins: this.state.onlyAdmins }}
          >
            {({ loading, error, data }) => (
              <Segment basic loading={loading}>
                {error && <p>{error.message}</p>}
                {!error && (
                  <Table singleLine fixed selectable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>Vornamen</Table.HeaderCell>
                        <Table.HeaderCell>Nachnamen</Table.HeaderCell>
                        <Table.HeaderCell>Admin</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {data.users &&
                        data.users.map(user => (
                          <Table.Row
                            key={user.id}
                            onClick={async e => {
                              e.preventDefault();
                              await Router.push({
                                pathname: "/admin/users",
                                query: {
                                  detail: user.id
                                }
                              });
                            }}
                          >
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.firstname}</Table.Cell>
                            <Table.Cell>{user.lastname}</Table.Cell>
                            <Table.Cell>
                              {user.siteAdmin ? (
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
