import React from "react";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "next/router";
import JobDeleteButton from "./JobDeleteButton";
import OrgJobBreadcrumb from "./OrgJobBreadcrumb";
import JobForm from "./JobForm";

export const GET_JOB = gql`
  query GetJob($id: String!) {
    job(id: $id) {
      id
      title
      description
      applied
    }
  }
`;

const DetailComponent = ({ router }) => (
  <React.Fragment>
    <Container>
      <OrgJobBreadcrumb/>
      <Query query={GET_JOB} variables={{ id: router.query.detail }}>
        {({ loading, error, data }) => (
          <Segment basic loading={loading}>
            {error && <p>{error.message}</p>}
            {!error && (
              <React.Fragment>
                <Segment attached="top">
                  <Header>
                    {data.job &&
                    data.job.description}
                  </Header>
                </Segment>
                <Segment attached>
                  {data.job && (
                    <JobForm job={data.job}/>
                  )}
                </Segment>
                <Segment basic>
                  <Button color="green" type="submit">
                    Save
                  </Button>
                  <JobDeleteButton
                    jobId={router.query.detail}
                  />
                </Segment>
              </React.Fragment>
            )}
          </Segment>
        )}
      </Query>
    </Container>
  </React.Fragment>
);

export default withRouter(DetailComponent);
