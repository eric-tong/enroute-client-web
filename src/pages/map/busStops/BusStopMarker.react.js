// @flow

import BusStopIcon from "./BusStopIcon.react";
import React from "react";
import useMarkerStyle from "../../../utils/useMarkerStyle";

type Props = {
  longitude: number,
  latitude: number,
  icon: string
};

export default function BusStopMarker({ longitude, latitude, icon }: Props) {
  const markerStyle = useMarkerStyle(longitude, latitude, [35, 50]);

  return (
    <div style={markerStyle}>
      <BusStopIcon text={icon} />
    </div>
  );
}
