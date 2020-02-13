// @flow

import BusStopIcon from "./BusStopIcon.react";
import React from "react";
import useMarkerStyle from "../../../utils/useMarkerStyle";

type Props = {
  longitude: number,
  latitude: number
};

export default function BusStopMarker({ longitude, latitude }: Props) {
  const markerStyle = useMarkerStyle(longitude, latitude, [35, 35]);

  return (
    <div className="map-icon-container bus-stop" style={markerStyle}>
      <BusStopIcon />
    </div>
  );
}
