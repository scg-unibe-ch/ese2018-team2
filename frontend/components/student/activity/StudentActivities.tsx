import {SingletonRouter} from "next/router";
import * as React from "react";
import {Card, Header, Loader, Segment} from "semantic-ui-react";
import {ApolloError} from "apollo-boost";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import StudentActivity from "./StudentActivity";
import StudentJobCard from "../StudentJobCard";


interface ActivitiesJobs {
    jobs: {
        id: string;
        title: string;
        description: string;
        organization: { id: string; name };
    }[];
}


interface StudentActivitiesProps {
    router?: SingletonRouter;
    loading: boolean;
    error: ApolloError;
    data: ActivitiesJobs;
}

export const GET_ACTIVITIES_JOBS = gql`
query StudentActivities {
    jobs {
      id
      title
      description
      organization {
        id
        name
      }
    }
  }
`;


const StudentActivities: React.SFC<StudentActivitiesProps> = ({router, loading, error, data}) => {

    if (loading) {
        return (
            <Segment>
                <Header as="h3">Recommended Jobs</Header>
                <Card.Group itemsPerRow={3} centered>
                    <Card><Loader/></Card>
                    <Card><Loader/></Card>
                    <Card><Loader/></Card>
                </Card.Group>
            </Segment>
        )
    }

    if (error) {
        return (
            <Segment>
                <Header as="h3">Recommended Jobs</Header>
                <Card.Group itemsPerRow={3} centered>
                    <Card.Header>Ooops</Card.Header>
                    <Card><Header as="h3">Ooops</Header></Card>
                    <Card><Header as="h3">Ooops</Header></Card>
                </Card.Group>
            </Segment>
        )
    }


    return (
        <Segment>
            <Header>My Activities</Header>
            <Card.Group itemsPerRow={3} centered>
                {data.jobs.map(job => (
                    <StudentActivity key={job.id} job={job}/>
                ))}
            </Card.Group>
        </Segment>
    );
};


export default () => (
    <Query query={GET_ACTIVITIES_JOBS}>
        {({loading, error, data}) => (
            <StudentActivities data={data} error={error} loading={loading}/>
        )}
    </Query>
);