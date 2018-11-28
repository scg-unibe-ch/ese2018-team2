import React from "react";
import { Container, Header, List, Segment } from "semantic-ui-react";
import OrganizationBreadcrumb from "./OrganizationBreadcrumb";
import OrganizationDeleteButton from "./OrganizationDeleteButton";
import ApproveOrganizationButton from "./ApproveOrganizationButton";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "next/router";

export const GET_ORGANIZATION = gql`
  query GetOrganization($id: String!) {
    organizations(organizationId: $id) {
      id
      name
      email
      phone
      approved
    }
  }
`;

const DetailComponent = ({ router }) => (
  <React.Fragment>
    <OrganizationBreadcrumb />
    <Container>
      <Query query={GET_ORGANIZATION} variables={{ id: router.query.detail }}>
        {({ loading, error, data }) => (
          <Segment basic loading={loading}>
            {error && <p>{error.message}</p>}
            {!error && (
              <React.Fragment>
                <Segment attached="top">
                  <Header>
                    {data.organizations &&
                      data.organizations.length > 0 &&
                      data.organizations[0].name}
                  </Header>
                </Segment>
                <Segment attached>
                  {data.organizations &&
                    data.organizations.length > 0 && (
                      <List>
                        <List.Item
                          icon="phone"
                          content={data.organizations[0].phone}
                        />
                        <List.Item
                          icon="mail"
                          content={
                            <a href={"mailto:" + data.organizations[0].email}>
                              {data.organizations[0].email}
                            </a>
                          }
                        />
                        <List.Item
                          icon="linkify"
                          content={"organization.com"}
                        />
                      </List>
                    )}
                </Segment>

                <Segment attached={"bottom"} loading={loading}>
                  {data.organizations &&
                    !data.organizations[0].approved && (
                      <ApproveOrganizationButton
                        organizationId={router.query.detail}
                      />
                    )}
                  <OrganizationDeleteButton
                    organizationId={router.query.detail}
                  />
                </Segment>
              </React.Fragment>
            )}
          </Segment>
        )}
      </Query>
    </Container>
  </React.Fragment>
);

export default withRouter(DetailComponent);
