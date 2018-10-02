import Link from "next/link";
import * as React from "react";

export default ({ href, children }) => (
  <div>
    <Link href={href}>
      <a>{children}</a>
    </Link>
  </div>
);
