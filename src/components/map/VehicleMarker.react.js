// @flow

import React from "react";
import VehicleIcon from "./VehicleIcon.react";
import useViewport from "../../utils/useViewport";

type Props = {
  longitude: number,
  latitude: number,
  bearing: number,
};

export default function VehicleMarkerWrapper({
  longitude,
  latitude,
  bearing,
}: Props) {
  const { left, top, isDragging, isZooming } = useViewport(longitude, latitude);

  const markerStyle = {
    left: left,
    top: top,
    transition:
      !isDragging && !isZooming
        ? "left 200ms, top 200ms, transform 200ms"
        : "none",
  };

  return (
    <div className="marker" style={markerStyle}>
      <VehicleIcon bearing={bearing} />
    </div>
  );
}
