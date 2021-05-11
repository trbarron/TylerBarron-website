import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './index.scss';

import Profile from "./views/Profile.js";
import Home from "./views/Home.js";
import TheRiddler from "./views/TheRiddler.js";
import CamelUpCup from "./views/CamelUpCup.js";
import GenerativeArt from "./views/GenerativeArt.js"
import BoulderingTracker from "./views/BoulderingTracker.js"
import Set from "./views/Set.js"
import HueLights from "./views/HueLights.js"
import SSBM from "./views/SSBM.js"
import BedFrame from "./views/BedFrame.js"
import SwiftneyGame from "./views/SwiftneyGame.js"
import ChessOpenings from "./views/ChessOpenings.js"
import SurvivorBracket from "./views/SurvivorBracket.js"
import MarchMadnessFAQ from "./views/MarchMadnessFAQ.js"

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

      <Route path="/GenerativeArt">
        <GenerativeArt />
      </Route>

      <Route path="/BoulderingTracker">
        <BoulderingTracker />
      </Route>

      <Route path="/Set">
        <Set />
      </Route>

      <Route path="/HueLights">
        <HueLights />
      </Route>

      <Route path="/SSBM">
        <SSBM />
      </Route>

      <Route path="/BedFrame">
        <BedFrame />
      </Route>

      <Route path="/SwiftneyGame">
        <SwiftneyGame />
      </Route>

      <Route path="/ChessOpenings">
        <ChessOpenings />
      </Route>

      <Route path="/MarchMadness">
        <SurvivorBracket />
      </Route>

      <Route path="/MarchMadnessFAQ">
        <MarchMadnessFAQ />
      </Route>

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);