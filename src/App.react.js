// @flow

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import BottomNavigation from "./pages/misc/BottomNavigation.react";
import CheckInPage from "./pages/passenger/CheckInPage.react";
import HistoryPage from "./pages/admin/HistoryPage.react";
import MapPage from "./pages/map/MapPage.react";
import PassengerPage from "./pages/passenger/PassengerPage.react";
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
          <Route path="/passenger" component={PassengerPage} />
          <Route path="/livemap" render={() => <MapPage mapOnly={true} />} />
          <Route path="/history" component={HistoryPage} />
          <Route path="/records" component={RecordsPage} />
          <Route path="/" component={MapPage} />
        </Switch>
        <BottomNavigation />
      </Router>
    </ApolloProvider>
  );
}

export default App;
