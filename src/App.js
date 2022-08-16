import React, { Component } from "react";
import "./styles/App.css";
import Layout from "./pages/layout/components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/components/Home";

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
      windowDimensions: {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      },
      showHamburgerMenuBreakPoint: 480,
    };
  }

  componentDidMount = () => {
    window.addEventListener("resize", () => this.updateWindowDimensions());
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", this.updateAppTheme);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", () => this.updateWindowDimensions());
    window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", this.updateAppTheme);
  };

  render() {
    let darkMode = this.state.darkMode ? "dark-mode" : "light-mode";

    return (
      <div className={`App ${darkMode}`}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  onToggleNavigation={this.onToggleNavigation}
                  onToggleDarkMode={this.onToggleDarkMode}
                  updateWindowDimensions={this.updateWindowDimensions}
                  appState={this.state}
                />
              }
            >
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

  onToggleDarkMode = () => {
    this.setState({ ...this.state, darkMode: !this.state.darkMode });
  };

  updateWindowDimensions = (callBack) => {
    this.setState(
      {
        ...this.state,
        windowDimensions: { windowHeight: window.innerHeight, windowWidth: window.innerWidth },
      },
      callBack
    );
  };

  updateAppTheme = (e) => {
    this.setState({ ...this.state, darkMode: e.target.matches });
  };
}

export default App;
