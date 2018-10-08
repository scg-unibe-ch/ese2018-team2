import React from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";
import { SingletonRouter, withRouter} from "next/router";

interface NavigationProperties {
  router?: SingletonRouter
}

const Navigation: React.SFC<NavigationProperties> = ({ router }) => (
  <Menu fluid widths={6}>
    <Link href="/">
      <Menu.Item as="a" active={router.pathname === "/"}>
        Home
      </Menu.Item>
    </Link>
    <Link href="/joblist">
      <Menu.Item as="a" active={router.pathname === "/joblist"}>
        Jobs
      </Menu.Item>
    </Link>
    <Link href="/jobdetails">
      <Menu.Item as="a" active={router.pathname === "/jobdetails"}>
        Job-Detail
      </Menu.Item>
    </Link>
  </Menu>
);

const NavBar = withRouter(Navigation);

export default NavBar;