import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class NavBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const activeItem = this.state;

    return (
      <Menu fluid widths={3}>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="joblist"
          active={activeItem === "joblist"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="jobdetails"
          active={activeItem === "jobdetails"}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
