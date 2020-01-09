// @flow

import "../../../styles/panel.scss";

import { DateTime } from "luxon";
import { PANEL_WIDTH } from "../../../utils/useViewport";
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type BusStop = {
  id: number,
  name: string,
  street: string,
  direction: string,
  departures: DateTime[]
};

const BUS_STOPS = gql`
  {
    busStops {
      id
      name
      street
      direction
      departures
    }
  }
`;

export default function Panel() {
  const busStops = useBusStops();

  return (
    <section id="panel" style={{ width: PANEL_WIDTH }}>
      <h1>Minibus Departures</h1>
      {busStops.map(busStop => (
        <DepartureTile key={busStop.id} {...busStop} />
      ))}
    </section>
  );
}

function DepartureTile({ id, name, street, direction, departures }: BusStop) {
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
          <li key={departure.toMillis()} className="row">
            {departure.toFormat("hh:mm a")}
            <small className="accent">On Time</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

function useBusStops(): BusStop[] {
  const { data = { busStops: [] } } = useQuery<BusStop>(BUS_STOPS, {
    pollInterval: 15000
  });

  const busStops: BusStop[] = data.busStops.map(busStop => ({
    ...busStop,
    departures: busStop.departures.map(dateString =>
      DateTime.fromISO(dateString)
    )
  }));
  return busStops;
}
