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
  const { avl, steps, index, setIndex } = useAvl();

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
        steps={steps}
        currentIndex={index}
        onValueChange={setIndex}
      />
    </>
  );
}

function useAvl() {
  const { loading, error, data } = useQuery(AVLS);
  const [index, setIndex] = useState<number>(Number.MAX_VALUE);

  useEffect(() => {
    if (!loading && !error) setIndex(data.avls.length - 1);
  }, [loading, error, data]);

  if (loading || error) {
    return {};
  } else {
    const steps = data.avls.length - 1;
    return {
      avl: data.avls[index],
      index: Math.min(index, steps),
      steps,
      setIndex,
    };
  }
}
