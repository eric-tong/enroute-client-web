// @flow

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import CheckInPage from "./components/checkIn/CheckInPage.react";
import HistoryPage from "./components/map/HistoryPage.react";
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
          <Route
            path="/checkin/:vehicleId?"
            render={props => (
              <CheckInPage vehicleId={props.match.params.vehicleId} />
            )}
          />
          <Route path="/history" component={HistoryPage} />
          <Route path="/" component={MapPage} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
