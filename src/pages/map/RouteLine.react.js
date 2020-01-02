// @flow

import { _MapContext as MapContext } from "react-map-gl";
import { gql } from "apollo-boost";
import { useContext } from "react";
import { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

const ROUTE = gql`
  {
    route {
      longitude
      latitude
    }
  }
`;

export default function RouteLine() {
  const mapContext = useContext(MapContext);
  const { loading, error, data } = useQuery(ROUTE);

  useEffect(() => {
    if (!loading && !error) {
      const map = mapContext.map;
      const firstSymbolId = map
        .getStyle()
        .layers.find(layer => layer.type === "symbol").id;
      map.addLayer(
        {
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: data.route.map(({ longitude, latitude }) => [
                  longitude,
                  latitude,
                ]),
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
        },
        firstSymbolId
      );
    }
    // eslint-disable-next-line
  }, [loading, data]);

  return null;
}
