// @flow

import React from "react";
import VehicleMarker from "./VehicleMarker.react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const VEHICLE = gql`
  {
    vehicles {
      id
      avl {
        longitude
        latitude
        angle
      }
    }
  }
`;

export default function VehiclesOverlay() {
  const { loading, error, data } = useQuery(VEHICLE, { pollInterval: 5000 });

  if (loading) {
    return null;
  } else if (error) {
    console.log(error);
    return null;
  } else {
    return data.vehicles.map(vehicle => {
      const { longitude, latitude, angle } = vehicle.avl;
      return (
        <VehicleMarker
          key={vehicle.id}
          latitude={latitude}
          longitude={longitude}
          bearing={angle}
        />
      );
    });
  }
}
