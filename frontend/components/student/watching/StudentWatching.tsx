import * as React from "react";
import {Card, Header, Loader, Segment} from "semantic-ui-react";
import {ApolloError} from "apollo-boost";
import {Query} from "react-apollo";
import StudentJobCard from "../StudentJobCard";
import gql from "graphql-tag";

interface WatchingJobs {
    jobs: {
        id: string;
        name: string;
        description: string;
        organisation: {
            id: string;
            name: string
        }
    }[];
}

interface StudentWatchingProps {
    loading: boolean;
    error: ApolloError;
    data: WatchingJobs
}

const GET_WATCHING_JOBS = gql`
query WatchingJobs {
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

const StudentWatching: React.SFC<StudentWatchingProps> = ({data, error, loading}) => {

    if (loading) {
        return (
            <Segment>
                <Header as="h3">Watching</Header>
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
                <Header as="h3">Watching</Header>
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
            <Header>Watching</Header>
            <Card.Group itemsPerRow={3} centered>
                {data.jobs.map(job => (
                    <StudentJobCard key={job.id} job={job} loading={loading}/>
                ))}
            </Card.Group>
        </Segment>
    );
};


export default () => (
    <Query query={GET_WATCHING_JOBS}>
        {({loading, error, data}) => (
            <StudentWatching data={data} error={error} loading={loading}/>
        )}
    </Query>
);
