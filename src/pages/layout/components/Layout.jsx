import React, { Component } from "react";
import TopNavBar from "./header/TopNavBar";
import { Outlet } from "react-router-dom";

class Layout extends Component {
  navNotVisible = "close";
  navIsVisible = "";
  constructor() {
    super();
    this.state = {
      mobileNavState: this.navNotVisible,
    };
  }
  render() {
    return (
      <div onClick={this.LayoutGotClicked}>
        <TopNavBar
          onToggleNavigation={this.onToggleNavigation}
          onToggleDarkMode={this.props.onToggleDarkMode}
          updateWindowDimensions={this.props.updateWindowDimensions}
          mobileNavState={this.state.mobileNavState}
          appState={this.props.appState}
        />
        <Outlet />
      </div>
    );
  }

  LayoutGotClicked = ({ target }) => {
    let { state, navIsVisible, navNotVisible } = this;
    // close mobile navigation if user clicks outiside the navigation bar
    if (state.mobileNavState === navIsVisible) {
      if (!target.matches(".top-navigation, .top-navigation *")) {
        let newState = { ...state, mobileNavState: navNotVisible };
        this.setState(newState);
      }
    }
  };
  onToggleNavigation = () => {
    let { state, navIsVisible, navNotVisible } = this;
    let newState = {
      ...state,
      mobileNavState: state.mobileNavState === navNotVisible ? navIsVisible : navNotVisible,
    };
    this.setState(newState);
  };
}

export default Layout;
