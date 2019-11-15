// @flow

import React from "react";
import VehicleIcon from "./VehicleIcon.react";
import useMarkerStyle from "../../../utils/useMarkerStyle";

type Props = {
  longitude: number,
  latitude: number,
  bearing: number,
};

export default function VehicleMarker({ longitude, latitude, bearing }: Props) {
  const markerStyle = useMarkerStyle(longitude, latitude);

  const offset = 35;
  const offsetMarkerStyle = {
    ...markerStyle,
    left: markerStyle.left - offset,
    top: markerStyle.top - offset,
  };

  return (
    <div style={offsetMarkerStyle}>
      <VehicleIcon bearing={bearing} />
    </div>
  );
}
