import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import Router from "next/router";

export default class NavBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    Router.push(this.getPageName(name));
  };

  getPageName(name) {
    if (name === "home") {
      return "/index";
    }
    if (name === "joblist") {
      return "/joblist";
    }
    if (name === "jobdetails") {
      return "/jobdetails";
    } else {
      return "#";
    }
  }
  render() {
    const activeItem = this.state;

    return (
      <Menu fluid widths={6}>
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
