import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './index.scss';

import SurvivorBracket from "./views/SurvivorBracket.js"
import SurvivorUsers from "./views/SurvivorUsers.js"


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/Users">
        <SurvivorUsers />
      </Route>
      <Route path="/">
        <SurvivorBracket />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);