// @flow

import "../../styles/checkmark.scss";

import type { CheckIn } from "../../utils/useCheckIn";
import React from "react";

export default function CheckInPage({
  checkIn,
  busStops
}: {|
  checkIn: CheckIn,
  busStops: BusStop[]
|}) {
  const body = (() => {
    switch (checkIn.status) {
      case "direction":
        return (
          <DirectionSection
            directions={busStops.map(busStop => busStop.direction)}
            onSelectDirection={checkIn.setDirection}
          />
        );
      case "origin":
        return (
          <BusStopsSection
            busStops={busStops}
            onBusStopClick={checkIn.setOrigin}
          />
        );
      case "destination":
        return (
          <BusStopsSection
            busStops={busStops}
            onBusStopClick={checkIn.setDestination}
          />
        );
      case "confirmed":
        return (
          <ConfirmationSection isLoading={false} onUndoClick={checkIn.undo} />
        );
      case "loading":
        return (
          <ConfirmationSection isLoading={true} onUndoClick={checkIn.undo} />
        );
      default:
        return <ErrorSection />;
    }
  })();

  return (
    <>
      <h2>New check in</h2>
      {body}
    </>
  );
}

function DirectionSection({
  directions,
  onSelectDirection
}: {
  directions: string[],
  onSelectDirection: string => void
}) {
  const uniqueDirections = Array.from(new Set(directions));
  return (
    <>
      <h4>Select your direction of travel.</h4>
      {uniqueDirections.map(direction => (
        <div
          key={direction}
          className="tile clickable-tile"
          onClick={() => onSelectDirection(direction)}
        >
          <div className="content option">Towards {direction}</div>
        </div>
      ))}
    </>
  );
}

function BusStopsSection({
  busStops,
  onBusStopClick
}: {
  busStops: BusStop[],
  onBusStopClick: BusStop => void
}) {
  return (
    <>
      <h2>New check in</h2>
      {busStops.map<React$Element<"button">>(busStop => (
        <button key={busStop.id} onClick={() => onBusStopClick(busStop)}>
          {busStop.name}
        </button>
      ))}
    </>
  );
}

function ConfirmationSection({
  isLoading,
  onUndoClick
}: {
  isLoading: boolean,
  onUndoClick: () => void
}) {
  return (
    <section className="confirmation">
      <div className="half-section">
        <CheckMark isLoading={isLoading} />
      </div>
      <div className="half-section">
        <h2>{isLoading ? "Checking in..." : "Check in successful"}</h2>
        {!isLoading && (
          <p>
            Checked in successfully.{" "}
            <button onClick={onUndoClick}>Change.</button>
          </p>
        )}
      </div>
    </section>
  );
}

function CheckMark({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={`circle-loader ${!isLoading ? "load-complete" : ""}`}>
      {!isLoading && <div className="checkmark draw"></div>}
    </div>
  );
}

function ErrorSection() {
  return (
    <section className="confirmation">
      <div className="half-section"></div>
      <div className="half-section">
        <h2>An error has occurred</h2>
        <p>Refresh this page to try again.</p>
      </div>
    </section>
  );
}
