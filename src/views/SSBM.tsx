import React from "react";
import ImageGallery from 'react-image-gallery';

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Subarticle from "../components/Subarticle";
import Article from "../components/Article";
import Video from "../components/Video.js";

import "react-image-gallery/styles/css/image-gallery.css";

// Import all images
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
    const textureModImages = [
        { original: falco1, thumbnail: falco1, description: "Falco wearing UW colors" },
        { original: fox, thumbnail: fox, description: "UW Fox" },
        { original: marth, thumbnail: marth, description: "Marth with a UW sword gradient" },
        { original: shiek, thumbnail: shiek, description: "UW Shiek" },
        { original: stadium, thumbnail: stadium, description: "Standard Pokemon Stadium" },
        { original: stadiumTransformed, thumbnail: stadiumTransformed, description: "No-Transform Pokemon Stadium" },
        { original: falco2, thumbnail: falco2, description: "The space animals have purple and gold lasers" }
    ];

    const customControllerImages = [
        { original: gameCubeController, thumbnail: gameCubeController, description: "My Modded Gamecube Controllers" },
        { original: haxBoxx, thumbnail: haxBoxx, description: "Hax's custom controller, the B0XX" },
        { original: boxxRender, thumbnail: boxxRender, description: "Controller Rendering" },
        { original: boxxLayout, thumbnail: boxxLayout, description: "Controller Layout" },
        { original: barronBoxx, thumbnail: barronBoxx, description: "Completed Controller, ready to use" }
    ];

    return (
        <div className="bg-background bg-fixed min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Article title="Super Smash Bros. Melee" subtitle="">
                    <Subarticle subtitle="UW Texture Mod V1.10">
                        <p>Super Smash Bros. Melee is a "beautiful accident" because of it's speed, balance and ability for self-expression. It came out before the internet so it hasn't had balance patches, DLC or visual updates. This mod was an attempt to give our college's competitive scene a unique skin for the game</p>
                        
                        <ImageGallery items={textureModImages} />

                        <p>The most popular characters got alternate costumes with our school's colors</p>
                        <p>I modified the stage Pokémon Stadium to have the UW Logo</p>
                        <p>Finally, Fox and Falco's lasers are now purple. Like all the other mods this is togglable</p>
                    </Subarticle>
                    <Subarticle subtitle="How to get it:">
                        <p>You can get the rom by asking at the UW Smash Club. <a href="https://www.facebook.com/groups/udistrictsmash/about/">Find their events on their Facebook page</a></p>
                        <div className="h-4"></div>
                    </Subarticle>
                </Article>

                <Article title="Custom Gamecube Controllers" subtitle="">
                    <Subarticle subtitle="Barron B0XX">
                        <p>There is a small slice of the world who is still into Super Smash Bros. Melee on the Nintendo Gamecube. Over time players have asked more and more of themselves to reach higher heights. One roadblock to this is the physical controller and it's inherent flaws. This project aims to solve some of those drawbacks</p>
                        
                        <ImageGallery items={customControllerImages} />

                        <p>This started with someone who need it most, Hax$. He is a top 20 player known for his extreme speed at the game but this speed came at a cost -- his hands. After several surgeries to reconstruct his hands he had to start over. He designed an ergonomic keyboard style controller called the B0XX.</p>

                        <Video
                            src="https://www.youtube.com/embed/KdSd2CBcSJc"
                            alt=""
                            caption="Hax's playstyle (that destroyed his hands)"
                        />

                        <p>Hax promised to sell these controllers but he was very slow to make it market. As a result I decided to build my own</p>
                        <p>I linked a more detailed build process. The build itself took 20 hours, two hardware trips, five online orders and one burnt thumb. The code is based on SimpleController's, modified for my button layout and application. The only thing left is to get good with it</p>
                    </Subarticle>
                    <Subarticle subtitle="How to get it:">
                        <p><a href="https://imgur.com/a/M2QSR">You can better follow / copy my build process here</a></p>
                        <p><a href="https://github.com/trbarron/SimpleControllersBuild-a-Box/blob/master/Barron_B0XX_Arduino.ino">The code can be found here</a></p>
                        <div className="h-4"></div>
                    </Subarticle>
                </Article>
            </main>
            <Footer />
        </div>
    );
}