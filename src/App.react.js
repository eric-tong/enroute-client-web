// @flow

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import CheckInPage from "./components/checkin/CheckInPage.react";
import MapPage from "./components/map/MapPage.react";
import React from "react";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route component={CheckInPage} path="/checkin" />
          <Route component={MapPage} path="/" c />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
