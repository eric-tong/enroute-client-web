// @flow

import React, { useState } from "react";

function App() {
  const [data, setData] = useState();

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
    <div className="data-container">
      {data
        ? data.map(locationEntry => (
            <p>{new Date(locationEntry.timestamp).toString()}</p>
          ))
        : null}
    </div>
  );
}

export default App;
