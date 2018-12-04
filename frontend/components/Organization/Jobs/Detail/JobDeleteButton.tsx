import gql from "graphql-tag";
import { SingletonRouter, withRouter } from "next/router";
import * as React from "react";
import { Mutation } from "react-apollo";
import { Button, Confirm, Popup } from "semantic-ui-react";
import {GET_ALL_ORGANIZATION_JOBS} from "../OrganisationOverview";

interface JobDeleteButtonComponentProps {
  jobId: string;
  onConfirm?: (jobId: String) => void;
}

interface JobDeleteButtonComponentState {
  confirmOpen: Boolean;
}

class JobDeleteButtonComponent extends React.Component<
  JobDeleteButtonComponentProps,
  JobDeleteButtonComponentState
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
    this.props.onConfirm(this.props.jobId);
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
            "This action will delete the job with all it's everything else"
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

const DELETE_JOB = gql`
  mutation DeleteJob($job: ID!) {
    deleteJob(job: $job)
  }
`;

interface JobDeleteButtonProps {
  jobId: string;
  router?: SingletonRouter;
}

const JobDeleteButton: React.SFC<JobDeleteButtonProps> = ({jobId, router}) => (
  <Mutation
    mutation={DELETE_JOB}
    variables={{ job: jobId }}
    refetchQueries={[{ query: GET_ALL_ORGANIZATION_JOBS }]}
    awaitRefetchQueries
  >
    {(deleteOrganization, _) => (
      <JobDeleteButtonComponent
        jobId={jobId}
        onConfirm={async () => {
          await deleteOrganization({
            variables: { job: jobId}
          });
          await router.replace("/org/jobs");
        }}
      />
    )}
  </Mutation>
);

export default withRouter(JobDeleteButton);
