// @flow

import "../../styles/loading-state.scss";

import React from "react";

export default function BusRouteLoadingState() {
  return (
    <ul className="bus-route">
      <Row />
      <Row />
      <Row />
    </ul>
  );
}

function Row() {
  return (
    <li>
      <div className="icon">
        <div className="wrapper">
          <div className="bar" />
        </div>
        <div className="wrapper">
          <div className="bullet" />
        </div>
      </div>
      <div className="name mock-text is-loading short inline round" />
      <div className="time mock-text is-loading tiny inline" />
    </li>
  );
}
