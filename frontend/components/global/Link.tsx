import Link from "next/link";
import * as React from "react";

export default ({ href, children }) => (
  <Link href={href}>
    <a>{children}</a>
  </Link>
);
