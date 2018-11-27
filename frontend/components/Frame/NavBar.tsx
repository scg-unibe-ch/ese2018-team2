import Link from "next/link";
import { Button, Dropdown, Image, Menu } from "semantic-ui-react";
import { withMe, WithMeProps } from "../../lib/withMe";
import LogoutDropdownItem from "./LogoutDropdownItem";

const UserDropdownComponent: React.SFC<WithMeProps> = ({ me }) => (
  <Dropdown item text={`${me.firstname} ${me.lastname}`}>
    <Dropdown.Menu>
      <Link href={"/me"} passHref>
        <Dropdown.Item content={"Profil"} as={"a"} />
      </Link>
      <LogoutDropdownItem />
    </Dropdown.Menu>
  </Dropdown>
);

const UserDropdown = withMe(UserDropdownComponent);

const userItems = [
  <Link href={"/"} passHref key={"Jobs"}>
    <Menu.Item name={"Jobangebote"} />
  </Link>,
  <Link href={"/applications"} passHref key={"Applications"}>
    <Menu.Item name={"Bewerbungen"} as={"a"} />
  </Link>,
  <Link href={"/me"} passHref key={"Profile"}>
    <Menu.Item name={"Profil"} />
  </Link>
];

const adminItems = [
  <Menu.Item name={"Offene Jobinserate"} key={"OpenJobs"} />,
  <Menu.Item key={"Administer"}>
    <Dropdown text={"Verwalten"}>
      <Dropdown.Menu>
        <Link href="/admin/users" passHref>
          <Dropdown.Item as={"a"}>Benutzende</Dropdown.Item>
        </Link>
        <Dropdown.Item>Organizationen</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Item>
];

const orgItems = [
  <Link href={"/org/jobs"} key={"MyJobs"}>
    <Menu.Item name={"Meine Jobinserate"}>Meine Jobinserate</Menu.Item>
  </Link>
];

const NavBarComponent: React.SFC<WithMeProps> = ({ me }) => (
  <Menu size="large" stackable borderless>
    <Menu.Item key={"Logo"}>
      <Link href={"/"} passHref>
        <a>
          <Image size={"tiny"} centered src={"/static/logo.png"} />
        </a>
      </Link>
    </Menu.Item>

    {me && !me.siteAdmin && !me.hasOrganizations && userItems}

    {me && me.siteAdmin && !me.hasOrganizations && adminItems}

    {me && me.hasOrganizations && orgItems}

    <Menu.Item position={"right"} key={"Login"}>
      {!me && (
        <Link href={"/login"} passHref>
          <a>
            <Button basic color={"green"} content={"Login / Registrieren"} />
          </a>
        </Link>
      )}
      {me && <UserDropdown />}
    </Menu.Item>
  </Menu>
);

const NavBar = withMe(NavBarComponent);

export default NavBar;
