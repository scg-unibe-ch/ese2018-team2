import React from "react";
import { Menu } from "semantic-ui-react";
import { SingletonRouter, withRouter } from "next/router";
import Link from "next/link";

interface NavigationProperties {
  router?: SingletonRouter;
}

class Navigation extends React.Component<NavigationProperties> {
  render() {
    return (
      <Menu fluid widths={6}>
        <Link href={"/"}>
          <Menu.Item as="a" active={this.props.router.asPath === "/"}>
            Home
          </Menu.Item>
        </Link>
        <Link href={"/jobs"}>
          <Menu.Item as="a" active={this.props.router.asPath === "/jobs"}>
            Jobs
          </Menu.Item>
        </Link>
      </Menu>
    );
  }
}

// @ts-ignore
export default withRouter(Navigation);
