// @flow

import "../../../styles/detail-view-tile.scss";

import { DateTime } from "luxon";
import React from "react";
import { getHumanReadableTime } from "../../../utils/timeUtil";

type Props = {|
  departure: Departure
|};

const STOPS = [
  "Oxford Town Centre",
  "Department of Materials",
  "Summertown Shops",
  "Parkway Park & Ride",
  "Begbroke Science Park"
];

export default function BusStopDetailViewTile({
  departure: { scheduled, predicted }
}: Props) {
  const now = DateTime.local();
  const delay = (predicted.toMillis() - scheduled.toMillis()) / 60 / 1000;
  const status = delay > 2 ? "delayed" : delay < -2 ? "early" : "onTime";

  return (
    <div className="detail-view-tile">
      <header>
        <div className="subheader left">
          <h1>{getHumanReadableTime(now, predicted)}</h1>
        </div>
        <div className="subheader right">
          <p>
            <TimeWithAlertTag
              predicted={predicted}
              scheduled={scheduled}
              showOnTime={true}
            />
          </p>
          <h3>Scheduled {scheduled.toFormat("h:mm a")}</h3>
        </div>
      </header>
      <div className="lower-half">
        <h3>Bus Route</h3>
        <ul className="route">
          {STOPS.map(stop => (
            <li>
              <div className="icon">
                <div className="wrapper">
                  <div className="bar" />
                </div>
                <div className="wrapper">
                  <div className="bullet" />
                </div>
              </div>
              <span className="name">{stop}</span>
              <TimeWithAlertTag predicted={predicted} scheduled={scheduled} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TimeWithAlertTag({
  predicted,
  scheduled,
  showOnTime = false
}: {
  predicted: DateTime,
  scheduled: DateTime,
  showOnTime?: boolean
}) {
  const delay = (predicted.toMillis() - scheduled.toMillis()) / 60 / 1000;

  return delay > 2 ? (
    <>
      <span className="time warning">{predicted.toFormat("h:mm a")}</span>
      <span className="tag ghost warning">Delayed</span>
    </>
  ) : delay < -2 ? (
    <>
      <span className="time accent">{predicted.toFormat("h:mm a")}</span>
      <span className="tag ghost accent">Early</span>
    </>
  ) : (
    <>
      <span className="time">{predicted.toFormat("h:mm a")}</span>
      {showOnTime && <span className="tag ghost">On Time</span>}
    </>
  );
}
