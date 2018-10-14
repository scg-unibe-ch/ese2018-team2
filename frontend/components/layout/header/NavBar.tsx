import React from "react";
import { Menu } from "semantic-ui-react";
import { SingletonRouter, withRouter } from "next/router";
import { Link, matchPath, Router } from "../../../lib/routes";

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
    this.setState({ activeItem: name });
    console.log(name + " clicked");
  };

  render() {
    const activeItem = this.state;

    return (
      <Menu fluid widths={6}>
        <Link href={"/"} onClick={e => this.handleItemClick(e, "home")}>
          <Menu.Item as="a" href="/" name="home" active={activeItem === "home"}>
            Home
          </Menu.Item>
        </Link>
        <Link href={"/jobs"}>
          <Menu.Item
            as="a"
            href="/jobs"
            name="jobs"
            active={activeItem === "jobs"}
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
            active={activeItem === "jobdetails"}
            onClick={e => this.handleItemClick(e, "jobdetails")}
          >
            Home
          </Menu.Item>
        </Link>
      </Menu>
    );
  }
}

const NavBar = withRouter(Navigation);

export default NavBar;
