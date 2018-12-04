import { Mutation } from "react-apollo";
import { GET_ALL_ORGANIZATIONS } from "../Overview";
import { Button, Loader } from "semantic-ui-react";
import React from "react";
import gql from "graphql-tag";
import { SingletonRouter, withRouter } from "next/router";
import { toast } from "react-toastify";

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
    {(approveOrganization, { loading }) => (
      <Button
        disabled={loading}
        content={loading ? <Loader inline active size={"tiny"} /> : "Annehmen"}
        labelPosition="right"
        color={"green"}
        icon="checkmark"
        onClick={async () => {
          await approveOrganization({
            variables: { id: organizationId }
          });
          toast.success("Organisation wurde bestätigt");
          await router.push("/admin/organizations");
        }}
      />
    )}
  </Mutation>
);

export default withRouter(ApproveOrganizationButton);
