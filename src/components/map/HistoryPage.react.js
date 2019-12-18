// @flow

import React, { useEffect, useState } from "react";

import BusStopsOverlay from "./busStops/BusStopsOverlay.react";
import ReactMapGL from "react-map-gl";
import TimeTravelSlider from "./history/TimeTravelSlider.react";
import VehicleMarker from "./vehicles/VehicleMarker.react";
import { gql } from "apollo-boost";
import initialViewport from "../../styles/viewport";
import { useQuery } from "@apollo/react-hooks";

const AVLS = gql`
  {
    avls {
      timestamp
      latitude
      longitude
      angle
    }
  }
`;

export default function HistoryPage() {
  const [viewport, setViewport] = useState(initialViewport);
  const [timeIndex, setTimeIndex] = useState<number>(1);
  const { loading, error, data } = useQuery(AVLS);

  useEffect(() => {
    const isLoaded = !loading && !error && data.avls.length > 0;
    if (isLoaded) setTimeIndex(data.avls.length - 1);
  }, [data]);

  const isLoaded = !loading && !error && data.avls.length > 0;
  const index = isLoaded ? Math.min(timeIndex, data?.avls?.length - 1) : 1;
  const avl = isLoaded ? data.avls[index] : undefined;

  return (
    <>
      <ReactMapGL {...viewport} onViewportChange={setViewport}>
        {avl && (
          <VehicleMarker
            latitude={avl.latitude}
            longitude={avl.longitude}
            bearing={avl.angle}
          />
        )}
        <BusStopsOverlay />
      </ReactMapGL>
      <TimeTravelSlider
        steps={data?.avls?.length}
        currentIndex={index}
        onValueChange={setTimeIndex}
      />
    </>
  );
}
