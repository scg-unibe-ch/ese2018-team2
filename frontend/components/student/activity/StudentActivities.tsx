import {SingletonRouter} from "next/router";
import * as React from "react";
import {Header, Segment} from "semantic-ui-react";
import withAuthorization from "../../Auth/withAuthorization";
import { ApolloError } from "apollo-boost";

interface StudentActivitiesProps {
    router?: SingletonRouter;
    loading: boolean;
    error: ApolloError;
    data: AllJobs;

}

const StudentActivities: React.SFC<StudentActivitiesProps> = () => {
    return (
        <Segment>
            <Header>My Activities</Header>
        </Segment>
    );
};

export default withAuthorization(StudentActivities);