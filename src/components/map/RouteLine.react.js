// @flow

import { _MapContext as MapContext } from "react-map-gl";
import { gql } from "apollo-boost";
import { useContext } from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

const ROUTE = gql`
  {
    route {
      x
      y
    }
  }
`;

export default function RouteLine() {
  const mapContext = useContext(MapContext);
  const { loading, error, data } = useQuery(ROUTE);

  useEffect(() => {
    if (!loading && !error)
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
              coordinates: data.route.map(({ x, y }) => [y, x]),
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#C5E1A5",
          "line-width": 2,
        },
      });
    // eslint-disable-next-line
  }, [loading, data]);

  return null;
}
