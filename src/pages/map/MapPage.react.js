// @flow

import React, { useState } from "react";

import BusStopsOverlay from "./busStops/BusStopsOverlay.react";
import ReactMapGL from "react-map-gl";
import RouteLine from "./RouteLine.react";
import VehiclesOverlay from "./vehicles/VehiclesOverlay.react";
import useViewport from "../../utils/useViewport";

function Map() {
  const [viewport, setViewport] = useViewport();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <ReactMapGL
        {...viewport}
        onViewportChange={setViewport}
        onLoad={() => setIsLoaded(true)}
      >
        {isLoaded && <RouteLine />}
        <VehiclesOverlay />
        <BusStopsOverlay />
      </ReactMapGL>
      <Panel />
    </>
  );
}

const arrivals = [
  {
    name: "Oxford Town Centre",
    scheduledTimes: ["1:00 pm", "1:25 pm", "2:10 pm", "2:50 pm", "3:10 pm"]
  },
  {
    name: "Oxford Town Centre",
    scheduledTimes: ["1:00 pm", "1:25 pm", "2:10 pm", "2:50 pm", "3:10 pm"]
  },
  {
    name: "Oxford Town Centre",
    scheduledTimes: ["1:00 pm", "1:25 pm", "2:10 pm", "2:50 pm", "3:10 pm"]
  },
  {
    name: "Oxford Town Centre",
    scheduledTimes: ["1:00 pm", "1:25 pm", "2:10 pm", "2:50 pm", "3:10 pm"]
  },
  {
    name: "Oxford Town Centre",
    scheduledTimes: ["1:00 pm", "1:25 pm", "2:10 pm", "2:50 pm", "3:10 pm"]
  },
  {
    name: "Oxford Town Centre",
    scheduledTimes: ["1:00 pm", "1:25 pm", "2:10 pm", "2:50 pm", "3:10 pm"]
  },
  {
    name: "Oxford Town Centre",
    scheduledTimes: ["1:00 pm", "1:25 pm", "2:10 pm", "2:50 pm", "3:10 pm"]
  },
  {
    name: "Oxford Town Centre",
    scheduledTimes: ["1:00 pm", "1:25 pm", "2:10 pm", "2:50 pm", "3:10 pm"]
  }
];

function Panel() {
  return (
    <section id="panel">
      <h1>Arrivals</h1>
      {arrivals.map(arrival => (
        <ArrivalTile {...arrival} />
      ))}
    </section>
  );
}

type Props = {
  name: string,
  scheduledTimes: string[]
};

function ArrivalTile({ name, scheduledTimes }: Props) {
  return (
    <div className="tile">
      <h2>Oxford Town Centre</h2>
      <p className="subtitle">
        <small>Broad Street</small>
        <span class="interpunct" />
        <small className="translucent">To Begbroke</small>
      </p>
      {scheduledTimes.map(scheduledTime => (
        <div key={scheduledTime} className="row">
          {scheduledTime}
          <small className="accent">On Time</small>
        </div>
      ))}
    </div>
  );
}

export default Map;
