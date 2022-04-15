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
import Set from "./views/Set.tsx"
import HueLights from "./views/HueLights.js"
import SSBM from "./views/SSBM.tsx"
import BedFrame from "./views/BedFrame.tsx"
import SwiftneyGame from "./views/SwiftneyGame.js"
import ChessOpenings from "./views/ChessOpenings.js"
import SurvivorBracket from "./views/SurvivorBracket.tsx"
import MarchMadnessFAQ from "./views/MarchMadnessFAQ.tsx"
import AuthExample from "./views/AuthExample.js"
import RiddlerWarfare from "./views/RiddlerWarfare.tsx"
import LudwigChess from "./views/LudwigChess.js"
import LudwigChessHostLanding from "./views/LudwigChessHostLanding";
import LudwigChessInviteLanding from "./views/LudwigChessInviteLanding";

const reload = () => window.location.reload();

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

      <Route path="/AuthExample">
        <AuthExample />
      </Route>

      <Route path="/RiddlerWarfare">
        <RiddlerWarfare />
      </Route>
{/* 
      <Route exact path="/LudwigChess/Join">
        <LudwigChessAudienceChess />
      </Route> */}

      <Route path="/LudwigChess/:gameID/:name">
        <LudwigChess />
      </Route>

      <Route path="/LudwigChess/:gameID/">
        <LudwigChessInviteLanding />
      </Route>

      <Route path="/LudwigChess/">
        <LudwigChessHostLanding />
      </Route>

      {/* <Route path="%PUBLIC_URL%/.well-known/apple-app-site-association" onEnter={reload} /> */}

      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);