import React from "react";
import { render, cleanup } from "@testing-library/react";

import Navigation from "./Navigation";
import { NavigationProps } from "./Navigation.types";

describe("Test Navigation", () => {
  let defaultProps: NavigationProps;
  let differentProps: NavigationProps;
  beforeEach(() => {
    (defaultProps = {}), (differentProps = {});
  });

  afterEach(cleanup);

  const renderDefaultComponent = () =>
    render(<Navigation data-testid="navigation" {...defaultProps} />);

  it("There should be proper rendering with default props", () => {
    const { getByTestId } = renderDefaultComponent();
    const element = getByTestId("navigation") as HTMLDivElement;
    expect(element).toBeInTheDocument();
  });

  const renderComponentDifferentProps = () =>
    render(<Navigation data-testid="navigation" {...differentProps} />);

  it("There should be proper rendering based on different props", () => {
    const { getByTestId } = renderComponentDifferentProps();
    const element = getByTestId("navigation") as HTMLDivElement;
    expect(element).toBeInTheDocument();
  });
});
