import React from "react";
import { Menu } from "semantic-ui-react";
import { SingletonRouter, withRouter } from "next/router";
import { Link, matchPath, Router } from "../../../lib/routes";
import { match } from "minimatch";

interface NavigationProperties {
  router?: SingletonRouter;
}

class Navigation extends React.Component<NavigationProperties> {
  state = {};

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick = (e, name) => {
    e.preventDefault();
    console.log(name + " clicked");
  };

  render() {
    return (
      <Menu fluid widths={6}>
        <Link href={"/"} onClick={e => this.handleItemClick(e, "home")}>
          <Menu.Item
            as="a"
            href="/"
            name="home"
            active={this.props.router.asPath === "/"}
          >
            Home
          </Menu.Item>
        </Link>
        <Link href={"/jobs"}>
          <Menu.Item
            as="a"
            href="/jobs"
            name="jobs"
            active={this.props.router.asPath === "/jobs"}
            onClick={e => this.handleItemClick(e, "jobs")}
          >
            Jobs
          </Menu.Item>
        </Link>
        <Link href={"/jobdetails"}>
          <Menu.Item
            as="a"
            href="/jobdetails"
            name="home"
            active={this.props.router.asPath === "/jobdetails"}
            onClick={e => this.handleItemClick(e, "jobdetails")}
          >
            Jobdetails
          </Menu.Item>
        </Link>
      </Menu>
    );
  }
}

const NavBar = withRouter(Navigation);

export default NavBar;
