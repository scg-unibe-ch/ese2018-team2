import * as React from "react";
import {Card, Header, Loader} from "semantic-ui-react";
import ApolloError from 'apollo-boost'

interface StudentActivitiesProps {
    job: {
        id: string,
        title: string,
        description: string
        organisation: {
            id: string,
            name: string
        }
    },
    loading: boolean,
    error: ApolloError
}

const StudentActivity: React.SFC<StudentActivitiesProps> = ({job, loading, error}) => {

    if (loading) {
        return (
            <Card>
                <Loader/>
            </Card>
        );
    }
    if (error) {
        return (
            <Card>
                <Header as="h3">Ooops</Header>
            </Card>
        );
    }

    return (
        <Card>
            <Card.Content>
                <Card.Header>{job.title}</Card.Header>
                <Card.Meta>{job.description}</Card.Meta>
            </Card.Content>
        </Card>
    );
};

export default StudentActivity;