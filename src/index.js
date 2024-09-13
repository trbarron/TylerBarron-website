import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initGA, withPageViewTracking } from './analytics';
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
import ChesserGuesserBlog from "./views/ChesserGuesserBlog.tsx";
import ChesserGuesserLanding from "./views/ChesserGuesserLanding.js";
import RiddlerWarfare from "./views/RiddlerWarfare";
import LudwigChess from "./views/LudwigChess.js";
import LudwigChessHostLanding from "./views/LudwigChessHostLanding";
import LudwigChessInviteLanding from "./views/LudwigChessInviteLanding";
import LudwigChessAudienceChess from "./views/LudwigChessAudienceLanding";
import CatTrackerBlog from "./views/CatTrackerBlog";
import CatTrackerLive from "./views/CatTrackerLive";
import CollaborativeCheckmate from "./views/collaborative_checkmate/CollaborativeCheckmate";

// Initialize Google Analytics on page load
initGA();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={withPageViewTracking(Profile)} />
          <Route path="/TheRiddler" element={withPageViewTracking(TheRiddler)} />
          <Route path="/CamelUpCup" element={withPageViewTracking(CamelUpCup)} />
          <Route path="/GenerativeArt" element={withPageViewTracking(GenerativeArt)} />
          <Route path="/BoulderingTracker" element={withPageViewTracking(BoulderingTracker)} />
          <Route path="/Set" element={withPageViewTracking(Set)} />
          <Route path="/SSBM" element={withPageViewTracking(SSBM)} />
          <Route path="/SwiftneyGame" element={withPageViewTracking(SwiftneyGame)} />
          <Route path="/ChessOpenings" element={withPageViewTracking(ChessOpenings)} />
          <Route path="/ChesserGuesserDaily/:name" element={withPageViewTracking(ChesserGuesserDaily)} />
          <Route path="/ChesserGuesserLanding" element={withPageViewTracking(ChesserGuesserLanding)} />
          <Route path="/ChesserGuesserUnlimited" element={withPageViewTracking(ChesserGuesserUnlimited)} />
          <Route path="/ChesserGuesserBlog" element={withPageViewTracking(ChesserGuesserBlog)} />
          <Route path="/RiddlerWarfare" element={withPageViewTracking(RiddlerWarfare)} />
          <Route path="/CatTracker/Blog" element={withPageViewTracking(CatTrackerBlog)} />
          <Route path="/CatTracker/Live" element={withPageViewTracking(CatTrackerLive)} />
          <Route path="/LudwigChess/:gameID/:name" element={withPageViewTracking(LudwigChess)} />
          <Route path="/LudwigChess/:gameID" element={withPageViewTracking(LudwigChessInviteLanding)} />
          <Route path="/LudwigChess" element={withPageViewTracking(LudwigChessHostLanding)} />
          <Route path="/LudwigChessLanding" element={withPageViewTracking(LudwigChessAudienceChess)} />
          <Route path="/CollaborativeCheckmate/:gameID/:name" element={withPageViewTracking(CollaborativeCheckmate)} />
          <Route path="/" element={withPageViewTracking(Home)} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);