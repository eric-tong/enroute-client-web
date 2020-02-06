// @flow

import "../../../styles/detail-view-tile.scss";

import React, { useState } from "react";

import BusRoute from "./BusRoute.react";
import { DateTime } from "luxon";
import TimeWithAlertTag from "./TimeWithAlertTag.react";
import { getHumanReadableTime } from "../../../utils/timeUtil";

type Props = {|
  departure: {|
    ...Departure,
    trip: {|
      departures: {|
        ...Departure,
        busStop: BusStop
      |}[]
    |}
  |},
  collapsible?: boolean
|};

export default function BusStopDetailViewTile({
  departure: {
    predictedTime,
    scheduledTime,
    relevantTime,
    trip: { departures: tripDepartures }
  },
  collapsible = true
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(collapsible);

  const now = DateTime.local();

  return (
    <div
      className={`detail-view-tile
      ${collapsible ? "clickable-tile" : ""}
      ${isCollapsed ? "collapsed" : ""}`}
      onClick={
        collapsible ? () => setIsCollapsed(isCollapsed => !isCollapsed) : null
      }
    >
      <header>
        <div className="subheader left">
          <h1>{getHumanReadableTime(now, relevantTime)}</h1>
        </div>
        <div className="subheader right">
          <p>
            <TimeWithAlertTag
              predicted={relevantTime}
              scheduled={scheduledTime}
              showOnTime={true}
            />
          </p>
          <h3>Scheduled {scheduledTime.toFormat("h:mm a")}</h3>
        </div>
      </header>
      {!isCollapsed && (
        <div className="lower-half">
          <h3>Bus Route</h3>
          <BusRoute departures={tripDepartures} />
        </div>
      )}
    </div>
  );
}
