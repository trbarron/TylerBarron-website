import React from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer";

import Markdown from "../components/Markdown.tsx"

const intro = `
# FiveThirtyEight's The Riddler
## What is the Riddler?
The Riddler is a weekly math, logic and probability problem hosted by fivethirtyeight. The website usually posts data-driven politics, sports and culture blog and predictions.

![Riddler Logo](images/Riddler/riddlerlogo.gif)

If my solution extendable, interactive or generalizable then I'll usually blog about it. I've also created and submitted some problems that have published on the column.

`;

const submittedProblems = `
# Submitted Problems
## A Pizza Sauce Problem

This problem is about filling a pizza evenly with sauce

> You work for Puzzling Pizza, a company committed to making the best and most consistent pizzas in town. As the shop’s resident mathematician, your boss has asked you to design a product similar to one they saw online:

[Link to video](https://www.youtube.com/watch?v=8Q0vk_fKDEo)

> They’ve already purchased the equipment but need to know the exact path and flow rate the sauce-dispensing arm should use to fill a 12-inch circular pizza with sauce as fully and evenly as possible.

This problem was unique in that I not only created the problem but also wrote the solution and provided the diagrams.

![pizzaPath](images/Riddler/pizza_path.jpg)

[The solution can be found here](https://fivethirtyeight.com/features/a-peaceful-but-not-peaceful-transition-of-power-in-riddler-nation/)

---
## Barron Squares

This is a mathmatical object. It is a square matrix such that each row's leftmost element times its rightmost element will equal the two inner numbers (in the example below, the top row has 6*7 = 42).

Similarly, each column's uppermost element times the column's lowermost element equals the middle digits (in the example, the right column is 7*8 = 56), as read top to bottom.

![barronSquareFour](images/Riddler/barronSquareFour.jpg)
###### 4x4 Barron Square

This was then expanded on to be a 8x8 with two digit rows/columns being multiplied to get four digit products

![barronSquareFour](images/Riddler/barronSquareEight.jpg)
###### 8x8 Barron Square

We ended up finding all 1444 4x4 Barrons Squares, several hundred 8x8 and even a few 16x16 Barron Squares. [This was featured as a Riddler Express for FiveThirtyEight.](https://fivethirtyeight.com/features/can-you-crack-this-squares-hidden-code/)

---

## A Geometric Puzzle
This is a problem about finding geometric subshapes and summing their areas
> The largest circle below has a radius of 10, the medium circle has a radius of 5 and the small, orange circle has a radius of 2. The orange circle crawls counterclockwise along the edge of the largest circle until it meets the medium circle, at which point it crawls up along the edge of the medium circle until it reaches the crest. What is the area of the shaded orange region in the right image?
![geometricPuzzle](images/Riddler/sixPuzzle.jpg)
###### Find the area of the orange section

---

## Unique Tile Snips

This is a problem about coloring a square so if a 2x2 section is snipped out you know where it was originally located

> You are given an empty 4-by-4 square and one marker. You can color in the individual squares or leave them untouched. After you color as many or as few squares as you’d like, I will secretly cut out a 2-by-2 piece of it and then show it to you without rotating it. You then have to tell me where it was (e.g., “top middle” or “bottom right,” etc.) in the original 4-by-4 square.
> 
> Can you design a square for which you’ll always know where the piece came from?

![uniqueTileSnips](images/Riddler/unique_tile_snips.png)
###### 150 of the 6188 solutions

[My solution can be found here](https://barronwasteland.wordpress.com/2019/07/21/where-in-the-square/)

---

## 7 Segment Display

This problem is about reducing ambiguity in seven-display segments

> Given a two-character, seven-segment display, like you might find on a microwave clock, how many numbers can you make that are not ambiguous if the display happens to be upside down?
> 
> For example, the number 81 on that display would not fit this criterion — if the display were upside down it’d appear like 18. The number 71, however, would be OK. It’d appear something like 1L — not a number.

![sevenSegDisplay](images/Riddler/sevenSegDisplay.jpg)
###### A seven-segment display

[My solution can be found here](https://barronwasteland.wordpress.com/2018/11/30/7-l-segment-display/)

---

## The game of Set

This problem is about playing the game Set and finding the best, worst and average cases

> "Question 1: What is the maximum number of cards you could have (from a single deck of 81 cards) such that there are no sets among them?"
> 
> "Question 2: What is the largest number of sets one can possibly find among 12 cards? You are free to pick any board of 12 cards you like — your goal is to maximize the number of sets the board contains."
> 
> "Question 3: If you pick 12 cards at random (again, from a single deck of 81 cards), what’s the probability that they contain at least one set?"

![setBoard](images/Riddler/setBoard.png)
###### A Standard board of Set Cards

My interest in the game led me to make the [Set playing bot](/set)

[My solution can be found here](https://fivethirtyeight.com/features/can-you-get-the-gloves-out-of-the-box/)
`;

