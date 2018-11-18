import {ApolloError} from "apollo-boost";
import gql from "graphql-tag";
import {Query} from "react-apollo";
import {Card, Header, Item, Segment} from "semantic-ui-react";
import * as React from "react";
import ApplicationItem from "./ApplicationItem";

interface ApplicationListComponentProps {
    loading: boolean;
    error: ApolloError;
    data: GetUserApplications;
}


class ApplicationListComponent extends React.Component<ApplicationListComponentProps> {
    static defaultProps = {
        data: {
            applications: []
        }
    };

    render() {
        if (!(this.props.data.applications === undefined)) {
            return (
                <Segment>
                    {this.props.error && <p>{this.props.error.message}</p>}
                    <Header as={"h1"} dividing>
                        Applications
                    </Header>
                    <Card.Group dividied="true">
                            {
                                this.props.data.applications
                                    .map(application => (
                                        <ApplicationItem key={application.id} application={application}/>
                                    ))
                            }
                    </Card.Group>
                </Segment>);
        } else {
            return (
                <Segment>
                    <Item.Group dividied="true">
                        <Header as={"h1"} dividing>
                            Applications asdf
                        </Header>
                        <p>No applications yet</p>
                    </Item.Group>
                </Segment>);

        }
    }
}

export const GET_ALL_USER_APPLICATIONS = gql`
query GetAllUserApplications{
    applications{
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

interface GetUserApplications {
    applications: {
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
        }
    }[];
}

const ApplicationList: React.SFC = () => {
    return (
        <Query query={GET_ALL_USER_APPLICATIONS} ssr>
            {({loading, error, data}) => (
                <ApplicationListComponent
                    loading={loading}
                    error={error}
                    data={data as GetUserApplications}
                />
            )}
        </Query>
    );
};

export default ApplicationList;
