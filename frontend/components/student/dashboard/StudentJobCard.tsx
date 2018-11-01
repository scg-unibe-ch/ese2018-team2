import {Button, Card} from "semantic-ui-react";
import * as React from "react";
import {SingletonRouter} from "next/router";
import Link from "next/link";

interface StudentJobCardProps {
    router?: SingletonRouter,
    job: {
        id: string,
        title: string,
        description: string
    }
}


const StudentJobCard: React.SFC<StudentJobCardProps> = ({router, job}) => (
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

export default StudentJobCard;
