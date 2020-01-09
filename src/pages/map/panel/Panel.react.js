// @flow

import "../../../styles/panel.scss";

import { DateTime } from "luxon";
import MenuButton from "../../misc/MenuButton.react";
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
  const busStopGroups = useBusStopGroups();

  return (
    <section id="panel" style={{ width: PANEL_WIDTH }}>
      <header>
        <h1>Minibus Departures</h1>
        <MenuButton />
      </header>
      {busStopGroups.map(({ direction, busStops }) => (
        <>
          <h3>To {direction}</h3>
          {busStops.map(busStop => (
            <DepartureTile key={busStop.id} {...busStop} />
          ))}
        </>
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

function useBusStopGroups(): { direction: string, busStops: BusStop[] }[] {
  const { data = { busStops: [] } } = useQuery<BusStop>(BUS_STOPS, {
    pollInterval: 15000
  });

  const busStops: BusStop[] = data.busStops.map(busStop => ({
    ...busStop,
    departures: busStop.departures.map(dateString =>
      DateTime.fromISO(dateString)
    )
  }));

  const directions = new Set(busStops.map(busStop => busStop.direction));
  const busStopsByDirection = Array.from(directions).map(direction => ({
    direction,
    busStops: busStops.filter(busStop => busStop.direction === direction)
  }));

  return busStopsByDirection;
}
