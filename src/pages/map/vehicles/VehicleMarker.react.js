// @flow

import { NavLink } from "react-router-dom";
import React from "react";
import VehicleIcon from "./VehicleIcon.react";
import useMarkerStyle from "../../../utils/useMarkerStyle";

type Props = {
  longitude: number,
  latitude: number,
  bearing: number,
  registration?: string
};

export default function VehicleMarker({
  longitude,
  latitude,
  bearing,
  registration
}: Props) {
  const markerStyle = useMarkerStyle(longitude, latitude, [35, 35]);

  return (
    <div className="map-icon-container" style={markerStyle}>
      <NavLink to={`/vehicle/${registration ?? ""}`}>
        <VehicleIcon bearing={bearing} />
      </NavLink>
    </div>
  );
}
