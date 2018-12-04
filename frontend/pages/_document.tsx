import Document, { Head, Main, NextScript } from "next/document";
import * as React from "react";
import "semantic-ui-css/semantic.min.css";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
