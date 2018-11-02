import {Button, Card, Header, Loader} from "semantic-ui-react";
import * as React from "react";
import {SingletonRouter} from "next/router";
import Link from "next/link";
import ApolloError from 'apollo-boost';

interface StudentJobCardProps {
    router?: SingletonRouter,
    job: {
        id: string,
        title: string,
        description: string
    },
    loading: boolean,
    error: ApolloError;
}


const StudentJobCard: React.SFC<StudentJobCardProps> = ({router, job, loading, error}) => {

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
                <Card.Description>
                    {job.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                    <Button icon="star"/>
                    <Link href={{pathname: "/jobs/detail", query: {id: job.id}}}>
                        <Button icon="eye"/>
                    </Link>
                </div>
            </Card.Content>
        </Card>
    );
};

export default StudentJobCard;
