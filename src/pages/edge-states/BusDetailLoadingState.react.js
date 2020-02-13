// @flow

import "../../styles/loading-state.scss";

import React from "react";

export default function BusDetailLoadingState() {
  return (
    <>
      <h2 className="no-bottom-margin mock-text long is-loading" />
      <p className="direction mock-text is-loading" />
      <h3>Next Departure</h3>
      <Tile />
      <Tile />
      <Tile />
    </>
  );
}

function Tile() {
  return <div className="detail-view-tile mock-tile is-loading" />;
}
