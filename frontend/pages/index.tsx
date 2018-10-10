import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Container, List } from "semantic-ui-react";
import NavBar from "../components/layout/header/NavBar";
import gql from "graphql-tag";
import { Query } from "react-apollo";

/*interface User {
  id: number;
  name: string;
}*/

/*const team: Array<User> = [
  {
    id: 1,
    name: "Fabio"
  },
  {
    id: 2,
    name: "Luca"
  },
  {
    id: 3,
    name: "Berivan ❤️"
  },
  {
    id: 4,
    name: "Yannik"
  }
];*/

const query = gql`

query GetJobs {
  jobs {
    id
    title
  }
}

`;

export default () => (
  <div>
    <NavBar />
    <Container text>
      <h1>De beschte Team</h1>

      <Query query={query}>
        {
          ({ loading, error, data}) => {
            if (loading) {
              return <div>Loading</div>
            }

            if (error) {
              return <div>error</div>
            }

            return (
              <List>
                {
                  data.jobs.map((job) => (<List.Item key={job.id}>{job.title}</List.Item>))
                }
              </List>
            )
          }
        }
      </Query>
      <p>
        Hello
      </p>
      <Button>Klicken</Button>
    </Container>
  </div>
);
