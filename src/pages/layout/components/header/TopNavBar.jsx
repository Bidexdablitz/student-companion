import React, { Component } from "react";
import Navigation from "./Navigation";

class TopNavBar extends Component {
  state = {};

  render() {
    return (
      <header className="top-header transparent-bg container">
        <div className="logo">logo</div>
        <Navigation
          onToggleDarkMode={this.props.onToggleDarkMode}
          updateWindowDimensions={this.props.updateWindowDimensions}
          mobileNavState={this.props.mobileNavState}
          appState={this.props.appState}
        />
        <div className="hamburger" onClick={this.props.onToggleNavigation}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <div className="mobile-navigation-window-overlay" />
      </header>
    );
  }
}

export default TopNavBar;
