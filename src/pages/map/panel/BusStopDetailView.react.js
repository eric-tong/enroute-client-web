// @flow

import MenuButton from "../../misc/MenuButton.react";
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

  const {
    name,
    street,
    direction,
    departures: { scheduled, predicted }
  } = data?.busStop;

  return (
    <>
      <button class="back">Back to Departures</button>
      <h1>{name}</h1>
    </>
  );
}
