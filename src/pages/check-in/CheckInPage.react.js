// @flow

import "../../styles/checkmark.scss";
import "../../styles/check-in.scss";

import React, { useState } from "react";

import useCheckIn from "../../utils/useCheckIn";

export default function CheckInPage() {
  const checkIn = useCheckIn();
  console.log(checkIn);

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
      case "origin":
        return "origin";
      case "destination":
        return "destination";
      case "loading":
        return (
          <ConfirmationSection isLoading={true} onUndoClick={checkIn.undo} />
        );
      case "confirmed":
        return (
          <ConfirmationSection isLoading={false} onUndoClick={checkIn.undo} />
        );
      default:
        return <ErrorSection />;
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

function ConfirmationSection({
  isLoading,
  onUndoClick
}: {
  isLoading: boolean,
  onUndoClick: () => void
}) {
  return (
    <section className="confirmation">
      <div className="half-section">
        <CheckMark isLoading={isLoading} />
      </div>
      <div className="half-section">
        <h2>{isLoading ? "Checking in..." : "Check in successful"}</h2>
        {!isLoading && (
          <p>
            Checked in successfully.{" "}
            <button onClick={onUndoClick}>Change.</button>
          </p>
        )}
      </div>
    </section>
  );
}

function ErrorSection() {
  return (
    <section className="confirmation">
      <div className="half-section"></div>
      <div className="half-section">
        <h2>An error has occurred</h2>
        <p>Refresh this page to try again.</p>
      </div>
    </section>
  );
}

function CheckMark({ isLoading }: { isLoading: boolean }) {
  return (
    <div className={`circle-loader ${!isLoading ? "load-complete" : ""}`}>
      {!isLoading && <div className="checkmark draw"></div>}
    </div>
  );
}
