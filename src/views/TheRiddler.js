import React from "react";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Photo from "../components/Photo.js";

import Paragraph from "../components/Paragraph.js";
import Riddler from "../components/Riddler.js";

import img from "../assets/img/me.jpg"
import riddlerLogo from "../assets/img/riddlerlogo.gif"

import pizzaDispenser from "../assets/img/pizza_dispenser.jpg"
import pizzaPath from "../assets/img/pizza_path.jpg"

import barronSquareFour from "../assets/img/barronSquareFour.jpg"
import barronSquareEight from "../assets/img/barronSquareEight.jpg"

import sixPuzzle from "../assets/img/sixPuzzle.jpg"

import uniqueTileSnips from "../assets/img/unique_tile_snips.png"

export default function TheRiddler() {

  return (
    <div className="bg-background">
      <Navbar/>
      <main>

        {/* <BottomStripe/> */}
          
        <Article
          title="FiveThirtyEight's The Riddler" 
          subtitle=""
        >
          <Subarticle
            subtitle="What is the Riddler?"
            content="The riddler is a weekly math, logic and probability problem hosted by fivethirtyeight.com, a statistically oriented politics, sports and culture blog."
          />

          <Photo
            src={riddlerLogo}
            alt="theRiddler"
          />

          <Paragraph
            content="If the answer is particularly cool or my solution can be extended, made interactable or generalized then I'll usually write it up. I've also created and submitted some problems that have been featured."
          />
        </Article>

        <Article
          title="Submitted Problems" 
          subtitle=""
        >
          <Subarticle subtitle="A Pizza Sauce Problem">
            {"This problem is about filling a pizza evenly with sauce"}

            <Riddler>
              {"You work for Puzzling Pizza, a company committed to making the best and most consistent pizzas in town. As the shop’s resident mathematician, your boss has asked you to design a product similar to one they saw online:"}
              <Photo src={pizzaDispenser} alt="test" />
              {"They’ve already purchased the equipment but need to know the exact path and flow rate the sauce-dispensing arm should use to fill a 12-inch circular pizza with sauce as fully and evenly as possible."}
            </Riddler>            

            {"This problem was unique in that I not only created the problem but also wrote the solution and provided all the diagrams."}

            <Photo src={pizzaPath} alt="pizzaPath" caption="The final sauce dispenser path"/>

            {"The solution can be found here [add link here]"}

          </Subarticle>

          <Subarticle subtitle="Barron Squares">
            {"This is a mathmatical object I made and named"}

            {"It is a square matrix such that each row's leftmost element times its rightmost element will equal the two inner numbers (in the example below, the top row has 6*7 = 42). Similarly, each column's uppermost element times the column's lowermost element equals the middle digits (in the example, the right column is 7*8 = 56), as read top to bottom."}

            <Photo src={barronSquareFour} alt="barronSquareFour" caption="4x4 Barron Square"/>

            {"This was then expanded on to be a 8x8 with two digit rows/columns being multiplied to get four digit products"}

            <Photo src={barronSquareEight} alt="barronSquareEight" caption="8x8 Barron Square"/>

            {"We ended up finding all 1444 4x4 Barrons Squares, several hundred 8x8 and even a few 16x16 Barron Squares. This was featured as a Riddler Express for FiveThirtyEight."}

          </Subarticle>

          <Subarticle subtitle="Unique Tile Snips">
            {"This is a problem about coloring a square so if a 2x2 section is snipped out you know where it was originally located"}

            <Riddler>
              {"You are given an empty 4-by-4 square and one marker. You can color in the individual squares or leave them untouched. After you color as many or as few squares as you’d like, I will secretly cut out a 2-by-2 piece of it and then show it to you without rotating it. You then have to tell me where it was (e.g., “top middle” or “bottom right,” etc.) in the original 4-by-4 square."}
              {"Can you design a square for which you’ll always know where the piece came from?"}

            </Riddler>            

            {""}

            <Photo src={uniqueTileSnips} alt="test" caption="150 of the 6188 solutions"/>

            {"The solution can be found here [add link here]"}

          </Subarticle>

        </Article>


      </main>

      <main>

        {/* <TopStripe/>
        <BottomStripe/> */}
      </main>
      <Footer />
    </div>
  );
}
