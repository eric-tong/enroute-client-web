// @flow

import { useEffect, useState } from "react";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

type Status =
  | "user"
  | "guest"
  | "direction"
  | "origin"
  | "destination"
  | "loading"
  | "confirmed"
  | "error";

export type CheckIn = {
  status: Status,
  userId: ?number,
  guestCompany: ?string,
  direction: ?string,
  origin: ?BusStop,
  destination: ?BusStop,
  previousCheckIns: [BusStop, BusStop][],
  setDirection: (?string) => void,
  setUserId: (?number) => void,
  setGuestCompany: (?string) => void,
  setOrigin: BusStop => void,
  setDestination: BusStop => void,
  changeUser: () => void,
  undo: () => void
};

const CREATE_NEW_CHECK_IN = gql`
  mutation createNewCheckIn(
    $userId: Int!
    $originId: Int!
    $destinationId: Int!
    $remarks: String
  ) {
    createNewCheckIn(
      userId: $userId
      originId: $originId
      destinationId: $destinationId
      remarks: $remarks
    )
  }
`;
const CHECK_OUT = gql`
  mutation checkOut($id: Int!) {
    checkOut(id: $id)
  }
`;

export default function useCheckIn(): CheckIn {
  const previousUserId = localStorage.getItem("userId");
  const previousGuestCompany = localStorage.getItem("guestCompany");

  const [userId, setUserId] = useState<?number>(
    previousUserId ? parseInt(previousUserId) : undefined
  );
  const [guestCompany, setGuestCompany] = useState<?string>(
    previousGuestCompany ?? undefined
  );
  const [direction, setDirection] = useState<?string>();
  const [origin, setOrigin] = useState<?BusStop>();
  const [destination, setDestination] = useState<?BusStop>();

  const [previousCheckIns] = useState<[BusStop, BusStop][]>(
    getPreviousCheckIn()
  );

  const [checkInId, checkIn, checkOut] = useDeferredCheckInId();

  const status: Status = (() => {
    if (typeof userId === "undefined") return "user";
    if (userId === 0 && typeof guestCompany === "undefined") return "guest";
    if (!direction) return "direction";
    if (!origin) return "origin";
    if (!destination) return "destination";
    if (!checkInId) return "loading";
    if (checkInId > 0) return "confirmed";
    return "error";
  })();

  useEffect(() => {
    if (typeof userId !== "undefined" && origin && destination) {
      checkIn({
        variables: {
          userId,
          originId: parseInt(origin?.id),
          destinationId: parseInt(destination?.id),
          remarks: guestCompany
        }
      });
      addPreviousCheckIn(origin, destination);
    }
    // eslint-disable-next-line
  }, [userId, origin, destination]);

  return {
    status,
    userId,
    guestCompany,
    direction,
    origin,
    destination,
    previousCheckIns,
    setDirection,
    setUserId: userId => {
      if (userId || userId === 0) {
        localStorage.setItem("userId", userId.toString(10));
      } else {
        localStorage.removeItem("userId");
      }
      setUserId(userId);
    },
    setGuestCompany: guestCompany => {
      if (guestCompany) {
        localStorage.setItem("guestCompany", guestCompany);
      } else {
        localStorage.removeItem("guestCompany");
      }
      setGuestCompany(guestCompany);
    },
    setOrigin,
    setDestination,
    changeUser: () => {
      localStorage.removeItem("userId");
      localStorage.removeItem("guestCompany");
      setUserId();
      setGuestCompany();
      setDirection();
      setOrigin();
      setDestination();
    },
    undo: () => {
      checkOut();
      setDirection();
      setOrigin();
      setDestination();
    }
  };
}

function useDeferredCheckInId() {
  const [checkIn, { data: checkInData }] = useMutation(CREATE_NEW_CHECK_IN);
  const [checkOut, { data: checkOutData }] = useMutation(CHECK_OUT);
  const checkInId = checkInData?.createNewCheckIn;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const deferredCheckIn = (...args) => {
    setIsLoading(true);
    checkIn(...args);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  if (checkOutData && checkOutData.id === -1)
    console.error("Tried to delete check in entry that doesn't exist");

  return [
    isLoading ? undefined : checkInId,
    deferredCheckIn,
    () => {
      setIsLoading(true);
      checkOut({ variables: { id: checkInId } });
    }
  ];
}

function getPreviousCheckIn(): [BusStop, BusStop][] {
  const previousCheckInJson = localStorage.getItem("checkIns");
  return previousCheckInJson ? JSON.parse(previousCheckInJson) : [];
}

function addPreviousCheckIn(origin: BusStop, destination: BusStop) {
  const previousCheckIn = getPreviousCheckIn();
  if (
    !previousCheckIn.find(
      previous =>
        previous[0].id !== origin.id && previous[1].id !== destination.id
    )
  ) {
    previousCheckIn.unshift([origin, destination]);
    localStorage.setItem(
      "checkIns",
      JSON.stringify(previousCheckIn.slice(0, 2))
    );
  }
}
