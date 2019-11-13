// @flow

import React from "react";
import Map from "./map/Map.react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Map />
    </ApolloProvider>
  );
}

export default App;
