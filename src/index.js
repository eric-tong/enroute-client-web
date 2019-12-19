// @flow

import "./styles/index.scss";

import App from "./App.react";
import React from "react";
import ReactDOM from "react-dom";
import { Settings } from "luxon";

Settings.defaultLocale = "en-GB";
Settings.defaultZoneName = "Europe/London";

// $FlowFixMe
ReactDOM.render(<App />, document.getElementById("root"));
