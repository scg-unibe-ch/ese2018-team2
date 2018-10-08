import Document, { Head, Main, NextScript } from "next/document";
import NavBar from "../components/navbar/NavBar";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <NavBar />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
