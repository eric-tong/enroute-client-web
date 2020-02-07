// @flow

import React from "react";
import { TIME_FORMAT } from "../../../constants";
import { getClass } from "../../../utils/jsxUtil";

const ACCENT_TEXT_STATUSES = ["early", "arriving", "now"];
const WARNING_TEXT_STATUSES = ["late"];
const STATUSES_TO_INCLUDE_ONLY_IF_DETAILED: DepartureStatus[] = [
  "onTime",
  "departed",
  "none"
];

export default function TimeWithAlertTag({
  departure: { status, relevantTime },
  detailed = false,
  disabled = false
}: {
  departure: Departure,
  detailed?: boolean,
  disabled?: boolean
}) {
  const showTag = !disabled;
  const timeClass = getClass(
    "time",
    showTag && WARNING_TEXT_STATUSES.includes(status) ? "warning" : undefined,
    showTag && ACCENT_TEXT_STATUSES.includes(status) ? "accent" : undefined,
    disabled ? "disabled" : undefined
  );

  return (
    <>
      <span className={timeClass}>{relevantTime.toFormat(TIME_FORMAT)}</span>
      {showTag && <Tag status={status} detailed={detailed} />}
    </>
  );
}

function Tag({
  status,
  detailed
}: {
  status: DepartureStatus,
  detailed: boolean
}) {
  if (!detailed && STATUSES_TO_INCLUDE_ONLY_IF_DETAILED.includes(status)) {
    return null;
  }
  switch (status) {
    case "onTime":
      return <div className="tag ghost">On Time</div>;
    case "arriving":
      return <div className="tag ghost accent">Arriving</div>;
    case "early":
      return <div className="tag ghost accent">Early</div>;
    case "late":
      return <div className="tag ghost warning">Delayed</div>;
    case "now":
      return <div className="tag ghost accent">Now</div>;
    case "skipped":
      return <div className="tag ghost">Skipped</div>;
    case "departed":
      return <div className="tag ghost">Departed</div>;
    default:
      return <div className="tag ghost">Scheduled</div>;
  }
}
