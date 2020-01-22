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

export default function BusRoute({ departures }: Props) {
  const activeBusStop = useContext(ActiveBusStopContext);
  const activeIndex = departures.findIndex(
    ({ busStop }) => activeBusStop && activeBusStop.id === busStop.id
  );
  return (
    <ul className="bus-route">
      {departures.map((departure, index) => {
        const isActive = index === activeIndex;

        return (
          <li key={departure.scheduled} className={isActive ? "active" : ""}>
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
        );
      })}
    </ul>
  );
}
