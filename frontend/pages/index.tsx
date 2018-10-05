import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, List } from "semantic-ui-react";
import Layout from "../components/layout/Layout";

interface User {
  id: number;
  name: string;
}

const team: Array<User> = [
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
];

export default () => (
  <Layout>
    <h1>De beschte Team</h1>
    <List>
      {team.map(teammate => (
        <List.Item key={teammate.id}>
          <List.Icon name="heart" size="large" verticalAlign="middle" />
          <List.Content>
            {`${teammate.name} has id ${teammate.id}`}
          </List.Content>
        </List.Item>
      ))}
    </List>
    <Button>Klicken</Button>
  </Layout>
);
