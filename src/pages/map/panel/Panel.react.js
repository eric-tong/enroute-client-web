// @flow

import "../../../styles/panel.scss";

import { DateTime } from "luxon";
import DepartureTile from "./DepartureTile.react";
import MenuButton from "../../misc/MenuButton.react";
import { PANEL_WIDTH } from "../../../utils/useViewport";
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

export type BusStop = {
  id: number,
  name: string,
  street: string,
  direction: string,
  departures: { scheduled: DateTime, predicted: ?DateTime }[]
};

const BUS_STOPS = gql`
  {
    busStops {
      id
      name
      street
      direction
      departures {
        scheduled
        predicted
      }
    }
  }
`;

export default function Panel() {
  const busStopGroups = useBusStopGroups();
  return (
    <section id="panel" style={{ width: PANEL_WIDTH }}>
      <header>
        <h1>Live Departures</h1>
        <MenuButton />
      </header>
      {busStopGroups.map(({ direction, busStops }) => (
        <React.Fragment key={direction}>
          <h3>To {direction}</h3>
          {busStops.map(busStop => (
            <DepartureTile key={busStop.id} {...busStop} />
          ))}
        </React.Fragment>
      ))}
    </section>
  );
}

function useBusStopGroups(): { direction: string, busStops: BusStop[] }[] {
  const { data = { busStops: [] } } = useQuery<BusStop>(BUS_STOPS, {
    pollInterval: 15000
  });

  const busStops: BusStop[] = data.busStops.map(busStop => ({
    ...busStop,
    departures: busStop.departures.map(departure => ({
      scheduled: DateTime.fromSQL(departure.scheduled),
      predicted: departure.predicted && DateTime.fromSQL(departure.predicted)
    }))
  }));

  const directions = new Set(busStops.map(busStop => busStop.direction));
  const busStopsByDirection = Array.from(directions).map(direction => ({
    direction,
    busStops: busStops.filter(busStop => busStop.direction === direction)
  }));

  return busStopsByDirection;
}