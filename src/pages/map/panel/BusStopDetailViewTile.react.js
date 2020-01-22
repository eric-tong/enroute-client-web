// @flow

import "../../../styles/detail-view-tile.scss";

import React, { useState } from "react";

import BusRoute from "./BusRoute.react";
import { DateTime } from "luxon";
import TimeWithAlertTag from "./TimeWithAlertTag.react";
import { getHumanReadableTime } from "../../../utils/timeUtil";

type Props = {|
  departure: {|
    ...DepartureString,
    trip: {|
      departures: {|
        ...DepartureString,
        busStop: BusStop
      |}[]
    |}
  |},
  collapsible?: boolean
|};

export default function BusStopDetailViewTile({
  departure: {
    scheduled,
    predicted,
    trip: { departures: tripDepartures }
  },
  collapsible = true
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(collapsible);

  const now = DateTime.local();
  const scheduledTime = DateTime.fromSQL(scheduled);
  const predictedTime = DateTime.fromSQL(predicted);

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
          <h1>{getHumanReadableTime(now, predictedTime)}</h1>
        </div>
        <div className="subheader right">
          <p>
            <TimeWithAlertTag
              predicted={predictedTime}
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
