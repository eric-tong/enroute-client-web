// @flow

import { DateTime } from "luxon";
import { ON_TIME_BUFFER } from "../constants";

export function formatDepartureData({
  scheduledTimestamp,
  predictedTimestamp,
  actualTimestamp,
  status: dataStatus
}: DepartureData): Departure {
  const scheduledTime = DateTime.fromSQL(scheduledTimestamp);
  const predictedTime =
    predictedTimestamp && DateTime.fromSQL(predictedTimestamp);
  const actualTime = actualTimestamp && DateTime.fromSQL(actualTimestamp);
  const predictionDelta = predictedTime
    ? Math.floor(
        Math.abs(
          (predictedTime.valueOf() - scheduledTime.valueOf()) / 60 / 1000
        )
      )
    : undefined;

  const status = getStatus(dataStatus, scheduledTime, predictedTime);
  const now = DateTime.local();
  let relevantTime;
  switch (status) {
    case "onTime":
    case "arriving":
    case "early":
    case "late":
      relevantTime = predictedTime;
      break;
    case "now":
      relevantTime = now;
      break;
    case "skipped":
    case "departed":
      relevantTime = predictedTime ?? actualTime ?? scheduledTime;
      break;
    default:
      relevantTime = scheduledTime;
      break;
  }

  return {
    scheduledTime,
    predictedTime,
    actualTime,
    relevantTime,
    predictionDelta,
    status
  };
}

function getStatus(
  dataStatus: DepartureDataStatus,
  scheduledTime: DateTime,
  predictedTime: ?DateTime
): DepartureStatus {
  switch (dataStatus) {
    case "arriving":
      if (!predictedTime) return "none";

      const now = DateTime.local();
      const timeToArrival = predictedTime.valueOf() - now.valueOf();
      if (timeToArrival < ON_TIME_BUFFER) return "arriving";

      const delta = predictedTime.valueOf() - scheduledTime.valueOf();
      if (delta < -1 * ON_TIME_BUFFER) {
        return "early";
      } else if (delta > ON_TIME_BUFFER) {
        return "late";
      } else {
        return "onTime";
      }
    case "now":
      return "now";
    case "departed":
      return "departed";
    case "skipped":
      return "skipped";
    default:
      return "none";
  }
}
