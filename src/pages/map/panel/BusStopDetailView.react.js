// @flow

import BackButton from "../../misc/BackButton.react";
import BusDetailLoadingState from "../../edge-states/BusDetailLoadingState.react";
import BusStopDetailViewTile from "./BusStopDetailViewTile.react";
import DeparturesEmptyState from "../../edge-states/DeparturesEmptyState.react";
import React from "react";
import { formatDepartureData } from "../../../utils/departureUtil";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type Props = {|
  busStopUrl: string
|};
type QueryResult = {|
  ...BusStop,
  departures: {|
    ...Departure,
    trip: {|
      departures: {|
        ...Departure,
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
        actualTimestamp
        status
        trip {
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
    }
  }
`;
export const ActiveBusStopContext = React.createContext<?QueryResult>();

export default function BusStopDetailView({ busStopUrl }: Props) {
  const busStop = useBusStop(busStopUrl);
  if (!busStop)
    return (
      <>
        <BackButton />
        <BusDetailLoadingState />
      </>
    );

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
      {departures.length < 1 && <DeparturesEmptyState />}
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
                key={departure.scheduledTime.toMillis()}
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
  const { loading, data } = useQuery(BUS_STOP, {
    pollInterval: 15000,
    variables: { url: busStopUrl }
  });
  const busStop = data?.busStop;
  if (loading || !busStop) return;

  const { departures, ...busStopContent } = busStop;
  const processedDepartures = departures
    .map(departure => {
      const { trip, ...departureContent } = departure;

      const processedTripDepartures = trip.departures.map(tripDeparture => {
        const { busStop, ...tripDeparturesContent } = tripDeparture;
        return {
          ...formatDepartureData(tripDeparturesContent),
          busStop
        };
      });

      return {
        ...formatDepartureData(departureContent),
        trip: { departures: processedTripDepartures }
      };
    })
    .sort(
      (d1: Departure, d2: Departure) =>
        d1.relevantTime.toMillis() - d2.relevantTime.toMillis()
    );

  return { ...busStopContent, departures: processedDepartures };
}
