// @flow

import React from "react";
import VehicleMarker from "./VehicleMarker.react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const VEHICLE = gql`
  {
    vehicle {
      bearing
      coords {
        x
        y
      }
    }
  }
`;

export default function VehiclesOverlay() {
  const { loading, error, data } = useQuery(VEHICLE, { pollInterval: 10000 });

  if (loading) {
    return null;
  } else if (error) {
    console.log(error);
    return null;
  } else {
    const { coords, bearing } = data.vehicle;
    return (
      <VehicleMarker
        latitude={coords.x}
        longitude={coords.y}
        bearing={bearing}
      />
    );
  }
}
