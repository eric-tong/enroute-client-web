// @flow

import { DateTime } from "luxon";
import { NavLink } from "react-router-dom";
import React from "react";

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
    <NavLink to={`/stop/${url}`} className="tile">
      <div className="header">
        <h4>{name}</h4>
        <p className="subtitle">
          <small>{street}</small>
          <span className="chevron" />
          <small className="subtle">To {direction}</small>
        </p>
      </div>
      <ul>
        {departures.map(({ predicted, scheduled }) => (
          <li key={scheduled.toMillis()} className="row">
            {(predicted ?? scheduled).toFormat("hh:mm a")}
            <DepartureStatus departure={{ predicted, scheduled }} />
          </li>
        ))}
      </ul>
    </NavLink>
  );
}

function DepartureStatus({
  departure: { predicted, scheduled }
}: {
  departure: Departure
}) {
  const OnTime = <small>On Time</small>;
  if (!predicted) return OnTime;

  const lateDuration = (predicted.valueOf() - scheduled.valueOf()) / 60000;
  const now = DateTime.local();
  const timeToPredictedArrival = (predicted.valueOf() - now.valueOf()) / 60000;

  console.log(predicted);

  if (Math.abs(timeToPredictedArrival) < 1) {
    return <small className="accent">Arriving</small>;
  } else if (lateDuration < -1) {
    return (
      <small className="accent">{`${Math.round(
        lateDuration * -1
      )} min early`}</small>
    );
  } else if (lateDuration > 1) {
    return (
      <small className="warning">{`${Math.round(
        lateDuration
      )} min late`}</small>
    );
  } else {
    return OnTime;
  }
}
