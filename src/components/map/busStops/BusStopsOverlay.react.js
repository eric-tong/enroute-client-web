// @flow

import BusStopMarker from "./BusStopMarker.react";
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const BUS_STOPS = gql`
  {
    busStops {
      id
      icon
      coords {
        x
        y
      }
    }
  }
`;

export default function BusStopsOverlay() {
  const { loading, error, data } = useQuery(BUS_STOPS);

  if (loading) {
    return null;
  } else if (error) {
    console.log(error);
    return null;
  } else {
    return data.busStops.map(({ id, icon, coords }) => (
      <BusStopMarker
        key={id}
        latitude={coords.x}
        longitude={coords.y}
        icon={icon}
      />
    ));
  }
}