const problemSolutions = `
# Problem Solutions
## Putting Sharp Objects into Round Ones

This problem was about creating triangles in a unit circle and determining if the circle's center was enclosed.

> "Choose three points on a circle at random and connect them to form a triangle. What is the probability that the center of the circle is contained in that triangle?"

This led to the following visualization:
[2d Simulation](https://www.youtube.com/watch?v=tilkid4qwo4)

### 3D Case

> Choose four points at random (independently and uniformly distributed) on the surface of a sphere. What is the probability that the tetrahedron defined by those four points contains the center of the sphere?

[3d Simulation](https://www.youtube.com/watch?v=SCb3hnudEFA)

The probability that the shapes would enclose the center resulted in surprisingly nice 25% and 12.5%.

---

## Gerrymandering

> Below is a rough approximation of Colorado’s voter preferences, based on county-level results from the 2012 presidential election, in a 14-by-10 grid. Colorado has seven districts, so each would have 20 voters in this model. What is the most districts that the Red Party could win if you get to draw the districts with the same rules as above? What about the Blue Party? (Assume ties within a district are considered wins for the party of your choice.)

![neutColorado](images/Riddler/neutColorado.png)

We used a randomized search that would try to slightly move districts, check continuity and then check the voting results. The method resulted in uniquely shaped maps that optimized each side's winningness.

![blueColorado](images/Riddler/blueColorado.png)

[Districts move their boundaries each iteration](https://www.youtube.com/watch?v=V-VWRII179E)

## Creating Crossword Puzzles

> Crossword puzzle grids typically obey a few rules and conventions.
> 
> • They are 15-by-15.
> 
> • They are rotationally symmetric — that is, if you turn the grid upside down it appears exactly the same.
> 
> • All the words — that is, all the horizontal and vertical sequences of white squares — must be at least three letters long. All the letters must appear in an “across” word and a “down” word.
> 
> • The grid must be entirely connected — that is, there can be no “islands” of white squares separated from the rest by black squares.
> 
> How many such crossword grids are there?

![crosswordOne](images/Riddler/crosswordOne.png)

While I didn't find them all (no one was able to) I was able to generate a few thousand.

![crosswordTwo](images/Riddler/crosswordTwo.png)

## Other Solutions

Other solutions worthy of writing up but not dedicating space to here:

• [A Story of Stacking Rings](https://barronwasteland.wordpress.com/2020/07/12/2220/)

• [Golden Spheres](https://barronwasteland.wordpress.com/2020/06/21/golden-spheres/)

• [Can You Join the World’s Biggest Zoom Call?](https://barronwasteland.wordpress.com/2020/06/11/can-you-join-the-worlds-biggest-zoom-call/)

• [A Dark Room With Cards](https://barronwasteland.wordpress.com/2020/03/02/2186/)

• [Jim Propp and the Unique Observed Series](https://barronwasteland.wordpress.com/2020/02/11/jim-propp-and-the-unique-observed-series/)

• [A Hexagon Problem](https://barronwasteland.wordpress.com/2020/01/06/a-hexagon-problem/)

• [Can You Find A Matching Pair of Socks?](https://barronwasteland.wordpress.com/2019/12/22/can-you-find-a-matching-pair-of-socks/)

• [A Particularly Prismatic Problem](https://barronwasteland.wordpress.com/2019/12/18/a-particularly-prismatic-puzzle/)

• [How Fast Can You Skip to Your Favorite Song](https://barronwasteland.wordpress.com/2019/12/10/how-fast-can-you-skip-to-your-favorite-song/)

• [New Sultan's Dowery Problem](https://barronwasteland.wordpress.com/2019/11/03/new-sultans-dowry-problem/)

• [Game Theory on a Number Line](https://barronwasteland.wordpress.com/2018/08/19/game-theory-on-a-number-line/)

• [The Eccentric Billionaire and the Banker](https://barronwasteland.wordpress.com/2018/09/15/the-eccentric-billionaire-and-the-banker/)

• [A Tale of Two Endpoints](https://barronwasteland.wordpress.com/2018/09/24/a-tale-of-two-endpoints/)

• [Elf Playlist](https://barronwasteland.wordpress.com/2018/12/24/2000/)

• [Creating Crosswords](https://barronwasteland.wordpress.com/2019/01/22/creating-crossword-grids/)

• [Sum to 15 Card Game](https://barronwasteland.wordpress.com/2019/02/17/sum-to-15-card-game/)

• [A FiveThirtyEight Spelling Bee](https://barronwasteland.wordpress.com/2019/04/01/a-fivethirtyeight-spelling-be/)

• [A Circular Conundrum](https://barronwasteland.wordpress.com/2019/04/20/a-circular-conundrum/)

• [Matching Game](https://barronwasteland.wordpress.com/2018/06/17/matching-game/)

• [A Classic Construction Problem](https://barronwasteland.wordpress.com/2018/06/06/a-classic-construction-problem/)

• [An Amphibious Enigma](https://barronwasteland.wordpress.com/2017/11/04/an-amphibious-enigma/)

• [Big City, Bright Lights](https://barronwasteland.wordpress.com/2017/10/08/game-show-bright-lights-big-cit/)

• [The Purge](https://barronwasteland.wordpress.com/2017/07/06/the-purge-riddler/)

• [A Painting Puzzle](https://barronwasteland.wordpress.com/2017/04/29/a-painting-puzzl/)

• [Pick a Card, Any Card](https://barronwasteland.wordpress.com/2017/04/23/pick-a-card-any-card/)

• [A Puzzle About Domestic Boundaries](https://barronwasteland.wordpress.com/2017/03/18/a-puzzle-about-domestic-boundaries/)

• [An Impromptu Gambling Problem](https://barronwasteland.wordpress.com/2017/01/17/the-riddler-an-impromptu-gambling-problem/)

• [Can You Survive This Deadly Board Game?](https://barronwasteland.wordpress.com/2016/10/23/the-riddler-can-you-survive-this-deadly-board-game/)

• [Count Von Count](https://barronwasteland.wordpress.com/2016/09/19/the-riddler-count-von-count/)

• [Jems](https://barronwasteland.wordpress.com/2016/05/25/the-riddler/)

• [Space Race](https://barronwasteland.wordpress.com/2016/04/16/the-riddler-space-race/)

• [Which Geyser Gushes First?](https://barronwasteland.wordpress.com/2015/12/22/the-riddler-2-which-geyser-gushes-first/)

• [What's the Best Way To Drop A Smartphone?](https://barronwasteland.wordpress.com/2015/12/12/the-riddler-1-whats-the-best-way-to-drop-a-smartphone/)


`;


export default function TheRiddler() {

  return (
    <div className="bg-background bg-cover bg-fixed min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-grow">
        <Markdown markdownFile={intro}/>
        <Markdown markdownFile={submittedProblems}/>
        <Markdown markdownFile={problemSolutions}/>
      </main>
      <Footer />
    </div>
  );
}