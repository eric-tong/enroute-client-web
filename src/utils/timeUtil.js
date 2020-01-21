// @flow

import { DateTime } from "luxon";

export function getHumanReadableTime(start: DateTime, end: DateTime) {
  const duration = (end.toMillis() - start.toMillis()) / 60 / 1000;
  if (duration < 1) return "Now";

  const [hour, minute] = [duration / 60, duration % 60].map(Math.floor);
  return (hour > 0 ? `${hour} hr ` : "") + (minute > 0 ? `${minute} min ` : "");
}
