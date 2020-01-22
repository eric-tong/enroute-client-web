// @flow

import React from "react";

export default function TimeWithAlertTag({
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
