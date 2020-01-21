// @flow

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
  const { data } = useQuery(BUS_STOP, { variables: { url: busStopUrl } });
  if (!data) return "Loading...";

  const { name, street, direction, departures } = data?.busStop;

  return (
    <>
      <button class="back">Back to Departures</button>
      <h1>{name}</h1>
      <p>
        {street}
        <span className="chevron higher" />
        <span className="subtle">Towards {direction}</span>
      </p>
      <div className="unit">
        <header>
          <h1>4:15 pm</h1>
        </header>
        <div className="lower-half">
          <h3>Bus Route</h3>
          <ul className="route">
            <li>Oxford Town Centre 4:16 pm</li>
            <li>Department of Materials</li>
            <li>Summertown Shops</li>
            <li>Parkway Park &amp; Ride</li>
            <li>Begbroke Science Park</li>
          </ul>
        </div>
      </div>
    </>
  );
}
