// @flow

import React, { useState } from "react";

import CheckInPage from "./CheckInPage.react";
import useBusStops from "../../utils/useBusStops";
import useCheckIn from "../../utils/useCheckIn";

export default function PassengerPage() {
  const checkIn = useCheckIn();
  const busStops = useBusStops();
  console.log({ checkIn });

  const body = (() => {
    switch (checkIn.status) {
      case "user":
        return (
          <UserIdSection
            onSubmit={checkIn.setUserId}
            onSelectGuest={() => checkIn.setUserId(0)}
          />
        );
      case "guest":
        return <GuestSection onSubmit={checkIn.setGuestCompany} />;
      default:
        return <CheckInPage checkIn={checkIn} busStops={busStops} />;
    }
  })();

  return (
    <main className="check-in-container">
      <header>
        <h1>Check in</h1>
      </header>
      {body}
    </main>
  );
}

function UserIdSection({
  onSubmit,
  onSelectGuest
}: {
  onSubmit: number => void,
  onSelectGuest: () => void
}) {
  const [userId, setUserId] = useState<string>("");
  return (
    <>
      <input
        type="number"
        placeholder="User Id"
        value={userId}
        onChange={event => setUserId(event.target.value)}
      />
      <button onClick={() => onSubmit(parseInt(userId))}>Continue</button>
      <button onClick={onSelectGuest}>Sign in as guest</button>
    </>
  );
}

function GuestSection({ onSubmit }: { onSubmit: string => void }) {
  const [guestCompany, setGuestCompany] = useState<string>("");

  return (
    <>
      <input
        type="text"
        placeholder="Company name"
        value={guestCompany}
        onChange={event => setGuestCompany(event.target.value)}
      />
      <button onClick={() => onSubmit(guestCompany)}>Continue</button>
    </>
  );
}
