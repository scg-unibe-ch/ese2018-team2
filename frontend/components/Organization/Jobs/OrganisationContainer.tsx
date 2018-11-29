import { Button, Container, Header, Segment, Table } from "semantic-ui-react";
import * as React from "react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
}

interface Organisation {
  id: string;
  name: string;
  jobs: Job[];
}

interface OrganisationContainerProps {
  org: Organisation;
}

const OrganisationContainer: React.SFC<OrganisationContainerProps> = ({
  org
}) => (
  <Container>
    <Header as="h3" attached="top" block>
      {org.name}
    </Header>
    <Segment attached>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Jobtitel</Table.HeaderCell>
            <Table.HeaderCell>
              <Link href={"/org/jobs/create"}>
                <Button as="a" icon={"plus"} floated="right" />
              </Link>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {org.jobs.map(job => (
            <Table.Row key={job.id}>
              <Table.Cell>{job.title}</Table.Cell>
              <Table.Cell />
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  </Container>
);

export default OrganisationContainer;
