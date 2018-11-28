import { Mutation } from "react-apollo";
import { GET_ALL_ORGANIZATIONS } from "../Overview";
import { Button } from "semantic-ui-react";
import React from "react";
import gql from "graphql-tag";
import { SingletonRouter, withRouter } from "next/router";

const APPROVE_ORGANIZATION = gql`
  mutation ApproveOrganization($id: String!) {
    approveOrganization(organizationId: $id)
  }
`;

interface ApproveOrganizationButtonProps {
  organizationId: string;
  router?: SingletonRouter;
}

const ApproveOrganizationButton: React.SFC<ApproveOrganizationButtonProps> = ({
  organizationId,
  router
}) => (
  <Mutation
    mutation={APPROVE_ORGANIZATION}
    refetchQueries={[{ query: GET_ALL_ORGANIZATIONS }]}
    awaitRefetchQueries
  >
    {(approveOrganization, _) => (
      <Button
        content={"Approve"}
        labelPosition="right"
        color={"green"}
        icon="checkmark"
        onClick={async () => {
          await approveOrganization({
            variables: { id: organizationId }
          });
          await router.push("/admin/organizations");
        }}
      />
    )}
  </Mutation>
);

export default withRouter(ApproveOrganizationButton);
