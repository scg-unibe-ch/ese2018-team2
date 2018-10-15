import React from "react";
import { Menu } from "semantic-ui-react";
import { SingletonRouter, withRouter } from "next/router";
import { Link } from "../../../lib/routes";

interface NavigationProperties {
  router?: SingletonRouter;
}

class Navigation extends React.Component<NavigationProperties> {
  render() {
    return (
      <Menu fluid widths={6}>
        <Link route={"/"} passHref>
          <Menu.Item as="a" active={this.props.router.asPath === "/"}>
            Home
          </Menu.Item>
        </Link>
        <Link route={"/jobs"} passHref>
          <Menu.Item as="a" active={this.props.router.asPath === "/jobs"}>
            Jobs
          </Menu.Item>
        </Link>
        <Link route={"/jobdetails"} passHref>
          <Menu.Item
            as="a"
            name="home"
            active={this.props.router.asPath === "/jobdetails"}
          >
            Jobdetails
          </Menu.Item>
        </Link>
      </Menu>
    );
  }
}

// @ts-ignore
export default withRouter(Navigation);
