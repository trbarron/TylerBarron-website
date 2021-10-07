import React from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Photo from "../components/Photo.js";
import Video from "../components/Video.js";

import Riddler from "../components/Riddler.js";

import riddlerLogo from "../assets/img/Riddler/riddlerlogo.gif"
import pizzaPath from "../assets/img/Riddler/pizza_path.jpg"
import barronSquareFour from "../assets/img/Riddler/barronSquareFour.jpg"
import barronSquareEight from "../assets/img/Riddler/barronSquareEight.jpg"
import sixPuzzle from "../assets/img/Riddler/sixPuzzle.jpg"
import uniqueTileSnips from "../assets/img/Riddler/unique_tile_snips.png"
import sevenSegDisplay from "../assets/img/Riddler/sevenSegDisplay.jpg"
import setBoard from "../assets/img/Riddler/setBoard.png"
import neutColorado from "../assets/img/Riddler/neutColorado.png"
import blueColorado from "../assets/img/Riddler/blueColorado.png"
import crosswordOne from "../assets/img/Riddler/crosswordOne.png"
import crosswordTwo from "../assets/img/Riddler/crosswordTwo.png"


export default function TheRiddler() {

  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-grow">

        {/* <BottomStripe/> */}
          
        <Article
          title="FiveThirtyEight's The Riddler" 
          subtitle=""
        >
          <Subarticle
            subtitle="What is the Riddler?"
          >
            <p>The Riddler is a weekly math, logic and probability problem hosted by fivethirtyeight. The website usually posts data-driven politics, sports and culture blog and predictions.</p>

          <Photo
            src={riddlerLogo}
            alt="theRiddler"
          />

          <p>If my solution extendable, interactive or generalizable then I'll usually blog about it. I've also created and submitted some problems that have published on the column.</p>
          </Subarticle>
        </Article>

        <Article
          title="Submitted Problems"
          subtitle=""
        >
          <Subarticle subtitle="A Pizza Sauce Problem">
            <p>This problem is about filling a pizza evenly with sauce</p>

            <Riddler>
              {"You work for Puzzling Pizza, a company committed to making the best and most consistent pizzas in town. As the shop’s resident mathematician, your boss has asked you to design a product similar to one they saw online:"}
              <Video src={"https://www.youtube.com/embed/8Q0vk_fKDEo"} alt="Pizza Deliverer"/>
              {"They’ve already purchased the equipment but need to know the exact path and flow rate the sauce-dispensing arm should use to fill a 12-inch circular pizza with sauce as fully and evenly as possible."}
            </Riddler>            

            <p>This problem was unique in that I not only created the problem but also wrote the solution and provided all the diagrams.</p>

            <Photo src={pizzaPath} alt="pizzaPath" caption="The final sauce dispenser path"/>

            <p><a href="https://fivethirtyeight.com/features/a-peaceful-but-not-peaceful-transition-of-power-in-riddler-nation/">The solution can be found here</a></p>

          </Subarticle>

          <Subarticle subtitle="Barron Squares">
            <p>This is a mathmatical object I made and named</p>

            <p>It is a square matrix such that each row's leftmost element times its rightmost element will equal the two inner numbers (in the example below, the top row has 6*7 = 42). Similarly, each column's uppermost element times the column's lowermost element equals the middle digits (in the example, the right column is 7*8 = 56), as read top to bottom.</p>

            <Photo src={barronSquareFour} alt="barronSquareFour" caption="4x4 Barron Square"/>

            <p>This was then expanded on to be a 8x8 with two digit rows/columns being multiplied to get four digit products</p>

            <Photo src={barronSquareEight} alt="barronSquareEight" caption="8x8 Barron Square"/>

            <p>We ended up finding all 1444 4x4 Barrons Squares, several hundred 8x8 and even a few 16x16 Barron Squares. <a href="https://fivethirtyeight.com/features/can-you-crack-this-squares-hidden-code/">This was featured as a Riddler Express for FiveThirtyEight.</a></p>

          </Subarticle>

          <Subarticle subtitle="A Geometric Puzzle">
            <p>This is a problem about finding geometric subshapes and summing their areas</p>

            <Riddler>
              {"The largest circle below has a radius of 10, the medium circle has a radius of 5 and the small, orange circle has a radius of 2. The orange circle crawls counterclockwise along the edge of the largest circle until it meets the medium circle, at which point it crawls up along the edge of the medium circle until it reaches the crest. What is the area of the shaded orange region in the right image?"}
              <Photo src={sixPuzzle} alt="sixPuzzle" caption="Find the area of the orange section"/>
            </Riddler>            


            <p><a href="https://fivethirtyeight.com/features/help-us-find-these-missing-pieces/">The problem can be found here</a></p>

          </Subarticle>
          
          <Subarticle subtitle="Unique Tile Snips">
            <p>This is a problem about coloring a square so if a 2x2 section is snipped out you know where it was originally located</p>

            <Riddler>
              {"You are given an empty 4-by-4 square and one marker. You can color in the individual squares or leave them untouched. After you color as many or as few squares as you’d like, I will secretly cut out a 2-by-2 piece of it and then show it to you without rotating it. You then have to tell me where it was (e.g., “top middle” or “bottom right,” etc.) in the original 4-by-4 square."}
              {"Can you design a square for which you’ll always know where the piece came from?"}

            </Riddler>            

            {""}

            <Photo src={uniqueTileSnips} alt="test" caption="150 of the 6188 solutions"/>

            <p><a href="https://barronwasteland.wordpress.com/2019/07/21/where-in-the-square/">My solution can be found here</a></p>

          </Subarticle>

          <Subarticle subtitle="7 Segment Display">
            <p>This problem is about reducing ambiguity in seven-display segments</p>

            <Riddler>
              {"Given a two-character, seven-segment display, like you might find on a microwave clock, how many numbers can you make that are not ambiguous if the display happens to be upside down?"}
              {"For example, the number 81 on that display would not fit this criterion — if the display were upside down it’d appear like 18. The number 71, however, would be OK. It’d appear something like 1L — not a number."}

            </Riddler>            

            {""}

            <Photo src={sevenSegDisplay} alt="test" caption="A seven-segment display"/>

            <p><a href="https://barronwasteland.wordpress.com/2018/11/30/7-l-segment-display/">My solution can be found here</a></p>

          </Subarticle>

          <Subarticle subtitle="The game of Set">
            <p>This problem is about playing the game Set and finding the best, worst and average cases</p>

            <Riddler>
              {"Question 1: What is the maximum number of cards you could have (from a single deck of 81 cards) such that there are no sets among them?"}
              {"Question 2: What is the largest number of sets one can possibly find among 12 cards? You are free to pick any board of 12 cards you like — your goal is to maximize the number of sets the board contains."}
              {"Question 3: If you pick 12 cards at random (again, from a single deck of 81 cards), what’s the probability that they contain at least one set?"}

            </Riddler>            

            {""}

            <Photo src={setBoard} alt="setBoard" caption="A Standard board of Set Cards"/>

            <p>My interest in the game led me to make the <a href="set">Set playing bot</a></p>
            
            <p><a href="https://fivethirtyeight.com/features/can-you-get-the-gloves-out-of-the-box/">My solution can be found here</a></p>

          </Subarticle>
        </Article>

        <Article
          title="Problem Solutions"
          subtitle=""
        >
          <Subarticle subtitle="Putting Sharp Objects into Round Ones">


            <p>This problem was about creating triangles in a unit circle and determining if the circle's center was enclosed.</p>

            <Riddler>
              {"Choose three points on a circle at random and connect them to form a triangle. What is the probability that the center of the circle is contained in that triangle?"}
            </Riddler>            

            <p>This led to the following visualization:</p>

            <Video src={"https://www.youtube.com/embed/tilkid4qwo4"} alt="2d Simulation" caption="Results from 2d Simulation"/>

            <p>This was followed up by the 3d case:</p>

            <Riddler>
              {"Choose four points at random (independently and uniformly distributed) on the surface of a sphere. What is the probability that the tetrahedron defined by those four points contains the center of the sphere?"}
            </Riddler>

            <p></p>

            <Video src={"https://www.youtube.com/embed/SCb3hnudEFA"} alt="3d Simulation" caption="Results from 3d simulation"/>

            <p>The probability that the shapes would enclose the center resulted in surprisingly nice 25% and 12.5%</p>

          </Subarticle>

          <Subarticle subtitle="Gerrymandering">
            <p>This problem was about taking a state map (shown below) and gerrymandering it as much as you could.</p>

            <Riddler>
              {"Below is a rough approximation of Colorado’s voter preferences, based on county-level results from the 2012 presidential election, in a 14-by-10 grid. Colorado has seven districts, so each would have 20 voters in this model. What is the most districts that the Red Party could win if you get to draw the districts with the same rules as above? What about the Blue Party? (Assume ties within a district are considered wins for the party of your choice.)"}
            </Riddler>            

            <p className="w-screen"></p>

            <Photo src={neutColorado} alt="neutColorado" caption="Initial map without districts drawn"/>

            <p>We used a randomized search that would try to slightly move districts, check continuity and then check the voting results. The method resulted in uniquely shaped maps that optimized each side's winningness.</p>
{/* 
            video
            image
            tweet */}

          <Photo src={blueColorado} alt="blueColorado" caption="Map with districts drawn optimized for blue. Blue wins 5/7 districts after 100,000 iterative flips"/>
          <p></p>
          <Video src={"https://www.youtube.com/embed/V-VWRII179E"} caption="Districts move their boundaries each iteration"/>

          </Subarticle>

          <Subarticle subtitle="Creating Crossword Puzzles">
            <p>This problem is about making crossword puzzles boards</p>

            <Riddler>
              {"Crossword puzzle grids typically obey a few rules and conventions."}
              <ul className="w-full px-4 mb-4 text-md leading-relaxed text-gray-light pl-8">
                <li>• They are 15-by-15."</li>
                <li>• They are rotationally symmetric — that is, if you turn the grid upside down it appears exactly the same.</li>
                <li>• All the words — that is, all the horizontal and vertical sequences of white squares — must be at least three letters long. All the letters must appear in an “across” word and a “down” word.</li>
                <li>• The grid must be entirely connected — that is, there can be no “islands” of white squares separated from the rest by black squares.</li>
              </ul>
              {"How many such crossword grids are there?"}
            </Riddler>            
            <p></p>
            <Photo src={crosswordOne} alt="crosswordOne"/>

            <p>While I didn't find them all (no one was able to) I was able to generate a few thousand.</p>

            <Photo src={crosswordTwo} alt="crosswordTwo"/>

          </Subarticle>

          <Subarticle subtitle="Other solutions">
            <p>Other solutions worthy of writing up but not dedicating space to here:</p>
            <ul className="w-full px-4 mb-4 text-md leading-relaxed pl-12">
                <li><a href="https://barronwasteland.wordpress.com/2020/07/12/2220/"> A Story of Stacking Rings </a></li>
                <li><a href="https://barronwasteland.wordpress.com/2020/06/21/golden-spheres/"> Golden Spheres </a></li>
                <li><a href="https://barronwasteland.wordpress.com/2020/06/11/can-you-join-the-worlds-biggest-zoom-call/">Can You Join the World’s Biggest Zoom Call?</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2020/03/02/2186/">A Dark Room With Cards</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2020/02/11/jim-propp-and-the-unique-observed-series/"> Jim Propp and the Unique Observed Series</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2020/01/06/a-hexagon-problem/">A Hexagon Problem</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2019/12/22/can-you-find-a-matching-pair-of-socks/">Can You Find A Matching Pair of Socks?</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2019/12/18/a-particularly-prismatic-puzzle/">A Particularly Prismatic Problem</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2019/12/10/how-fast-can-you-skip-to-your-favorite-song/"> How Fast Can You Skip to Your Favorite Song</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2019/11/03/new-sultans-dowry-problem/"> New Sultan's Dowery Problem</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2018/08/19/game-theory-on-a-number-line/">Game Theory on a Number Line</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2018/09/15/the-eccentric-billionaire-and-the-banker/">The Eccentric Billionaire and the Banker</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2018/09/24/a-tale-of-two-endpoints/">A Tale of Two Endpoints</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2018/12/24/2000/"> Elf Playlist </a></li>
                <li><a href="https://barronwasteland.wordpress.com/2019/01/22/creating-crossword-grids/">Creating Crosswords</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2019/02/17/sum-to-15-card-game/"> Sum to 15 Card Game </a></li>
                <li><a href="https://barronwasteland.wordpress.com/2019/04/01/a-fivethirtyeight-spelling-be/">A FiveThirtyEight Spelling Bee</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2019/04/20/a-circular-conundrum/">A Circular Conundrum</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2018/06/17/matching-game/">Matching Game</a></li>                
                <li><a href="https://barronwasteland.wordpress.com/2018/06/06/a-classic-construction-problem/">A Classic Construction Problem</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2017/11/04/an-amphibious-enigma/">An Amphibious Enigma</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2017/10/08/game-show-bright-lights-big-cit/">Big City, Bright Lights</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2017/07/06/the-purge-riddler/">The Purge</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2017/04/29/a-painting-puzzl/">A Painting Puzzle</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2017/04/23/pick-a-card-any-card/">Pick a Card, Any Card</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2017/03/18/a-puzzle-about-domestic-boundaries/">A Puzzle About Domestic Boundaries</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2017/01/17/the-riddler-an-impromptu-gambling-problem/">An Impromptu Gambling Problem</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2016/10/23/the-riddler-can-you-survive-this-deadly-board-game/">Can You Survive This Deadly Board Game?</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2016/09/19/the-riddler-count-von-count/">Count Von Count</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2016/05/25/the-riddler/">Jems</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2016/04/16/the-riddler-space-race/"> Space Race </a></li>
                <li><a href="https://barronwasteland.wordpress.com/2015/12/22/the-riddler-2-which-geyser-gushes-first/">Which Geyser Gushes First?</a></li>
                <li><a href="https://barronwasteland.wordpress.com/2015/12/12/the-riddler-1-whats-the-best-way-to-drop-a-smartphone/">What's the Best Way To Drop A Smartphone?</a></li>
              </ul>

          </Subarticle>

        </Article>

      </main>
      <Footer />
    </div>
  );
}
