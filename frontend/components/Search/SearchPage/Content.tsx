import { ApolloClient } from "apollo-boost";
import gql from "graphql-tag";
import { SingletonRouter, withRouter } from "next/router";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React from "react";
import { ApolloConsumer } from "react-apollo";
import { Divider, Form, Grid, Header, Search } from "semantic-ui-react";
import JobCardGrid from "./JobCardGrid";
import { SEARCH } from "./__generated__/SEARCH";

const query = gql`
  query SEARCH($search: String, $minSalary: Float, $maxSalary: Float) {
    search(search: $search, minSalary: $minSalary, maxSalary: $maxSalary) {
      nodes {
        id
        title
        salary
        description
      }
      aggregations {
        id
        value
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
    minSalary?: number;
    maxSalary?: number;
  }
> {
  state = {
    loading: false,
    minSalary: null,
    maxSalary: null,
    data: []
  };

  search = async () => {

    const { search, sMin, sMax } = this.props.router.query;

    this.setState({ loading: true, data: [] });
    // TODO error handling
    const data = await this.props.client.query({
      query: query,
      variables: {
        search: search,
        minSalary: sMin&&parseFloat(sMin as string),
        maxSalary: sMax&&parseFloat(sMax as string)
      }
    });

    const nodes = (data.data as SEARCH).search.nodes;

    const aggregations = (data.data as SEARCH).search.aggregations.reduce(
      (acc, e) => ({ ...acc, [e.id]: parseFloat(e.value) }),
      {}
    );

    this.setState({ loading: false, data: nodes, ...aggregations });
  };

  async componentDidMount() {
    await (async () => {
      if (this.props.router.query.search) {
        this.setState({ loading: true, data: [] });
        // TODO error handling
        const data = await this.props.client.query({
          query: query,
          variables: { search: this.props.router.query.search }
        });

        const nodes = (data.data as SEARCH).search.nodes;

        const aggregations = (data.data as SEARCH).search.aggregations.reduce(
          (acc, e) => ({ ...acc, [e.id]: parseFloat(e.value) }),
          {}
        );

        this.setState({ loading: false, data: nodes, ...aggregations });
      }
    })();
  }

  render() {
    const Range = Slider.createSliderWithTooltip(Slider.Range);

    const { router, client } = this.props;

    const { search, sMin, sMax } = router.query;

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
              const aggregations = (data.data as SEARCH).search.aggregations;
              this.setState({ loading: false, data: nodes, ...aggregations });
              console.log(this.state);
            }}
          >
            <Search
              required
              defaultValue={search as string}
              input={{ fluid: true, name: "search" }}
              showNoResults={false}
            />
          </Form>
          <Divider />
          <Header as={"h3"}>Lohn</Header>
          <Range
            min={this.state.minSalary!! || 0}
            max={this.state.maxSalary!! || 100}
            defaultValue={[sMin || 0, sMax || 100]}
            allowCross={false}
            onAfterChange={async value => {
              const [min, max] = value;
              await router.replace({
                pathname: "/s",
                query: {
                  search: search,
                  sMin: min,
                  sMax: max
                }
              });
              await this.search();
            }}
          />
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
