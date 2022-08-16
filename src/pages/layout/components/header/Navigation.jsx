import React, { Component } from "react";
import NavItem from "./NavigationItem";
import { moveSelectorToActive } from "../../../../utils/helperFunctions.js";

class Navigation extends Component {
  selectorThickness = 3;
  constructor() {
    super();
    this.state = {
      activeItem: null,
      navItems: [
        { name: "home", route: "home" },
        { name: "calculategpa", route: "gpa-calculator" },
        { name: "previoushistory", route: "gpa-calculator" },
        { name: "previoushistory1", route: "gpa-calculator" },
        { name: "previoushistory2", route: "gpa-calculator" },
        { name: "previoushistory3", route: "gpa-calculator" },
        { name: "previoushistory4", route: "gpa-calculator" },
        { name: "previoushistory5", route: "gpa-calculator" },
        { name: "previoushistory6", route: "gpa-calculator" },
        { name: "previoushistory7", route: "gpa-calculator" },
        { name: "previoushistory8", route: "gpa-calculator" },
        { name: "calculate ", route: "gpa-calculator" },
        { name: "themeToggle", themeToggle: true },
      ],
      selectorStyles: null,
    };
  }

  componentDidMount = () => {
    this.setState({ ...this.state, activeItem: document.querySelector(".nav-item") }, async () => {
      await this.setSelectorWidthAndHeight();
      this.moveSelectorToActive = moveSelectorToActive.call(this);
    });

    window.addEventListener("resize", this.setSelectorWidthAndHeight);
    window.addEventListener("resize", () => this.moveSelectorToActive(this.state.activeItem));
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.setSelectorWidthAndHeight);
    window.removeEventListener("resize", () => this.moveSelectorToActive(this.state.activeItem));
  };

  render() {
    return (
      <nav className={`top-navigation hidden-scrollbar ${this.props.mobileNavState}`}>
        <ul className="hidden-scrollbar">
          {this.state.navItems.map((navItem) => {
            return (
              <NavItem
                key={navItem.name}
                navItem={navItem}
                activeItem={this.state.activeItem}
                onToggleDarkMode={this.props.onToggleDarkMode}
                onChangeNavItemToActive={this.onChangeNavItemToActive}
              />
            );
          })}

          <div style={this.state.selectorStyles} className="selector"></div>
        </ul>
      </nav>
    );
  }

  onChangeNavItemToActive = async (clickedItem) => {
    // change the active navigation item
    this.setState({ ...this.state, activeItem: clickedItem });
    await this.setSelectorWidthAndHeight();
    this.moveSelectorToActive(clickedItem);
  };

  calculateSelectorWidthAndHeight = () => {
    let { windowWidth } = this.props.appState.windowDimensions;
    let { showHamburgerMenuBreakPoint } = this.props.appState;
    let { activeItem } = this.state;
    let width = this.selectorThickness;
    let height = this.selectorThickness;

    if (windowWidth > showHamburgerMenuBreakPoint) {
      width = activeItem.clientWidth;
    } else {
      height = activeItem.clientHeight;
    }
    return {
      width: `${width}px`,
      height: `${height}px`,
    };
  };

  setSelectorWidthAndHeight = () => {
    return new Promise((resolve) => {
      this.props.updateWindowDimensions(() => {
        let { width, height } = this.calculateSelectorWidthAndHeight();
        this.setState(
          { ...this.state, selectorStyles: { ...this.state.selectorStyles, width, height } },
          resolve
        );
      });
    });
  };
}

export default Navigation;
