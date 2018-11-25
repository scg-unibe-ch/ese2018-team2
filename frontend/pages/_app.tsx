import App, { Container } from "next/app";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import withApollo from "../lib/withApollo";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", () => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class MyApp extends App {
  render() {
    // @ts-ignore
    const { Component, pageProps, apollo } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
