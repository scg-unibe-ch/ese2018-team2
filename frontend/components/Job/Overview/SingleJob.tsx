import React from "react";
import {
  Button,
  Header,
  List,
  Message,
  TransitionablePortal,
  Loader
} from "semantic-ui-react";
import { withMe, WithMeProps } from "../../../lib/withMe";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { GET_ALL_USER_APPLICATIONS } from "../../Applications/ApplicationList";

interface Job {
  id: string;
  title: string;
  organization: {
    id: string;
    name: string;
    email: string;
  };
}

interface ApplyButtonComponentProps {
  id?: string;
}
interface ApplyButtonComponentState {
  finished: boolean;
  applied: boolean;
}

const apply_mutation = gql`
  mutation apply($id: String!) {
    applyForJob(jobId: $id)
  }
`;

class ApplyButtonComponent extends React.Component<
  ApplyButtonComponentProps,
  ApplyButtonComponentState
> {
  state = {
    finished: false,
    applied: false
  };

  apply = () => {
    this.setState({ finished: true, applied: true });
    setTimeout(() => {
      this.setState({ ...this.state, finished: false });
    }, 3000);
  };

  render() {
    return (
      <React.Fragment>
        <TransitionablePortal
          open={this.state.finished}
          transition={{ animation: "slide down", duration: 100 }}
        >
          <Message positive content={"Bewerbung wurde gesendet"} />
        </TransitionablePortal>
        <Mutation
          mutation={apply_mutation}
          variables={{ id: this.props.id }}
          refetchQueries={() => [{ query: GET_ALL_USER_APPLICATIONS }]}
          awaitRefetchQueries
        >
          {(mutation, { loading }) => (
            <Button
              disabled={this.state.applied}
              color={"green"}
              onClick={async () => {
                const result = await mutation({
                  variables: { id: this.props.id }
                });
                if (result) {
                  this.apply();
                }
              }}
            >
              {loading && <Loader size={"small"} active={loading} />}
              {!loading && "Bewerben"}
            </Button>
          )}
        </Mutation>
      </React.Fragment>
    );
  }
}

interface ApplyButtonProps extends WithMeProps {
  id?: string;
}

const ApplyButton: React.SFC<ApplyButtonProps> = withMe(({ me, id }) => (
  <React.Fragment>{me && <ApplyButtonComponent id={id} />}</React.Fragment>
));

interface SingleJobComponentProps {
  job?: Job;
}

const SingleJobComponent: React.SFC<SingleJobComponentProps> = ({ job }) => (
  <React.Fragment>
    {!job && <Message error content={"Kein Job gefunden."} />}
    {job && (
      <React.Fragment>
        <Header as={"h2"}>{job.title}</Header>
        <Header as={"h3"}>{job.organization.name}</Header>
        <List>
          <List.Item>
            <List.Icon name="mail" />
            <List.Content>
              <a href={`mailto:${job.organization.email}`}>
                {job.organization.email}
              </a>
            </List.Content>
          </List.Item>
        </List>
        <ApplyButton id={job && job.id} />
      </React.Fragment>
    )}
  </React.Fragment>
);

export default SingleJobComponent;
