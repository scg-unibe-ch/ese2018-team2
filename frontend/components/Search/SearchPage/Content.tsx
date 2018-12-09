import { ApolloClient } from "apollo-boost";
import gql from "graphql-tag";
import { SingletonRouter, withRouter } from "next/router";
import React from "react";
import { ApolloConsumer } from "react-apollo";
import { Accordion, Divider, Form, Grid, Search } from "semantic-ui-react";
import JobCardGrid from "./JobCardGrid";
import { SEARCH } from "./__generated__/SEARCH";

const query = gql`
  query SEARCH($search: String) {
    search(search: $search) {
      nodes {
        id
        title
        description
      }
    }
  }
`;

interface ContentComponentProps {
  router?: SingletonRouter;
  client: ApolloClient<any>;
}

class ContentComponent extends React.Component<
  ContentComponentProps,
  {
    loading: boolean;
    data: { id: string; title: string; description: string }[];
  }
> {
  state = {
    loading: false,
    data: []
  };

  componentDidMount() {
    (async () => {
      if (this.props.router.query.search) {
        this.setState({ loading: true, data: [] });
        // TODO error handling
        const data = await this.props.client.query({
          query: query,
          variables: { search: this.props.router.query.search }
        });

        const nodes = (data.data as SEARCH).search.nodes;
        this.setState({ loading: false, data: nodes });
      }
    })();
  }

  render() {
    const panels = [
      {
        key: "salary",
        title: "Salär",
        content: {
          content: <p>Salär</p>
        }
      }
    ];

    const { router, client } = this.props;

    const { search } = router.query;

    return (
      <Grid columns={2} stackable padded={"horizontally"}>
        <Grid.Column width={4}>
          <Form
            onSubmit={async e => {
              e.preventDefault();
              //@ts-ignore
              const formData = new FormData(e.target);
              this.setState({ loading: true, data: [] });
              // TODO error handling
              const data = await client.query({
                query: query,
                variables: { search: formData.get("search") }
              });

              await router.replace({
                pathname: "/s",
                query: {
                  search: formData.get("search")
                }
              });

              const nodes = (data.data as SEARCH).search.nodes;
              this.setState({ loading: false, data: nodes });
            }}
          >
            <Search
              defaultValue={search as string}
              input={{ fluid: true, name: "search" }}
              showNoResults={false}
            />
          </Form>
          <Divider />
          <Accordion exclusive panels={panels} />
        </Grid.Column>
        <Grid.Column width={12}>
          <JobCardGrid loading={this.state.loading} data={this.state.data} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(({ router }) => (
  <ApolloConsumer>
    {client => <ContentComponent router={router} client={client} />}
  </ApolloConsumer>
));
