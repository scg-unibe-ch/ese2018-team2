import * as React from "react";
import {Container, Dimmer, Header, Loader, Segment} from "semantic-ui-react";
import {Query} from "react-apollo";
import gql from "graphql-tag";

interface ApplicationDetailsComponentProps {
    loading: boolean;
    error: ApolloError;
    data: GetApplicationsWithDetails;
}

export const ApplicationDetailsComponent: React.SFC<ApplicationDetailsComponentProps> = ({loading, error, data}) => (
        <Container>
            {error && <p>error.message</p>}
            <Dimmer.Dimmable dimmed={loading}>
                    <Dimmer active={loading}>
                        <Loader active={loading}/>
                    </Dimmer>
                    <Segment.Group>
                        <Segment attached="top">
                            <Header as={"h3"}>
                                {!loading && data.applications[0].job.title}
                            </Header>
                        </Segment>
                        <Segment>{!loading && data.applications[0].job.description}</Segment>
                        <Segment attached="bottom">{!loading && data.applications[0].state}</Segment>
                    </Segment.Group>
            </Dimmer.Dimmable>
        </Container>
);

export const GET_APPLICATION = gql`
query GetAllUserApplications($id: String!){
    applications(applicationId: $id){
    id
    state
    job {
    id
    title
    description
}
    user{
    id
    firstname
    lastname
    email
}
}
}
`;

interface GetApplicationsWithDetails {
    applications: {
    id: string;
    state: string;
    job: {
    id: string;
    title: string;
    description: string;
}
    user:
{
    id: string;
    firstname: string;
    lastname: string;
    email: string;

}
}[];
}

interface ApplicationDetailsProps {
    application: string;
}

const ApplicationDetails: React.SFC<ApplicationDetailsProps> = ({application}) => {
        return (
        <Query query={GET_APPLICATION} variables={{id: application}} ssr>
        {({loading, error, data}) => {
            return (<ApplicationDetailsComponent
                loading={loading}
                error={error}
                data={data as GetApplicationsWithDetails}
            />);
        }}
        </Query>
        );
    };


        export default ApplicationDetails;
