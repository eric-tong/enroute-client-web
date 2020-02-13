// @flow

import DeparturesEmptyState from "../../edge-states/DeparturesEmptyState.react";
import { NavLink } from "react-router-dom";
import React from "react";
import { TIME_FORMAT } from "../../../constants";

type Props = {|
  ...BusStop,
  departures: Departure[]
|};

export default function DepartureTile({
  id,
  url,
  name,
  street,
  direction,
  departures
}: Props) {
  return (
    <NavLink to={`/stop/${url}`} className="tile clickable-tile">
      <div className="header">
        <h4>{name}</h4>
        <p className="subtitle">
          <small>{street}</small>
          <span className="chevron hide-small-medium" />
          <small className="subtle hide-small-medium">To {direction}</small>
        </p>
      </div>
      <ul>
        {departures.length < 1 && <DeparturesEmptyState />}
        {departures.map(departure => (
          <li key={departure.scheduledTime.toMillis()} className="row">
            {departure.relevantTime.toFormat(TIME_FORMAT)}
            <DepartureStatus departure={departure} />
          </li>
        ))}
      </ul>
    </NavLink>
  );
}

function DepartureStatus({
  departure: { predictionDelta, status }
}: {
  departure: Departure
}) {
  switch (status) {
    case "onTime":
      return <small>On Time</small>;
    case "arriving":
      return <small className="accent">Arriving</small>;
    case "early":
      return (
        <small className="accent">{`${predictionDelta ??
          "?"} min early`}</small>
      );
    case "late":
      return (
        <small className="warning">{`${predictionDelta ??
          "?"} min late`}</small>
      );
    case "now":
      return <small className="accent">Now</small>;
    case "skipped":
      return <small>Skipped</small>;
    case "departed":
      return <small>Departed</small>;
    default:
      return <small>Scheduled</small>;
  }
}
