// @flow

import type { BusStop } from "./Panel.react";
import { DateTime } from "luxon";
import React from "react";

export default function DepartureTile({
  id,
  name,
  street,
  direction,
  departures
}: BusStop) {
  return (
    <div className="tile">
      <div className="header">
        <h4>{name}</h4>
        <p className="subtitle">
          <small>{street}</small>
          <span className="chevron" />
          <small className="subtle">To {direction}</small>
        </p>
      </div>
      <ul>
        {departures.map(departure => (
          <li key={departure.scheduled.toMillis()} className="row">
            {departure.scheduled.toFormat("hh:mm a")}
            <DepartureStatus departure={departure} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function DepartureStatus({
  departure
}: {
  departure: $ElementType<$PropertyType<BusStop, "departures">, number>
}) {
  const OnTime = <small className="accent">On Time</small>;
  if (!departure.predicted) return OnTime;

  const lateDuration =
    (departure.predicted.valueOf() - departure.scheduled.valueOf()) / 60000;
  const now = DateTime.local();
  const duration = (now.valueOf() - departure.scheduled.valueOf()) / 60000;

  if (duration < 1) {
    return <small className="accent">Arriving</small>;
  } else if (lateDuration < 1) {
    return OnTime;
  } else {
    return (
      <small className="warning">{`${Math.round(
        lateDuration
      )} min late`}</small>
    );
  }
}
