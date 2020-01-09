// @flow

import "../../../styles/panel.scss";

import { DateTime } from "luxon";
import { NavLink } from "react-router-dom";
import { PANEL_WIDTH } from "../../../utils/useViewport";
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type BusStop = {
  id: number,
  name: string,
  street: string,
  arrivals: DateTime[]
};

const BUS_STOPS = gql`
  {
    busStops {
      id
      name
      street
      arrivals
    }
  }
`;

export default function Panel() {
  const busStops = useBusStops();

  return (
    <section id="panel" style={{ width: PANEL_WIDTH }}>
      <h1>Arrivals</h1>
      {busStops.map(busStop => (
        <ArrivalTile key={busStop.name} {...busStop} />
      ))}
    </section>
  );
}

function ArrivalTile({ id, name, street, arrivals }: BusStop) {
  return (
    <div className="tile">
      <div className="header">
        <h2>{name}</h2>
        <p className="subtitle">
          <small>{street}</small>
          <span className="interpunct" />
          <small className="translucent">To Begbroke</small>
        </p>
      </div>
      <ul>
        {arrivals.map(arrival => (
          <li key={arrival.toMillis()} className="row">
            {arrival.toFormat("hh:mm a")}
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
    arrivals: busStop.arrivals.map(dateString => DateTime.fromISO(dateString))
  }));
  busStops.sort(
    (a, b) =>
      (a.arrivals.length > 0
        ? a.arrivals[0].toMillis()
        : Number.MAX_SAFE_INTEGER) -
      (b.arrivals.length > 0
        ? b.arrivals[0].toMillis()
        : Number.MAX_SAFE_INTEGER)
  );

  return busStops;
}
