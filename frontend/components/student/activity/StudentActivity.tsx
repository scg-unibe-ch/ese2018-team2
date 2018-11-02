import * as React from "react";
import {Card} from "semantic-ui-react";

interface StudentActivitiesProps {
    job: {
        id: string,
        title: string,
        description: string
        organisation: {
            id: string,
            name: string
        }
    };

}

const StudentActivity: React.SFC<StudentActivitiesProps> = ({job}) => {
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