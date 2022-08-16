import React, { Component } from "react";

class NavItem extends Component {
  activeClass = "active";
  inactiveClass = "";

  render() {
    return <React.Fragment>{this.determineNavItem(this.props.navItem.themeToggle)}</React.Fragment>;
  }

  navigationItemClicked = ({ target }) => {
    this.props.onChangeNavItemToActive(target);
  };

  itemIsActive = (name) => {
    if (this.props.activeItem?.id === name) return this.activeClass;
    else return this.inactiveClass;
  };

  determineNavItem = (isColorSchemeToggle) => {
    // return a normal navigation item if not a color scheme toggle
    if (!isColorSchemeToggle)
      return (
        <li
          onClick={this.navigationItemClicked}
          id={this.props.navItem.name}
          className={`nav-item ${this.itemIsActive(this.props.navItem.name)}`}
        >
          {this.props.navItem.name}
        </li>
      );
    else
      return (
        <li onClick={this.props.onToggleDarkMode} className="nav-item color-scheme-toggle noSelect">
          <div className="switch"></div>
        </li>
      );
  };
}

export default NavItem;
