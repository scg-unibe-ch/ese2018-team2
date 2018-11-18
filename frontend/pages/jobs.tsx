import {ApolloError} from "apollo-boost";
import gql from "graphql-tag";
import React from "react";
import {Query} from "react-apollo";
import "semantic-ui-css/semantic.min.css";
import {Button, Container, Header, Item, Segment} from "semantic-ui-react";
import JobItem from "../components/joblist/JobItem";
import NavBar from "../components/layout/header/NavBar";
import Link from "next/link";

export const GET_ALL_JOBS = gql`
  query AllJobs {
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

interface AllJobs {
    jobs: {
        id: string;
        title: string;
        description: string;
        organization: { id: string; name };
    }[];
}

interface JobPageProps {
    loading: boolean;
    error: ApolloError;
    data: AllJobs;
}

export const JobPage: React.SFC<JobPageProps> = ({loading, error, data}) => {
    // TODO: handle loading
    if (loading) {
        return <p>Loading</p>;
    }

    // TODO: handle error
    if (error) {

        return <p>error.message</p>;
    }

    return (
        <React.Fragment>
            <NavBar/>
            <Container>
                <Segment>
                    <Header as={"h1"} dividing>
                        Jobs
                    </Header>

                    <Link href={"/jobs/create"} passHref>
                        <Button icon={"plus"} as={"a"}/>
                    </Link>

                    <Item.Group divided>
                        {data.jobs.map(job => (
                            <JobItem key={job.id} job={job}/>
                        ))}
                    </Item.Group>
                </Segment>
            </Container>
        </React.Fragment>
    );
};

export default () => (
    <React.Fragment>
        <Query query={GET_ALL_JOBS}>
            {({loading, error, data}) => (
                <JobPage data={data} error={error} loading={loading}/>
            )}
        </Query>
    </React.Fragment>
);
