// @flow

import React from "react";
import useMarkerStyle from "../../utils/useMarkerStyle";
import BusStopIcon from "./BusStopIcon.react";

type Props = {
  longitude: number,
  latitude: number,
  bearing: number,
};

export default function BusStopMarker({ longitude, latitude, bearing }: Props) {
  const markerStyle = useMarkerStyle(longitude, latitude);

  const offsetMarkerStyle = {
    ...markerStyle,
    left: markerStyle.left - 35,
    top: markerStyle.top - 20,
  };

  return (
    <div style={offsetMarkerStyle}>
      <BusStopIcon />
    </div>
  );
}
