import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import Link from "../global/Link";

export default () => (
  <div>
    <Link href={"/index"}>Home</Link>
    <Link href={"/joblist"}>Job List</Link>
    <Link href={"/jobdetails"}>Job Details</Link>
  </div>
);
