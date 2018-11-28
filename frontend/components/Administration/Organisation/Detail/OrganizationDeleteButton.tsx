import gql from "graphql-tag";
import { SingletonRouter, withRouter } from "next/router";
import * as React from "react";
import { Mutation } from "react-apollo";
import { Button, Confirm, Popup } from "semantic-ui-react";
import { GET_ALL_ORGANIZATIONS } from "../Overview";

interface OrganizationDeleteButtonComponentProps {
  organizationId: string;
  onConfirm?: (organizationId: string) => void;
}

interface OrganizationDeleteButtonComponentState {
  confirmOpen: Boolean;
}

class OrganizationDeleteButtonComponent extends React.Component<
  OrganizationDeleteButtonComponentProps,
  OrganizationDeleteButtonComponentState
> {
  public static defaultProps = {
    onConfirm: _ => {}
  };

  state = {
    confirmOpen: false
  };

  openConfirm = () => {
    this.setState({ confirmOpen: true });
  };
  closeConfirm = () => {
    this.setState({ confirmOpen: false });
  };

  confirm = () => {
    this.props.onConfirm(this.props.organizationId);
    this.closeConfirm();
  };

  render() {
    const { confirmOpen } = this.state;

    return (
      <React.Fragment>
        <Confirm
          open={confirmOpen}
          header={"Warning!"}
          content={
            "This action will delete the organization with all it's users, jobs and job applications"
          }
          confirmButton={"Delete"}
          onCancel={this.closeConfirm}
          onConfirm={this.confirm}
        />
        <Popup
          trigger={
            <Button
              content={"Delete"}
              labelPosition="right"
              icon={"trash"}
              color={"red"}
              onClick={this.openConfirm}
            />
          }
          content={"Delete Organisation"}
        />
      </React.Fragment>
    );
  }
}

const DELETE_ORGANIZATION = gql`
  mutation DeleteOrganization($organizationId: String!) {
    deleteOrganization(organizationId: $organizationId)
  }
`;

interface OrganizationDeleteButtonProps {
  organizationId: string;
  router?: SingletonRouter;
}

const OrganizationDeleteButton: React.SFC<OrganizationDeleteButtonProps> = ({
  organizationId,
  router
}) => (
  <Mutation
    mutation={DELETE_ORGANIZATION}
    variables={{ organizationId: organizationId }}
    refetchQueries={[{ query: GET_ALL_ORGANIZATIONS }]}
    awaitRefetchQueries
  >
    {(deleteOrganization, _) => (
      <OrganizationDeleteButtonComponent
        organizationId={organizationId}
        onConfirm={async () => {
          await deleteOrganization({
            variables: { organizationId: organizationId }
          });
          await router.replace("/admin/organizations");
        }}
      />
    )}
  </Mutation>
);

export default withRouter(OrganizationDeleteButton);
