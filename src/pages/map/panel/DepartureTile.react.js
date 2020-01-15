// @flow

import type { BusStop } from "./Panel.react";
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
        <h2>{name}</h2>
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
            <small className="accent">
              {departure.predicted
                ? departure.predicted.toFormat("hh:mm a")
                : "On Time"}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
