import {SingletonRouter} from "next/router";
import * as React from "react";
import {Header, Segment} from "semantic-ui-react";
import withAuthorization from "../../Auth/withAuthorization";
import { ApolloError } from "apollo-boost";

interface StudentWatchingProps {
    router?: SingletonRouter;
    loading: boolean;
    error: ApolloError;
    data: AllJobs;

}

const StudentWatching: React.SFC<StudentWatchingProps> = () => {
    return (
        <Segment>
            <Header>Watching</Header>
    </Segment>
);
};

export default withAuthorization(StudentWatching);