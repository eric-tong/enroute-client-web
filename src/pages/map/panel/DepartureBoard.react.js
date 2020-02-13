// @flow

import DepartureBoardLoadingState from "../../loading-states/DepartureBoardLoadingState.react";
import DepartureTile from "./DepartureTile.react";
import React from "react";
import { formatDepartureData } from "../../../utils/departureUtil";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const BUS_STOPS = gql`
  {
    busStops {
      id
      url
      name
      street
      direction
      departures(maxLength: 5) {
        scheduledTimestamp
        predictedTimestamp
        actualTimestamp
        status
      }
    }
  }
`;

export default function DepartureBoard() {
  const busStopGroups = useBusStopGroups();

  if (busStopGroups.length < 1) return <DepartureBoardLoadingState />;
  else
    return (
      <>
        <h1>Live Departures</h1>
        <div className="grid">
          {busStopGroups.map(({ direction, busStops }) => (
            <React.Fragment key={direction}>
              <h3>To {direction}</h3>
              {busStops.map(busStop => (
                <DepartureTile key={busStop.id} {...busStop} />
              ))}
            </React.Fragment>
          ))}
        </div>
      </>
    );
}

function useBusStopGroups(): {
  direction: string,
  busStops: { ...BusStop, departures: Departure[] }[]
}[] {
  const { data = { busStops: [] } } = useQuery<{|
    ...BusStop,
    Departures: DepartureData[]
  |}>(BUS_STOPS, {
    pollInterval: 15000
  });

  const busStops: {
    ...BusStop,
    departures: Departure[]
  }[] = data.busStops.map(({ departures, ...busStop }) => ({
    ...busStop,
    departures: departures.map(formatDepartureData)
  }));

  const directions = new Set(busStops.map(busStop => busStop.direction));
  const busStopsByDirection = Array.from(directions)
    .map(direction => ({
      direction,
      busStops: busStops.filter(busStop => busStop.direction === direction)
    }))
    .reverse();

  return busStopsByDirection;
}
