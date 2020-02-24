// @flow

import "../../styles/passenger.scss";

import React, { useState } from "react";

import CheckInPage from "./CheckInPage.react";
import { getClass } from "../../utils/jsxUtil";
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
    <section id="panel" className="passenger">
      <h1>Passenger</h1>
      {body}
    </section>
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
  const [warning, setWarning] = useState<boolean>(false);

  const submit = event => {
    event.preventDefault();
    const id = parseInt(userId, 10);
    if (userId.length === 0 || id < 1 || id > 1e6) {
      setWarning(true);
    } else {
      onSubmit(parseInt(userId));
    }
  };

  return (
    <>
      <h2>
        To provide the best service, we require passengers to check in when
        using the Minibus service.
      </h2>
      <p>
        Please enter your Passenger ID as shown on the Minibus Card issued to
        you.
      </p>
      <p
        className={getClass(
          "input-message",
          "warning",
          warning ? "visible" : undefined
        )}
      >
        Enter a valid ID
      </p>
      <form className="center" onSubmit={submit}>
        <input
          type="number"
          placeholder="Enter Passenger ID"
          className={getClass(
            "large-input",
            "center",
            warning ? "warning" : undefined
          )}
          value={userId}
          onChange={event => setUserId(event.target.value)}
        />
      </form>
      <button className="big center" onClick={submit}>
        Continue
      </button>
      <p className="center guest-sign-in">
        No Minibus Card?{" "}
        <button onClick={onSelectGuest}>Sign in as guest</button>
      </p>
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
