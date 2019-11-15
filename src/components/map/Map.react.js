// @flow

import React, { useState } from "react";

import BusStopMarker from "./BusStopMarker.react";
import { Marker } from "react-map-gl";
import ReactMapGL from "react-map-gl";
import VehicleMarker from "./VehicleMarker.react";
import { gql } from "apollo-boost";
import initialViewport from "../../styles/viewport";
import locations from "../../locations";
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

function Map() {
  const [viewport, setViewport] = useState(initialViewport);
  const busStopQuery = useQuery(BUS_STOPS);
  const vehicleQuery = useQuery(VEHICLE, { pollInterval: 10000 });

  const busStops =
    !busStopQuery.loading && !busStopQuery.error
      ? busStopQuery.data.busStops
      : null;
  const vehicle =
    !vehicleQuery.loading && !vehicleQuery.error
      ? vehicleQuery.data.vehicle
      : null;
  console.log(vehicle);
  return (
    <ReactMapGL {...viewport} onViewportChange={setViewport}>
      {locations.map(location => (
        <Marker latitude={location[1]} longitude={location[0]}>
          x
        </Marker>
      ))}
      {vehicle && (
        <VehicleMarker
          latitude={vehicle.coords.x}
          longitude={vehicle.coords.y}
          bearing={vehicle.bearing}
        />
      )}
      {busStops &&
        busStops.map(busStop => (
          <BusStopMarker
            latitude={busStop.coords.x}
            longitude={busStop.coords.y}
            icon={busStop.icon}
          />
        ))}
    </ReactMapGL>
  );
}

export default Map;
