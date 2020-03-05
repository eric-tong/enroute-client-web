// @flow

import "../../styles/loading-state.scss";

import React from "react";

export default function VehicleDetailLoadingState() {
  return (
    <>
      <p className="direction mock-text is-loading" />
      <Tile />
    </>
  );
}

function Tile() {
  return <div className="detail-view-tile mock-tile is-loading" />;
}
