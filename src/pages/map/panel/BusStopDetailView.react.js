// @flow

import BusStopDetailViewTile from "./BusStopDetailViewTile.react";
import { DateTime } from "luxon";
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type Props = {|
  busStopUrl: string
|};

const BUS_STOP = gql`
  query getBusStop($url: String!) {
    busStop(url: $url) {
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

export default function BusStopDetailView({ busStopUrl }: Props) {
  const busStop = useBusStop(busStopUrl);
  if (!busStop) return "Loading...";

  const { name, street, direction, departures } = busStop;

  // TODO add null state
  return (
    <>
      <button className="back">Back to Departures</button>
      <h1 className="no-bottom-margin">{name}</h1>
      <p className="direction">
        {street}
        <span className="chevron higher" />
        <span className="subtle">Towards {direction}</span>
      </p>
      {departures.length > 0 && (
        <>
          <h3>Next Departure</h3>
          <BusStopDetailViewTile departure={departures[0]} />
        </>
      )}
      {departures.length > 1 && (
        <>
          <h3>Upcoming Departures</h3>
          {departures.slice(1).map(departure => (
            <BusStopDetailViewTile
              key={departure.scheduled.toSQL()}
              departure={departure}
            />
          ))}
        </>
      )}
    </>
  );
}

function useBusStop(busStopUrl): ?BusStop {
  const { data } = useQuery(BUS_STOP, {
    pollInterval: 15000,
    variables: { url: busStopUrl }
  });
  const busStop = data?.busStop;
  if (!busStop) return;

  return {
    ...busStop,
    departures: busStop.departures.map(departure => ({
      scheduled: DateTime.fromSQL(departure.scheduled),
      predicted: departure.predicted && DateTime.fromSQL(departure.predicted)
    }))
  };
}
