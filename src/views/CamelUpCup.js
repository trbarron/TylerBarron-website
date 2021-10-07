import React from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Photo from "../components/Photo.js";

import camelUpGame from "../assets/img/CamelUpCup/camelUpGame.jpg"
import peoplePlaying from "../assets/img/CamelUpCup/peoplePlaying.jpg"
import trophy from "../assets/img/CamelUpCup/trophy.jpg"
import eventOne from "../assets/img/CamelUpCup/eventOne.jpg"
import eventTwo from "../assets/img/CamelUpCup/eventTwo.jpg"


export default function CamelUpCup() {

  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-grow">

        {/* <BottomStripe/> */}
          
        <Article
          title="Camel Up Cup 2K18" 
          subtitle=""
        >
          <Subarticle
            subtitle="Wait, what?"
          >
            <p><a href="https://www.boardgamegeek.com/boardgame/153938/camel">Camel Up</a> is a board game I was playing with some buddies. While arguing about what move should have been made someone remarked "someone should write a program to play this game". That sparked the idea that became Camel Up Cup 2K18 - the premier bot creation tournament of the year. The idea is simple, make a digital bot that is able to play the game Camel Up better than all competitors.</p>

          <Photo
            src={camelUpGame}
            alt="Game Itself"
            caption="The box art for Camel Up"
          />

          <p>The game was chosen for several reasons: it has a relatively small pool of options to select from (roughly 20 choices per turn, easily narrowed down to usually about 3-4), games are short and there is an element of luck (so even bad bots have a chance to win). After seeing some interest I made the game and a few basic examples of bots and sent out invitations.</p>

          <Photo
            src={peoplePlaying}
            alt="Humans playing Camel Up"
            caption="Humans playing Camel Up"
          />

          </Subarticle>


        <Subarticle
            subtitle="The Details"
        >
            <p>The bots would be written in a language that interfaces with Python 3.x. They would take in the gamestate (camel positions, current bets, player money values, etc) and return their move. Bot creators had access to the game's code so could test their bots locally.</p>

          <Photo
            src={trophy}
            alt="The Trophy"
            caption="The trophy, to be awarded to the winner"
          />


        </Subarticle>

        <Subarticle
            subtitle="The Event Itself"
        >
            <p>On the day of the event plenty of people showed up... but not many bots. There were two serious bots and two joke bots, along with a bot that was supposed to be a joke but was accidentally a jpeg image (don't ask me how). We agreed to a best of four with a rotating player order (ABCD, BCDA, CDAB, BCDA).</p>

          <Photo
            src={eventTwo}
            alt="Event itself"
            caption="The event itself (bots not pictured)"
          />

          <p>Initially the game was accidentally in a debugging mode that resulted in "trashbot", one of the joke bots, absolutely crushing the other bots.</p>

          <p>The bug was correct and we found the two competative bots <a href="https://github.com/DingusaurusRex/TimeCamel">TimeCamel [made by Libby and Jack]</a> and <a href="https://github.com/trbarron/Camel_Up_Cup_2K18">Sir_Humpfree_Bogart [made by myself]</a> well ahead of trashbot [made by Charles] and randobot [made by Sean]. TimeCamel took the first game but Sir_Humpfree_Bogart took the next three games to pull home the win.</p>

          <Photo
            src={eventOne}
            alt="Event itself"
            caption="Sir_Humpfree_Bogart's owner (me)"
          />

        </Subarticle>

        <Subarticle
            subtitle="How the bots work"
        >
            <p className="italic">Note: This requires knowledge of the board game itself</p>

            <p>Then they move camels randomly until a camel wins. After doing this a few thousand times you can estimate the chance each camel will win and lose. Again, we get the expected value of these using</p>

            <p className="pl-8 italic">EV_roundwin = (chance_1st)*(payout) + (chance_2nd)*(payout) - (chance_3rd_or_worse)*(cost)</p>

            <p>Then they move camels randomly until a camel wins. After doing this a few thousand times you can estimate the chance each camel will win and lose. Again, we get the expected value of these using</p>

            <p className="pl-8 italic">EV_gamewin = (chance_1st)*(payout) - (chance_2nd_or_worse)*(cost)</p>


            <p>The only other options are moving a camel (which always yields one coin, so its expected value is one) and placing a trap. Both teams felt placing a trap was a weak enough option to ignore it entirely. With this information the bots chose the option with the highest expected value.</p>

            <p>Since our tournament viewed a second place finish the same as a last place finish if you are behind you should take chances to get into first place. SBH used <b>distance_from_first_place</b> and <b>nearness_to_end</b> to determine how risky the bot should be. If the risk tolerance was low the bot would decide on an action with a high expected value and a high risk tolerance yielded the option with a high upshot.</p>

        </Subarticle>


        <Subarticle
            subtitle="The Aftermath"
        >
            <p>Thanks for reading! It was a quirky experiment that led to a fun day with buddies -- can't ask for much more. <a href="https://github.com/trbarron/Camel_Up_Cup_2K18">See my github for the game and my bot</a> and <a href="https://github.com/DingusaurusRex/TimeCamel">here for TimeBot's code.</a></p>

            <p> <a href="https://codegolf.stackexchange.com/questions/167101/camel-up-cup-an-ai-board-game-tournament">Check here for how you can make a bot and interface with the competition</a></p>

        </Subarticle>

        </Article>

      </main>
      <Footer />
    </div>
  );
}
