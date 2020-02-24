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
  switch (checkIn.status) {
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
}

function BusStopsSection({
  busStops,
  onBusStopClick
}: {
  busStops: BusStop[],
  onBusStopClick: BusStop => void
}) {
  return busStops.map<React$Element<"button">>(busStop => (
    <button key={busStop.id} onClick={() => onBusStopClick(busStop)}>
      {busStop.name}
    </button>
  ));
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
