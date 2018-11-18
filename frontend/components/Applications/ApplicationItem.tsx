import * as React from "react";
import {Button, Card, Grid} from "semantic-ui-react";
import Link from "next/link";

interface Application {
    application: {
        id: string;
        state: string;
        job: {
            id: string;
            title: string;
            description: string;
        };
        user: {
            id: string;
            firstname: string;
            lastname: string;
            email: string;
        };
    };
}

const ApplicationItem: React.SFC<Application> = ({application}) => (
    <Card fluid>
        <Card.Content>
            <Grid columns={4}>
                <Grid.Row>
                    <Grid.Column><Card.Header as="h3" content={application.job.title}/></Grid.Column>
                    <Grid.Column><Card.Meta content={application.state}/></Grid.Column>
                    <Grid.Column><Card.Description>State change date to implement on DB</Card.Description></Grid.Column>
                    <Grid.Column>
                        <Card.Description>
                            <Link href={{ pathname: "/applications/detail", query: { id: application.id } }}>
                                <Button as="a" compact icon={"right arrow"} floated={"right"} size="huge"/>
                            </Link>
                            Button should route to Application details
                        </Card.Description>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Card.Content>
    </Card>

);

export default ApplicationItem;
