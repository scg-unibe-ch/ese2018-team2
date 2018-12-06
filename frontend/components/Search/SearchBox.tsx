import { withRouter, WithRouterProps } from "next/router";
import * as React from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";

class SearchBoxComponent extends React.Component<WithRouterProps> {
  componentDidMount() {
    const { router } = this.props;
    router.prefetch("/s");
  }

  render() {
    const { router } = this.props;

    return (
      <Segment>
        <Header as={"h2"}>Suche nach einem Job.</Header>
        <Form
          action={"/s"}
          method={"GET"}
          onSubmit={async e => {
            e.preventDefault();
            //@ts-ignore
            const data = new FormData(e.target);
            await router.push({
              pathname: "/s",
              query: {
                search: data.get("search")
              }
            });
          }}
        >
          <Form.Field>
            <label>WAS?</label>
            <input
              type={"text"}
              placeholder={"Informatik, Lektorat..."}
              name={"search"}
            />
          </Form.Field>
          <Button type="submit" color={"green"}>
            Suche
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default withRouter(SearchBoxComponent);
