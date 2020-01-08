// @flow

import "../../../styles/panel.scss";

import { DateTime } from "luxon";
import { PANEL_WIDTH } from "../../../utils/useViewport";
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type BusStop = {
  name: string,
  street: string,
  arrivals: string[]
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

function ArrivalTile({ name, street, arrivals }: BusStop) {
  return (
    <div className="tile">
      <div className="header">
        <h2>{name}</h2>
        <p className="subtitle">
          <small>{street}</small>
          <span class="interpunct" />
          <small className="translucent">To Begbroke</small>
        </p>
      </div>
      {arrivals.map(arrival => (
        <div key={arrival} className="row">
          {arrival}
          <small className="accent">On Time</small>
        </div>
      ))}
    </div>
  );
}

function useBusStops(): BusStop[] {
  const { loading, error, data = { busStops: [] } } = useQuery<BusStop>(
    BUS_STOPS
  );
  return data.busStops.map(busStop => ({
    ...busStop,
    arrivals: busStop.arrivals.map(dateString =>
      DateTime.fromISO(dateString).toFormat("hh:mm a")
    )
  }));
}
