import React from "react";
import { Menu } from "semantic-ui-react";
import { SingletonRouter, withRouter } from "next/router";
import { Link, Router, matchPath } from "../../../lib/routes";
import { triggerAsyncId } from "async_hooks";

interface NavigationProperties {
  router?: SingletonRouter;
}

const NavLink = ({ route, label, params }) => {
  return (
    <Link exact route={route} params={params}>
      {label}
    </Link>
  );
};

const Navigation: React.SFC<NavigationProperties> = () => {
  return (
    <Menu fluid widths={6}>
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/jobs">
        Jobs
      </Menu.Item>
      <Menu.Item as={Link} to="/jobdetails">
        Jobdetails
      </Menu.Item>
    </Menu>
  );
};

const NavBar = withRouter(Navigation);

export default NavBar;
