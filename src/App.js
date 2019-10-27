// @flow

import React, { useState } from "react";

type LocationEntry = {
  timestamp: string,
  coords: { x: number, y: number },
};

function App() {
  const [data: LocationEntry[], setData] = useState([]);

  fetch("https://enroute-platform.herokuapp.com/")
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
    .then(setData)
    .catch(console.log);
  return (
    <div className="container">
      {data.map((entry: LocationEntry) => (
        <Row entry={entry} />
      ))}
    </div>
  );
}

function Row({ entry }: { entry: LocationEntry }) {
  return (
    <>
      <div className="datetime">{new Date(entry.timestamp).toString()}</div>
      <div className="lat">{entry.coords.x}</div>
      <div className="long">{entry.coords.y}</div>
    </>
  );
}

export default App;
