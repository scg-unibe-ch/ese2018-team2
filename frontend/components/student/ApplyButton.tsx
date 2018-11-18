import gql from "graphql-tag";
import {SingletonRouter, withRouter} from "next/router";
import * as React from "react";
import {Mutation} from "react-apollo";
import {Button, Icon} from "semantic-ui-react";


const APPLY = gql`
  mutation Apply($jobId: String!) {
    applyForJob(jobId: $jobId)
  }
`;

interface ApplyButtonProps {
    jobId: String;
    router?: SingletonRouter;
}

const ApplyButton: React.SFC<ApplyButtonProps> = ({jobId, router}) => (
    <Mutation mutation={APPLY}>
        {(apply, _) => (
            <Button floated="right"
                    icon
                    labelPosition='right'
                    color={"green"}
                    onClick={async (e) => {
                        e.preventDefault();
                        await apply({variables: {jobId: jobId}});
                        await router.push("/dashboard");
                    }
                    }
            >Apply
                <Icon name="arrow right"/>
            </Button>
        )}
    </Mutation>
);

export default withRouter(ApplyButton);
