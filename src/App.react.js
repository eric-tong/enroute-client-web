// @flow

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Map from "./components/map/Map.react";
import React from "react";

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
