// @flow

import React from "react";
import useMarkerStyle from "../../utils/useMarkerStyle";
import BusStopIcon from "./BusStopIcon.react";

type Props = {
  longitude: number,
  latitude: number,
  icon: string,
};

export default function BusStopMarker({ longitude, latitude, icon }: Props) {
  const markerStyle = useMarkerStyle(longitude, latitude);

  const offsetMarkerStyle = {
    ...markerStyle,
    left: markerStyle.left - 35,
    top: markerStyle.top - 50,
  };

  return (
    <div style={offsetMarkerStyle}>
      <BusStopIcon text={icon} />
    </div>
  );
}
