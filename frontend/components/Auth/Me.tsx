import * as React from "react"
import { Header, Loader } from "semantic-ui-react"
import gql from "graphql-tag";
import { Query } from "react-apollo";

interface MeComponentProps {
  loading: boolean
  firstname: string
}

const MeComponent: React.SFC<MeComponentProps> = ({ loading, firstname }) => (
  <React.Fragment>
    <Loader active={loading} inline />
    {!loading&&<Header as={"h2"}>Hello {firstname}</Header>}
  </React.Fragment>
);

const ME_FIRSTNAME = gql`
  query MeFirstname {
    me {
      id
      firstname
    }
  }
`


export default () => (
  <Query query={ME_FIRSTNAME}>
  {
    ({ loading, data }) => (<MeComponent loading={loading} firstname={loading?"":data.me.firstname}/>)
  }
  </Query>
)