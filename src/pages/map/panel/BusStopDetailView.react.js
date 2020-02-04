// @flow

import BackButton from "../../misc/BackButton.react";
import BusStopDetailViewTile from "./BusStopDetailViewTile.react";
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type Props = {|
  busStopUrl: string
|};
type QueryResult = {|
  ...BusStop,
  departures: {|
    ...DepartureString,
    trip: {|
      departures: {|
        ...DepartureString,
        busStop: BusStop
      |}[]
    |}
  |}[]
|};

const BUS_STOP = gql`
  query getBusStop($url: String!) {
    busStop(url: $url) {
      id
      name
      street
      direction
      departures {
        scheduledTimestamp
        predictedTimestamp
        trip {
          departures {
            scheduledTimestamp
            predictedTimestamp
            busStop {
              id
              name
            }
          }
        }
      }
    }
  }
`;
export const ActiveBusStopContext = React.createContext<?QueryResult>();

export default function BusStopDetailView({ busStopUrl }: Props) {
  const busStop = useBusStop(busStopUrl);
  if (!busStop) return "Loading...";

  const { name, street, direction, departures } = busStop;

  // TODO add null state
  return (
    <>
      <BackButton />
      <h2 className="no-bottom-margin">{name}</h2>
      <p className="direction">
        {street}
        <span className="chevron higher" />
        <span className="subtle">Towards {direction}</span>
      </p>
      <ActiveBusStopContext.Provider value={busStop}>
        {departures.length > 0 && (
          <>
            <h3>Next Departure</h3>
            <BusStopDetailViewTile
              departure={departures[0]}
              collapsible={false}
            />
          </>
        )}
        {departures.length > 1 && (
          <>
            <h3>Upcoming Departures</h3>
            {departures.slice(1).map(departure => (
              <BusStopDetailViewTile
                key={departure.scheduledTimestamp}
                departure={departure}
              />
            ))}
          </>
        )}
      </ActiveBusStopContext.Provider>
    </>
  );
}

function useBusStop(busStopUrl): ?QueryResult {
  const { data } = useQuery(BUS_STOP, {
    pollInterval: 15000,
    variables: { url: busStopUrl }
  });
  const busStop = data?.busStop;
  if (!busStop) return;

  return busStop;
}
