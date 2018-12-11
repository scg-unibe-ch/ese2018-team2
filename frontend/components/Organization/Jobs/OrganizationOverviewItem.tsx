import * as React from "react";
import { Button, Checkbox, Table } from "semantic-ui-react";
import Link from "next/link";
import { ApolloError } from "apollo-boost";

interface Job {
  id: string;
  title: string;
  description: string;
  applicationCount: number;
}

interface OrganizationOverviewItemProps {
  job: Job;
  loading: boolean;
  error: ApolloError;
}

interface OrganizationOverviewItemState {
  checked: boolean;
}

class OrganizationOverviewItem extends React.Component<
  OrganizationOverviewItemProps,
  OrganizationOverviewItemState
> {
  state = {
    checked: false
  };

  render() {
    return (
      !this.props.loading && (
        <Table.Row
          onClick={e => {
            e.preventDefault();
            this.setState({ checked: !this.state.checked });
          }}
        >
          <Table.Cell collapsing>
            <Checkbox checked={this.state.checked} />
          </Table.Cell>
          <Table.Cell>{this.props.job.title}</Table.Cell>
          <Table.Cell textAlign={"center"}>
            {!this.props.error && <p>{this.props.job.applicationCount}</p>}
          </Table.Cell>
          <Table.Cell textAlign={"center"}>
            <Link href={"/org/jobs?detail=" + this.props.job.id}>
              <Button as="a" icon={"arrow right"} size="small" />
            </Link>
          </Table.Cell>
        </Table.Row>
      )
    );
  }
}

export default OrganizationOverviewItem;
