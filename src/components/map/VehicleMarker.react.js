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
    position: "absolute",
    left: left,
    top: top,
    transform: "translate(-35px, -35px)",
    transition: "none",
  };

  if (!isDragging && !isZooming)
    markerStyle.transition = "left 200ms, top 200ms, transform 200ms";

  return (
    <div style={markerStyle}>
      <VehicleIcon bearing={bearing} />
    </div>
  );
}
