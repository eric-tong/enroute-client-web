// @flow

import { _MapContext as MapContext } from "react-map-gl";
import locations from "../../locations";
import { useContext } from "react";

export default function RouteLine() {
  const mapContext = useContext(MapContext);
  mapContext.map.addLayer({
    id: "route",
    type: "line",
    source: {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: locations,
        },
      },
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#8BC34A",
      "line-width": 2,
    },
  });
  return null;
}
