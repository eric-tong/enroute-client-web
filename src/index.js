// @flow

import "./styles/index.scss";

import { hydrate, render } from "react-dom";

import App from "./App.react";
import React from "react";
import { Settings } from "luxon";

Settings.defaultLocale = "en-GB";
Settings.defaultZoneName = "Europe/London";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("No root element found");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
