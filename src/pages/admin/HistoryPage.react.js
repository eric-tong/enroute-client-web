// @flow

import "../../styles/history.scss";

import React, { useEffect, useState } from "react";

import BusStopsOverlay from "../map/busStops/BusStopsOverlay.react";
import { DateTime } from "luxon";
import ReactMapGL from "react-map-gl";
import TimeTravelSlider from "../map/history/TimeTravelSlider.react";
import VehicleMarker from "../map/vehicles/VehicleMarker.react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import useViewport from "../../utils/useViewport";

const AVLS = gql`
  query getAvls($date: String!) {
    avls(date: $date) {
      timestamp
      latitude
      longitude
      angle
    }
  }
`;

export default function HistoryPage() {
  const [viewport, setViewport] = useViewport();
  const { date, increment, decrement } = useDate();
  const { avl, steps, index, setIndex } = useAvl(date);

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
      <div className="time-travel-slider-container">
        <div className="card">
          <h2 className="date">
            <button onClick={decrement}>&larr;</button>
            <p>{date.toLocaleString(DateTime.DATE_HUGE)}</p>
            <button onClick={increment} className={increment ? "" : "disabled"}>
              &rarr;
            </button>
          </h2>
          <p>
            {avl
              ? DateTime.fromMillis(parseInt(avl.timestamp, 10)).toLocaleString(
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true
                  }
                )
              : "Loading..."}
          </p>
          <TimeTravelSlider
            steps={steps}
            currentIndex={index}
            onValueChange={setIndex}
          />
        </div>
      </div>
    </>
  );
}

function useDate() {
  const today = DateTime.local().startOf("day");
  const [date, setDate] = useState(today);
  const isToday = today.valueOf() === date.valueOf();
  return {
    date,
    increment: isToday
      ? undefined
      : () => setDate(date => date.plus({ day: 1 })),
    decrement: () => setDate(date => date.minus({ day: 1 }))
  };
}

function useAvl(date: DateTime) {
  const { loading, error, data } = useQuery(AVLS, {
    variables: { date: date.toISO() }
  });
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
      setIndex
    };
  }
}
