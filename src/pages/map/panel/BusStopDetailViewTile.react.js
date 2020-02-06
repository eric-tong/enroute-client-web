// @flow

import "../../../styles/detail-view-tile.scss";

import React, { useState } from "react";

import BusRoute from "./BusRoute.react";
import { DateTime } from "luxon";
import { TIME_FORMAT } from "../../../constants";
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
  departure: { trip, ...departure },
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
          <h1>{getHumanReadableTime(now, departure.relevantTime)}</h1>
        </div>
        <div className="subheader right">
          <p>
            <TimeWithAlertTag departure={departure} detailed={true} />
          </p>
          <h3>Scheduled {departure.scheduledTime.toFormat(TIME_FORMAT)}</h3>
        </div>
      </header>
      {!isCollapsed && (
        <div className="lower-half">
          <h3>Bus Route</h3>
          <BusRoute departures={trip.departures} />
        </div>
      )}
    </div>
  );
}
