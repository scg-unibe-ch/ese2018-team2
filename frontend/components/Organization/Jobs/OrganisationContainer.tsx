import { Segment, Container, Header, Table } from "semantic-ui-react";

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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {org.jobs.map(job => (
            <Table.Row key={job.id}>
              <Table.Cell>{job.title}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  </Container>
);

export default OrganisationContainer;
