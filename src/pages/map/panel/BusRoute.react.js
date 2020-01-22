// @flow

import "../../../styles/bus-route.scss";

import { DateTime } from "luxon";
import React from "react";
import TimeWithAlertTag from "./TimeWithAlertTag.react";

type Props = {|
  departures: {|
    ...DepartureString,
    busStop: BusStop
  |}[]
|};

export default function BusRoute({ departures }: Props) {
  return (
    <ul className="bus-route">
      {departures.map(departure => (
        <li key={departure.scheduled}>
          <div className="icon">
            <div className="wrapper">
              <div className="bar" />
            </div>
            <div className="wrapper">
              <div className="bullet" />
            </div>
          </div>
          <span className="name">{departure.busStop.name}</span>
          <TimeWithAlertTag
            predicted={DateTime.fromSQL(departure.predicted)}
            scheduled={DateTime.fromSQL(departure.scheduled)}
          />
        </li>
      ))}
    </ul>
  );
}
