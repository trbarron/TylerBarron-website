import React from "react";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Video from "../components/Video.js";
import Photo from "../components/Photo.js";

import falco1 from "../assets/img/SSBM/falco1.png"
import falco2 from "../assets/img/SSBM/falco2.png"
import fox from "../assets/img/SSBM/fox.png"

import gameCubeController from "../assets/img/SSBM/gameCubeController.jpg"
import haxBoxx from "../assets/img/SSBM/haxBoxx.png"
import marth from "../assets/img/SSBM/marth.png"
import shiek from "../assets/img/SSBM/shiek.png"
import stadium from "../assets/img/SSBM/stadium.jpg"
import stadiumTransformed from "../assets/img/SSBM/stadiumTransformed.png"

import barronBoxx from "../assets/img/SSBM/barronBoxx.png"
import boxxLayout from "../assets/img/SSBM/boxxLayout.png"
import boxxRender from "../assets/img/SSBM/boxxRender.jpg"




export default function SSBM() {

  return (
    <div className="bg-background bg-fixed">
      <Navbar/>
      <main>

          
        <Article
          title="Super Smash Bros. Melee" 
          subtitle=""
        >

        <Subarticle
            subtitle="UW Texture Mod V1.10"
        >
            <p>Super Smash Bros. Melee is considered a "beautiful accident" because of its speed, relative balance and depth of gameplay. However, because it was made pre-internet there haven't been patches, visual updates or any of the other benefits we see from popular games. This was an attempt to give our college's competitive scene a unique skin for the game</p>

            <Photo
                src={falco1}
                alt=""
                caption="Falco wearing UW colors"
            />

            <p>The most popular characters: Fox, Falco, Marth and Shiek got alternate costumes to support the dawgs</p>
            
            <Photo
                src={fox}
                alt=""
                caption="UW Fox"
            />

            <p className="w-screen"></p>

            <Photo
                src={marth}
                alt=""
                caption="Marth with a UW sword gradient"
            />

            <p className="w-screen"></p>
            <Photo
                src={shiek}
                alt=""
                caption="UW Shiek"
            />

            <p>The stage Pokémon Stadium was altered to have the UW Logo on the standard version and to be Husky Stadium if the hacked, no-transform version of the stage.</p>
            
            <Photo
                src={stadium}
                alt=""
                caption="Standard Pokemon Stadium"
            />

            <p className="w-screen"></p>
            <Photo
                src={stadiumTransformed}
                alt=""
                caption="No-Transform Pokemon Stadium"
            />

            <p>Finally, I included a setting so that Fox and Falco's lasers, traditionally red, are now purple. Like all the other mods this can be toggled on and off</p>
            <Photo
                src={falco2}
                alt=""
                caption="The space animals have purple and gold lasers"
            />

        </Subarticle>
        <Subarticle
            subtitle="How to get it:"
        >
            <p>You can get the rom by asking at the UW Smash Club. <a href="https://www.facebook.com/groups/udistrictsmash/about/">Find their events on their Facebook page</a></p>
            <div className="h-4"></div> {/* todo: Get rid of this eventually */}
        </Subarticle>

        </Article>

        <Article
          title="Custom Gamecube Controllers" 
          subtitle=""
        >

        <Subarticle
            subtitle="Barron B0XX"
        >
            <p>There is a small slice of the world who is still into Super Smash Bros. Melee on the Nintendo Gamecube. Over time players have asked more and more of themselves and the game trying to reach perfection, however one roadblock to this is the physical controller. This project aims to solve some of those drawbacks</p>

            <Photo
                src={gameCubeController}
                alt=""
                caption="My Modded Gamecube Controllers"
            />

            <p>The solution to this problem was created by someone who need it most, Hax$. He is a top 20 player known for his extreme speed at the game but this speed came at a cost -- his hands. After destroying his hands he redesigned the controller and built <a href="https://b0xx.com/">a keyboard style controller called the B0XX.</a></p>
            
            <Photo
                src={haxBoxx}
                alt=""
                caption="Hax's custom controller, the B0XX"
            />

            <p className="w-screen"></p>

            <Video
                src="https://www.youtube.com/embed/KdSd2CBcSJc"
                alt=""
                caption="Hax's playstyle (that destroyed his hands)"
            />


            <p>Hax promised to sell these controllers but after three years of waiting nothing has shipped yet. As a result I decided to build my own</p>
            
            <Photo
                src={boxxRender}
                alt=""
                caption="Standard Pokemon Stadium"
            />

            <p className="w-screen"></p>
            <Photo
                src={boxxLayout}
                alt=""
                caption="No-Transform Pokemon Stadium"
            />

            <p>Below is linked a more detailed build process. The build itself took four or so workdays with two hardware trips, two McMaster orders, three Amazon orders, one broken piece of acrylic and one burnt thumb. The code was based on SimpleController's code, modified for my button layout and application. Now just to get good with it :)</p>

            <Photo
                src={barronBoxx}
                alt=""
                caption="No-Transform Pokemon Stadium"
            />

        </Subarticle>
        <Subarticle
            subtitle="How to get it:"
        >
            <p><a href="https://imgur.com/a/M2QSR">You can better follow / copy my build process here</a></p>
            <p><a href="https://github.com/trbarron/SimpleControllersBuild-a-Box/blob/master/Barron_B0XX_Arduino.ino">The code can be found here</a></p>

            <div className="h-4"></div> {/* todo: Get rid of this eventually */}
        </Subarticle>

        </Article>

      </main>
      <Footer />
    </div>
  );
}
