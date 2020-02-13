// @flow

import "../../../styles/map-icon.scss";

import React from "react";
import VehicleIcon from "./VehicleIcon.react";
import useMarkerStyle from "../../../utils/useMarkerStyle";

type Props = {
  longitude: number,
  latitude: number,
  bearing: number
};

export default function VehicleMarker({ longitude, latitude, bearing }: Props) {
  const markerStyle = useMarkerStyle(longitude, latitude, [35, 35]);

  return (
    <div className="map-icon-container" style={markerStyle}>
      <VehicleIcon bearing={bearing} />
    </div>
  );
}
