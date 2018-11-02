import StudentJobCard from "./StudentJobCard";
import * as React from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import {Card, Header, Loader, Segment} from "semantic-ui-react";
import {ApolloError} from "apollo-boost";

export const GET_RECOMMENDED_JOBS = gql`
  query RecommendedJobs {
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

interface RecommendedJobsProps {
    loading: boolean;
    error: ApolloError;
    data: AllJobs;
}


const RecommendedJobs: React.SFC<RecommendedJobsProps> = ({loading, error, data}) => {

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
                    <Card><Header as="h3">Ooops</Header></Card>
                    <Card><Header as="h3">Ooops</Header></Card>
                    <Card><Header as="h3">Ooops</Header></Card>
                </Card.Group>
            </Segment>
        )
    }

    return (
        <Segment>
            <Header as="h3">Recommended Jobs</Header>
            <Card.Group itemsPerRow={3} centered>
                {data.jobs.map(job => (
                    <StudentJobCard key={job.id} job={job}/>
                ))}
            </Card.Group>
        </Segment>
    );
};

export default () => (
    <Query query={GET_RECOMMENDED_JOBS}>
        {({loading, error, data}) => (
            <RecommendedJobs data={data} error={error} loading={loading}/>
        )}
    </Query>
);