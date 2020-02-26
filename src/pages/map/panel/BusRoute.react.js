// @flow

import "../../../styles/bus-route.scss";

import React, { useContext } from "react";

import { ActiveBusStopContext } from "./BusStopDetailView.react";
import TimeWithAlertTag from "./TimeWithAlertTag.react";
import { formatDepartureData } from "../../../utils/departureUtil";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type Props = {|
  tripId: string
|};

const TRIP = gql`
  query getTrip($id: Int!) {
    trip(id: $id) {
      departures {
        scheduledTimestamp
        predictedTimestamp
        actualTimestamp
        status
        busStop {
          id
          name
        }
      }
    }
  }
`;

const disabledStatuses = ["departed", "skipped"];

export default function BusRoute({ tripId }: Props) {
  const { data } = useQuery(TRIP, {
    pollInterval: 15000,
    variables: { id: tripId }
  });
  const activeBusStop = useContext(ActiveBusStopContext);
  if (!data) return "Loading...";

  const departures = data.trip.departures.map(({ busStop, ...departure }) => ({
    ...formatDepartureData(departure),
    busStop
  }));

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
            {departure.status === "skipped" && (
              <small className="note">Skipped</small>
            )}
          </li>
        );
      })}
    </ul>
  );
}
