// @flow

import { ON_TIME_BUFFER } from "../../../constants";
import React from "react";
import { getClass } from "../../../utils/jsxUtil";

export default function TimeWithAlertTag({
  predicted,
  scheduled,
  showOnTime = false,
  disabled = false
}: {
  predicted: DateTime,
  scheduled: DateTime,
  showOnTime?: boolean,
  disabled?: boolean
}) {
  const delay = predicted.toMillis() - scheduled.toMillis();
  const status =
    delay > ON_TIME_BUFFER
      ? "late"
      : delay < -1 * ON_TIME_BUFFER
      ? "early"
      : "onTime";

  const timeClass = getClass(
    "time",
    status === "late" ? "warning" : status === "early" ? "accent" : undefined,
    disabled ? "disabled" : undefined
  );
  const tagClass = getClass(
    "tag",
    "ghost",
    status === "late" ? "warning" : status === "early" ? "accent" : undefined
  );
  const tagText =
    status === "late" ? "Delayed" : status === "early" ? "Early" : "On Time";

  return (
    <>
      <span className={timeClass}>{predicted.toFormat("h:mm a")}</span>
      {!disabled &&
        (status !== "onTime" || (status === "onTime" && showOnTime)) && (
          <span className={tagClass}>{tagText}</span>
        )}
    </>
  );
}
