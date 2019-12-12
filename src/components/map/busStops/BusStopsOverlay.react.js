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
      longitude
      latitude
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
    return data.busStops.map(({ id, icon, longitude, latitude }) => (
      <BusStopMarker
        key={id}
        latitude={latitude}
        longitude={longitude}
        icon={icon}
      />
    ));
  }
}
