export function moveSelectorToActive() {
  // initilizing variables once
  let { showHamburgerMenuBreakPoint } = this.props.appState;
  let navigationUl = document.querySelector(".top-navigation ul");

  return function (clickedItem) {
    let { windowWidth } = this.props.appState.windowDimensions;
    if (windowWidth > showHamburgerMenuBreakPoint) {
      // selector should slide on the x axis
      let clickeItemX = clickedItem.getBoundingClientRect().x;
      let navigationUlX = navigationUl.getBoundingClientRect().x;
      let navigationUlScrollLeft = navigationUl.scrollLeft;
      // calculate how much the selector should translate from the left edge of its container
      let clickedItemFromParentLeftEdge = clickeItemX - navigationUlX + navigationUlScrollLeft;
      this.setState({
        ...this.state,
        selectorStyles: {
          ...this.state.selectorStyles,
          transform: `translateX(${clickedItemFromParentLeftEdge}px)`,
        },
      });
    } else {
      // selector should slide on the y axis
      let clickeItemY = clickedItem.getBoundingClientRect().y;
      let navigationUlY = navigationUl.getBoundingClientRect().y;
      let navigationUlScrollTop = navigationUl.scrollTop;
      // calculate how much the selector should translate from the top edge of its container
      let clickedItemFromParentTopEdge = clickeItemY - navigationUlY + navigationUlScrollTop;
      this.setState({
        ...this.state,
        selectorStyles: {
          ...this.state.selectorStyles,
          transform: `translateY(${clickedItemFromParentTopEdge}px)`,
        },
      });
    }
  };
}
