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
  const vehicleQuery = useQuery(VEHICLE, { pollInterval: 10000 });

  if (vehicleQuery.loading) {
    return null;
  } else if (vehicleQuery.error) {
    console.log(vehicleQuery.error);
  } else {
    const { coords, bearing } = vehicleQuery.data.vehicle;
    return (
      <VehicleMarker
        latitude={coords.x}
        longitude={coords.y}
        bearing={bearing}
      />
    );
  }
}
