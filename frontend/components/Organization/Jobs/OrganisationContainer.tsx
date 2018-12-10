import {
  Button,
  Container,
  Header,
  Segment,
  Table,
  Icon
} from "semantic-ui-react";
import * as React from "react";
import Link from "next/link";
import OrganizationOverviewItem from "./OrganizationOverviewItem";

interface Job {
  id: string;
  title: string;
  description: string;
  salary: number;
}

interface Organisation {
  id: string;
  name: string;
  jobs: {
    id: string;
    title: string;
  };
}

interface OrganisationContainerProps {
  org: Organisation;
}

const OrganisationContainer: React.FC<OrganisationContainerProps> = ({
  org
}) => (
  <Container>
    <Header as="h3" attached="top" block>
      {org.name}
    </Header>
    <Segment attached>
      <Table selectable celled compact>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Button size="small" icon labelPosition="left">
                <Icon name="square outline" />
                Alle markieren
              </Button>
              <Button size="small" icon labelPosition="left" color="red">
                <Icon name="trash" />
                Delete
              </Button>

              <Link href={"/org/jobs/create"}>
                <Button
                  as={"a"}
                  floated="right"
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                >
                  <Icon name="add" /> Neuer Job
                </Button>
              </Link>
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Jobtitel</Table.HeaderCell>
            <Table.HeaderCell>Bewerbungen</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {org.jobs.map(job => (
            <OrganizationOverviewItem key={job.id} job={job} />
          ))}
        </Table.Body>
      </Table>
    </Segment>
  </Container>
);

export default OrganisationContainer;
