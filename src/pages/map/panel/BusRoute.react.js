// @flow

import "../../../styles/bus-route.scss";

import React, { useContext } from "react";

import { ActiveBusStopContext } from "./BusStopDetailView.react";
import { DateTime } from "luxon";
import TimeWithAlertTag from "./TimeWithAlertTag.react";

type Props = {|
  departures: {|
    ...DepartureString,
    busStop: BusStop
  |}[]
|};

const DEPARTURE_BUFFER = 120 * 1000;

export default function BusRoute({ departures }: Props) {
  const now = DateTime.local();
  const activeBusStop = useContext(ActiveBusStopContext);
  const activeIndex = departures.findIndex(
    ({ busStop }) => activeBusStop && activeBusStop.id === busStop.id
  );
  return (
    <ul className="bus-route">
      {departures.map((departure, index) => {
        const isActive = index === activeIndex;
        const isPast =
          DateTime.fromSQL(departure.predictedTimestamp).toMillis() +
            DEPARTURE_BUFFER <
          now.toMillis();

        return (
          <li
            key={departure.scheduledTimestamp}
            className={isActive ? "active" : ""}
          >
            <div className="icon">
              <div className="wrapper">
                <div className="bar" />
              </div>
              <div className="wrapper">
                <div className="bullet" />
              </div>
            </div>
            <span className={["name", isPast ? "disabled" : ""].join(" ")}>
              {departure.busStop.name}
            </span>
            <TimeWithAlertTag
              predicted={DateTime.fromSQL(
                departure.predictedTimestamp ?? departure.scheduledTimestamp
              )}
              scheduled={DateTime.fromSQL(departure.scheduledTimestamp)}
              disabled={isPast}
            />
          </li>
        );
      })}
    </ul>
  );
}
