import App, { Container } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withApollo from "../lib/withApollo";

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
        <ToastContainer
          hideProgressBar
          autoClose={2500}
          style={{ marginTop: "120px" }}
        />
        <ApolloProvider client={apollo}>
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApollo(MyApp);
