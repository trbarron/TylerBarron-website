import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './index.css';

import Profile from "./views/Profile";
import Home from "./views/Home";
import TheRiddler from "./views/TheRiddler.js";
import CamelUpCup from "./views/CamelUpCup";
import GenerativeArt from "./views/GenerativeArt"
import BoulderingTracker from "./views/BoulderingTracker"
import Set from "./views/Set"
import SSBM from "./views/SSBM"
import SwiftneyGame from "./views/SwiftneyGame.js"
import ChessOpenings from "./views/ChessOpenings.js"
import RiddlerWarfare from "./views/RiddlerWarfare"
import LudwigChess from "./views/LudwigChess.js"
import LudwigChessHostLanding from "./views/LudwigChessHostLanding";
import LudwigChessInviteLanding from "./views/LudwigChessInviteLanding";
import LudwigChessAudienceChess from "./views/LudwigChessAudienceLanding";

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

      <Route path="/SSBM">
        <SSBM />
      </Route>

      <Route path="/SwiftneyGame">
        <SwiftneyGame />
      </Route>

      <Route path="/ChessOpenings">
        <ChessOpenings />
      </Route>

      <Route path="/RiddlerWarfare">
        <RiddlerWarfare />
      </Route>

      <Route path="/LudwigChess/:gameID/:name">
        <LudwigChess />
      </Route>

      <Route path="/LudwigChess/:gameID/">
        <LudwigChessInviteLanding />
      </Route>

      <Route path="/LudwigChess/">
        <LudwigChessHostLanding />
      </Route>
      <Route path="/LudwigChessLanding/">
        <LudwigChessAudienceChess />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);