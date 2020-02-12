// @flow

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Back } from "./pages/misc/LiveMapButton.react";
import CheckInPage from "./pages/check-in/CheckInPage.react";
import HistoryPage from "./pages/admin/HistoryPage.react";
import Map from "./pages/map/Map.react";
import MapPage from "./pages/map/MapPage.react";
import React from "react";
import RecordsPage from "./pages/admin/RecordsPage.react";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route
            path="/checkin/:vehicleRegistration?"
            render={props => (
              <CheckInPage
                vehicleRegistration={props.match.params.vehicleRegistration}
              />
            )}
          />
          <Route
            path="/livemap"
            render={() => (
              <>
                <Back />
                <Map fullWidth={true} />
              </>
            )}
          />
          <Route path="/history" component={HistoryPage} />
          <Route path="/records" component={RecordsPage} />
          <Route path="/" component={MapPage} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
