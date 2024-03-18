import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';

// Import your views
import Profile from "./views/Profile";
import Home from "./views/Home";
import TheRiddler from "./views/TheRiddler.js";
import CamelUpCup from "./views/CamelUpCup";
import GenerativeArt from "./views/GenerativeArt";
import BoulderingTracker from "./views/BoulderingTracker";
import Set from "./views/Set";
import SSBM from "./views/SSBM";
import SwiftneyGame from "./views/SwiftneyGame.js";
import ChessOpenings from "./views/ChessOpenings.js";
import ChesserGuesserUnlimited from "./views/ChesserGuesserUnlimited.js";
import ChesserGuesserDaily from "./views/ChesserGuesserDaily.js";
import ChesserGuesserLanding from "./views/ChesserGuesserLanding.js";
import RiddlerWarfare from "./views/RiddlerWarfare";
import LudwigChess from "./views/LudwigChess.js";
import LudwigChessHostLanding from "./views/LudwigChessHostLanding";
import LudwigChessInviteLanding from "./views/LudwigChessInviteLanding";
import LudwigChessAudienceChess from "./views/LudwigChessAudienceLanding";

// Import PostHog
import { PostHogProvider } from 'posthog-js/react';

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostHogProvider 
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/profile" component={Profile} />
          <Route path="/TheRiddler" component={TheRiddler} />
          <Route path="/CamelUpCup" component={CamelUpCup} />
          <Route path="/GenerativeArt" component={GenerativeArt} />
          <Route path="/BoulderingTracker" component={BoulderingTracker} />
          <Route path="/Set" component={Set} />
          <Route path="/SSBM" component={SSBM} />
          <Route path="/SwiftneyGame" component={SwiftneyGame} />
          <Route path="/ChessOpenings" component={ChessOpenings} />
          <Route path="/ChesserGuesserDaily/:name" component={ChesserGuesserDaily} />
          <Route path="/ChesserGuesserLanding" component={ChesserGuesserLanding} />
          <Route path="/ChesserGuesserUnlimited" component={ChesserGuesserUnlimited} />
          <Route path="/RiddlerWarfare" component={RiddlerWarfare} />
          <Route path="/LudwigChess/:gameID/:name" component={LudwigChess} />
          <Route path="/LudwigChess/:gameID/" component={LudwigChessInviteLanding} />
          <Route path="/LudwigChess/" component={LudwigChessHostLanding} />
          <Route path="/LudwigChessLanding/" component={LudwigChessAudienceChess} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </PostHogProvider>
  </React.StrictMode>
);
