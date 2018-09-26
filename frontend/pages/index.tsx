import * as React from "react";

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
  <div>
    <h1>De beschte Team</h1>
    <ul>
      {team.map(teammate => (
        <li key={teammate.id}>{`${teammate.name} has id ${teammate.id}`}</li>
      ))}
    </ul>
    <p>
      <strong>Hallo</strong>
    </p>
  </div>
);
