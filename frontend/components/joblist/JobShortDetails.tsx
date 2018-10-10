import * as React from "react";
import { Button, Grid, Header, List } from "semantic-ui-react";
import { withRouter } from "next/router";

const ShortJob = ({ router, href, job }) => {
  const handleClick = e => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <div>
      <Header as={"h1"}>{job.title}</Header>
      <Button.Group floated={"right"}>
        <Button icon={"edit"} onClick={() => alert("Work in Progress")} />
        <Button icon={"trash"} onClick={() => alert("Work in Progress")} />
      </Button.Group>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <h4>Company:</h4>
          </Grid.Column>
          <Grid.Column width={8}>
            <h4>{job.employer.name}</h4>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={4}>
            <h4>Description:</h4>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>{job.description}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <h4>Required skills:</h4>
          </Grid.Column>
          <Grid.Column width={8}>
            <List bulleted>
              {job.skills.map(skill => (
                <List.Item key={skill}>{skill}</List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <h4>Salary:</h4>
          </Grid.Column>
          <Grid.Column width={8}>
            <p>{job.salary + "0 CHF/Hr"}</p>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={12}>
            <a onClick={handleClick}>
              <h3>details...</h3>
            </a>
          </Grid.Column>
          <Grid.Column width={4}>
            <Button
              size={"big"}
              floated="right"
              onClick={() => alert("Work in Progress")}
            >
              Apply
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default withRouter(ShortJob);
