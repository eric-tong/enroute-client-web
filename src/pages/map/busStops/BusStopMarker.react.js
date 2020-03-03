// @flow

import BusStopIcon from "./BusStopIcon.react";
import { NavLink } from "react-router-dom";
import React from "react";
import useMarkerStyle from "../../../utils/useMarkerStyle";

type Props = {
  longitude: number,
  latitude: number,
  url: string
};

export default function BusStopMarker({ longitude, latitude, url }: Props) {
  const markerStyle = useMarkerStyle(longitude, latitude, [35, 35]);

  return (
    <div className="map-icon-container bus-stop" style={markerStyle}>
      <NavLink to={`/stop/${url}`}>
        <BusStopIcon />
      </NavLink>
    </div>
  );
}
