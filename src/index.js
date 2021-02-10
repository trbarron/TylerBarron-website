import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './index.scss';

import Profile from "./views/Profile.js";
import Home from "./views/Home.js";
import TheRiddler from "./views/TheRiddler.js";
import CamelUpCup from "./views/CamelUpCup.js";


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/TheRiddler">
        <TheRiddler />
      </Route>
      <Route path="/CamelUpCup">
        <CamelUpCup />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);