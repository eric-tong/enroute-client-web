// @flow

import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import VehicleMarker from "./VehicleMarker.react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import initialViewport from "../../styles/viewport";

const VEHICLE = gql`
  {
    vehicle {
      coords {
        x
        y
      }
    }
  }
`;

function Map() {
  const [viewport, setViewport] = useState(initialViewport);
  const { data, loading, error } = useQuery(VEHICLE, { pollInterval: 10000 });
  const coords = !loading && !error && data ? data.vehicle.coords : null;

  return (
    <ReactMapGL {...viewport} onViewportChange={setViewport}>
      {coords && (
        <VehicleMarker latitude={coords.x} longitude={coords.y} bearing={0} />
      )}
      <VehicleMarker latitude={51.779284} longitude={-1.265656} bearing={0} />
      <VehicleMarker
        latitude={51.81811946797804}
        longitude={-1.3066886590125932}
        bearing={0}
      />
      <VehicleMarker
        latitude={51.76010073596463}
        longitude={-1.2582452109397764}
        bearing={0}
      />
      <VehicleMarker
        latitude={51.75453480503126}
        longitude={-1.2556090514719926}
        bearing={0}
      />
    </ReactMapGL>
  );
}

export default Map;
