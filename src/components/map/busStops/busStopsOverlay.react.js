// @flow

import BusStopMarker from "./BusStopMarker.react";
import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const BUS_STOPS = gql`
  {
    busStops {
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
  } else {
    return data.busStops.map(({ icon, coords }) => (
      <BusStopMarker
        key={icon}
        latitude={coords.x}
        longitude={coords.y}
        icon={icon}
      />
    ));
  }
}
