// @flow

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useState } from "react";

type Status =
  | "user"
  | "guest"
  | "origin"
  | "destination"
  | "loading"
  | "confirmed"
  | "error";

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

export default function useCheckIn(): {
  status: Status,
  userId: ?number,
  guestCompany: ?string,
  origin: ?BusStop,
  destination: ?BusStop,
  setUserId: number => void,
  setGuestCompany: string => void,
  setOrigin: BusStop => void,
  setDestination: BusStop => void,
  changeUser: () => void,
  submit: () => void,
  undo: () => void
} {
  const previousUserId = localStorage.getItem("userId");
  const previousGuestCompany = localStorage.getItem("guestCompany");

  const [userId, setUserId] = useState<?number>(
    previousUserId ? parseInt(previousUserId) : undefined
  );
  const [guestCompany, setGuestCompany] = useState<?string>(
    previousGuestCompany ?? undefined
  );
  const [origin, setOrigin] = useState<?BusStop>();
  const [destination, setDestination] = useState<?BusStop>();

  const [checkInId, checkIn, checkOut] = useDeferredCheckInId();

  const status: Status = (() => {
    if (typeof userId === "undefined") return "user";
    if (userId === 0 && typeof guestCompany === "undefined") return "guest";
    if (!origin) return "origin";
    if (!destination) return "destination";
    if (!checkInId) return "loading";
    if (checkInId > 0) return "confirmed";
    return "error";
  })();

  const changeUser = () => {
    setUserId();
    setGuestCompany();
  };
  const submit = () => {
    checkIn({
      userId,
      originId: origin?.id,
      destinationId: destination?.id,
      remarks: guestCompany
    });
  };
  const undo = checkOut;

  return {
    status,
    userId,
    guestCompany,
    origin,
    destination,
    setUserId,
    setGuestCompany,
    setOrigin,
    setDestination,
    changeUser,
    submit,
    undo
  };
}

function useDeferredCheckInId() {
  const [checkIn, { data: checkInData }] = useMutation(CREATE_NEW_CHECK_IN);
  const [checkOut, { data: checkOutData }] = useMutation(CHECK_OUT);
  const checkInId = checkInData?.createNewCheckIn;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const deferredCheckIn = (...args) => {
    checkIn(...args);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  if (checkOutData && checkOutData.id === -1)
    console.error("Tried to delete check in entry that doesn't exist");

  return [
    isLoading ? undefined : checkInId,
    deferredCheckIn,
    () => checkOut({ variables: { id: checkInId } })
  ];
}
