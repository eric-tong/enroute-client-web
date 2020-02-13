// @flow

import "../../styles/loading-state.scss";

import React from "react";

export default function DepartureBoardLoadingState() {
  return (
    <>
      <h1>Live Departures</h1>
      <div className="grid">
        <h3>To Begbroke</h3>
        <DepartureTile />
        <DepartureTile />
        <DepartureTile />
        <DepartureTile />
        <h3>To Town Centre</h3>
        <DepartureTile />
        <DepartureTile />
        <DepartureTile />
        <DepartureTile />
      </div>
    </>
  );
}

function DepartureTile() {
  return <div className="tile clickable-tile is-loading" />;
}
