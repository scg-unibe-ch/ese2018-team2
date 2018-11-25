import * as React from "react"
import {Container, Dropdown, Icon, Loader, Segment} from "semantic-ui-react"
import gql from "graphql-tag";
import {Query} from "react-apollo";

interface UserActionsDropdownProps {
    loading: boolean;
    firstname: string;
    lastname: string;
}

class UserActionsDropdownComponent extends React.Component<UserActionsDropdownProps> {

    render() {
        const trigger = (
                <React.Fragment>
                    <Icon name={"user"}/>Hello {this.props.firstname}
                </React.Fragment>
        );

        const options = [
            {
                key: 'user',
                text: (
                    <span>
        Signed in as <strong>{this.props.firstname} {this.props.lastname}</strong>
      </span>
                ),
                disabled: true,
            },
            {key: 'profile', text: 'Your Profile'},
            {key: 'bookmarks', text: 'Bookmarks'},
            {key: 'job-applications', text: 'Job Applications'},
            {key: 'my-activity', text: 'Activity'},
            {key: 'help', text: 'Help'},
            {key: 'settings', text: 'Settings'},
            {key: 'log-out', text: 'Log Out'},
        ];

        return (
            <Segment>
                <Loader active={this.props.loading} inline/>
                {!this.props.loading &&
                <Dropdown trigger={trigger} options={options}pointing='top right' />
                }
            </Segment>
        );
    }
}

const ME_FIRSTNAME = gql`
  query MeFirstname {
    me {
      id
      firstname
      lastname
    }
  }
`


export default () => (
    <Query query={ME_FIRSTNAME}>
        {
            ({loading, data}) => (
                <UserActionsDropdownComponent
                    loading={loading}
                    firstname={loading ? "" : data.me.firstname}
                    lastname={loading ? "" : data.me.lastname}/>)
        }
    </Query>
)