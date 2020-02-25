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
            onSubmit={value => checkIn.setUserId(parseInt(value, 10))}
            onToggleInputType={() => checkIn.setUserId(0)}
            status="user"
          />
        );
      case "guest":
        return (
          <UserIdSection
            onSubmit={checkIn.setGuestCompany}
            onToggleInputType={() => checkIn.setUserId(undefined)}
            status="guest"
          />
        );
      default:
        return (
          <>
            <SignedInHeader
              passengerId={checkIn.userId}
              guestCompany={checkIn.guestCompany}
              onChange={checkIn.changeUser}
            />
            <CheckInPage checkIn={checkIn} busStops={busStops} />
          </>
        );
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
  onToggleInputType,
  status
}: {
  onSubmit: string => void,
  onToggleInputType: () => void,
  status: "user" | "guest"
}) {
  const [value, setValue] = useState<string>("");
  const [warning, setWarning] = useState<boolean>(false);

  const submit = event => {
    event.preventDefault();
    const id = parseInt(value, 10);
    if (value.length === 0 || id < 1 || id > 1e7) {
      setWarning(true);
    } else {
      onSubmit(value);
    }
  };

  return (
    <div className="content">
      <h2>Sign in {status === "user" ? "with Passenger ID" : "as a guest"}</h2>
      <p>
        To improve our service, we require passengers to check in when using the
        Minibus service.{" "}
        {status === "user"
          ? "Please enter your Passenger ID as shown on the Minibus Card issued to you."
          : "Please enter the name of the company or department you are meeting with today."}
      </p>
      <p
        className={getClass(
          "input-message",
          "warning",
          warning ? "visible" : undefined
        )}
      >
        Enter a valid {status === "user" ? "ID" : "Company name"}.
      </p>
      <form className="center" onSubmit={submit}>
        <input
          type={status === "user" ? "number" : "text"}
          placeholder={
            status === "user" ? "Enter Passenger ID" : "Enter company name"
          }
          className={getClass(
            "large-input",
            "center",
            warning ? "warning" : undefined
          )}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </form>
      <button className="big center" onClick={submit}>
        Continue
      </button>
      <p className="center guest-sign-in">
        {status === "user" ? "No" : "Have a"} Minibus Card?{" "}
        <button onClick={onToggleInputType}>
          Sign in {status === "user" ? "as guest" : "with your ID"}
        </button>
      </p>
    </div>
  );
}

function SignedInHeader({
  passengerId,
  guestCompany,
  onChange
}: {
  passengerId: ?number,
  guestCompany: ?string,
  onChange: () => void
}) {
  return guestCompany ? (
    <div className="tile">
      <div className="header">
        <h3>Guest</h3>
        <button onClick={onChange}>Sign out</button>
      </div>
      <div className="content">{guestCompany}</div>
    </div>
  ) : (
    <div className="tile">
      <div className="header">
        <h3>Passenger ID</h3>
        <button onClick={onChange}>Sign out</button>
      </div>
      <div className="content">
        {passengerId ? passengerId.toString().padStart(5, "0") : null}
      </div>
    </div>
  );
}
