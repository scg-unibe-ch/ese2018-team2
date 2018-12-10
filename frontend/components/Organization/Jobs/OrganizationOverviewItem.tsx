import * as React from "react";
import { Button, Table, Header, Checkbox } from "semantic-ui-react";
import Router from "next/router";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloError } from "apollo-boost";
import { useState } from "react";

interface Job {
  id: string;
  title: string;
  description: string;
  salary: number;
}

interface OrganizationOverviewItemProps {
  job: Job;
}

interface OrganizationOverviewItemComponentProps {
  job: Job;
  data: any;
  loading: boolean;
  error: ApolloError;
}

interface OrganizationOverviewItemComponentState {
  checked: boolean;
}

class OrganizationOverviewItemComponent extends React.Component<
  OrganizationOverviewItemComponentProps,
  OrganizationOverviewItemComponentState
> {
  state = {
    checked: false
  };

  render() {
    return (
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
          {!this.props.error &&
            !!this.props.data.applicationsForJob && (
              <p>{this.props.data.applicationsForJob.length}</p>
            )}
          {!this.props.error && !this.props.data.applicationsForJob && 0}
        </Table.Cell>
        <Table.Cell textAlign={"center"}>
          <Link href={"/org/jobs?id=" + this.props.job.id}>
            <Button as="a" icon={"arrow right"} size="small" />
          </Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

const GET_JOB_APPLICATIONS = gql`
  query GetJobAppliactions($jobId: String!) {
    applicationsForJob(jobId: $jobId) {
      id
      state
    }
  }
`;

class OrganizationOverviewItem extends React.Component<
  OrganizationOverviewItemProps
> {
  render() {
    return (
      <Query
        query={GET_JOB_APPLICATIONS}
        variables={{ jobId: this.props.job.id }}
      >
        {({ loading, error, data }) =>
          !loading && (
            <OrganizationOverviewItemComponent
              job={this.props.job}
              data={data}
              loading={loading}
              error={error}
            />
          )
        }
      </Query>
    );
  }
}

export default OrganizationOverviewItem;
