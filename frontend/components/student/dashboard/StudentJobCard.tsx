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
                <Link>
                    <Button>
                        More
                    </Button>
                </Link>
        </Card.Content>
    </Card>
);

export default StudentJobCard;
