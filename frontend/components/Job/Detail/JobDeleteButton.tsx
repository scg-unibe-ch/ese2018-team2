import gql from "graphql-tag";
import { SingletonRouter, withRouter } from "next/router";
import * as React from "react";
import { Mutation } from "react-apollo";
import { Button, Confirm, Popup } from "semantic-ui-react";
import { GET_JOB_WITH_DETAILS } from "./JobDetailGroup";
import { GET_ALL_JOBS } from "../../../pages/jobs";

interface JobDeleteButtonComponentProps {
  job: {
    id: String;
  };
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
    this.props.onConfirm(this.props.job.id);
    this.closeConfirm();
  };

  render() {
    const { confirmOpen } = this.state;

    return (
      <React.Fragment>
        <Confirm
          open={confirmOpen}
          onCancel={this.closeConfirm}
          onConfirm={this.confirm}
        />
        <Popup
          trigger={
            <Button icon={"trash"} color={"red"} onClick={this.openConfirm} />
          }
          content={"Delete job"}
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
  job: { id: String };
  router?: SingletonRouter;
}

const JobDeleteButton: React.SFC<JobDeleteButtonProps> = ({ job, router }) => (
  <Mutation
    mutation={DELETE_JOB}
    variables={{ job: job.id }}
    refetchQueries={[{ query: GET_ALL_JOBS }]}
    awaitRefetchQueries
  >
    {(deleteJob, _) => (
      <JobDeleteButtonComponent
        job={job}
        onConfirm={async () => {
          await deleteJob({ variables: { job: job.id } });
          await router.replace("/jobs");
        }}
      />
    )}
  </Mutation>
);

export default withRouter(JobDeleteButton);
