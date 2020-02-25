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
  const terminal = busStops.find(busStop => busStop.isTerminal) ?? busStops[0];
  const body = (() => {
    switch (checkIn.status) {
      case "direction":
        const setDirection = direction => {
          if (direction === terminal.direction) {
            checkIn.setOrigin(terminal);
          } else {
            checkIn.setDestination(terminal);
          }
          checkIn.setDirection(direction);
        };

        return (
          <DirectionSection
            directions={busStops.map(busStop => busStop.direction)}
            onSelectDirection={setDirection}
          />
        );
      case "origin":
        return (
          <BusStopsSection
            busStops={getRelevantBusStops(busStops, checkIn.direction)}
            onBusStopClick={checkIn.setOrigin}
            type="origin"
          />
        );
      case "destination":
        return (
          <BusStopsSection
            busStops={getRelevantBusStops(busStops, checkIn.direction)}
            onBusStopClick={checkIn.setDestination}
            type="destination"
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
      <h4>Which direction are you heading?</h4>
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
  onBusStopClick,
  type
}: {
  busStops: BusStop[],
  onBusStopClick: BusStop => void,
  type: "origin" | "destination"
}) {
  return (
    <>
      <h4>
        {type === "origin"
          ? "Where did you board the bus?"
          : "Where will you be alighting?"}
      </h4>
      {busStops.map(busStop => (
        <div
          className="tile clickable-tile"
          key={busStop.id}
          onClick={() => onBusStopClick(busStop)}
        >
          <div className="content option">{busStop.name}</div>
        </div>
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
            Your check in has been recorded.{" "}
            <button onClick={onUndoClick}>Undo.</button>
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

function getRelevantBusStops(busStops: BusStop[], direction: ?string) {
  const relevantBusStops = [];
  for (const busStop of busStops) {
    if (busStop.isTerminal) continue;

    if (
      busStops.find(
        otherBusStop =>
          otherBusStop.id !== busStop.id && otherBusStop.name === busStop.name
      )
    ) {
      if (busStop.direction === direction) relevantBusStops.push(busStop);
    } else {
      relevantBusStops.push(busStop);
    }
  }
  return relevantBusStops;
}
