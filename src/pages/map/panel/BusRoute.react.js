// @flow

import "../../../styles/bus-route.scss";

import React, { useContext } from "react";

import { ActiveBusStopContext } from "./BusStopDetailView.react";
import TimeWithAlertTag from "./TimeWithAlertTag.react";

type Props = {|
  departures: {|
    ...Departure,
    busStop: BusStop
  |}[]
|};

const disabledStatuses = ["departed"];

export default function BusRoute({ departures }: Props) {
  const activeBusStop = useContext(ActiveBusStopContext);
  const activeIndex = departures.findIndex(
    ({ busStop }) => activeBusStop && activeBusStop.id === busStop.id
  );
  return (
    <ul className="bus-route">
      {departures.map(({ busStop, ...departure }, index) => {
        const isActive = index === activeIndex;
        const isPast = disabledStatuses.includes(departure.status);

        return (
          <li
            key={departure.scheduledTime}
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
              {busStop.name}
            </span>
            <TimeWithAlertTag departure={departure} disabled={isPast} />
          </li>
        );
      })}
    </ul>
  );
}
