import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LinkDetails from "./Pages/LinkDetails";
import CreateLink from "./Pages/CreateLink";
import ViewLinks from "./Pages/ViewLinks";
import Auth from "./Pages/Auth";

export const Routes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/create" exact>
          <CreateLink />
        </Route>
        <Route path="/links" exact>
          <ViewLinks />
        </Route>
        <Route path="/details/:id" exact>
          <LinkDetails />
        </Route>
        <Redirect to="/links" />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
