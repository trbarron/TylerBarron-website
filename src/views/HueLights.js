import React from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Video from "../components/Video.js";
import Photo from "../components/Photo.js";

import doubledRoom from "../assets/img/HueLights/doubledRoom.jpg"
import weatherCodes from "../assets/img/HueLights/weatherCodes.jpg"
import sceneChanger from "../assets/img/HueLights/sceneChanger.jpg"
import dashButton from "../assets/img/HueLights/dashButton.png"

export default function HueLIghts() {
  return (
      
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-grow">
         
        <Article
          title="Custom Hue Lights Setup" 
        >

        <Subarticle
            subtitle="pairs well with cameras and action"
        >
            <p>Hue lights are RGB lightbulbs that can change colors and brightness to really anything in the color spectrum. For this project I took effort to customize their triggers to fit my needs</p>
            
            <Video
                src="https://www.youtube.com/embed/PkPrnxFTdN8"
                caption="Demoing of the final product"
            />

            <p className="w-screen"></p>

            <Photo
                src={doubledRoom}
                alt=""
                caption="Same room, two different lighting scenes"
            />

        </Subarticle>
        <Subarticle
            subtitle="Part I: Dash Buttons"
        >

            <p>These are small, wireless buttons that Amazon makes to make it easy for you to buy things. However I redirect these buttons so they turn all the lights on and off.</p>
            <Photo
                src={dashButton}
                alt=""
                caption="Amazon's Dash Button"
            />

            <p>This uses Scapy to sniff the network and anytime something makes a request with the MAC address of a button I turn the lights on if most are off or vis versa.</p>

        </Subarticle>

        <Subarticle
            subtitle="Part II: Weather Forecast"
        >

            <p>Every morning, when my alarm goes off, my lights will turn on and this will look up the weather in my area using WeatherUnderground and set the lights to represent the weather.</p>
            <Photo
                src={weatherCodes}
                alt=""
                caption="Weather Forecasting Table"
            />

            <p>It looks up the weather code against this excel spreadsheet that shows what color the lights will be</p>

        </Subarticle>

        <Subarticle
            subtitle="Part III: Scene Controller"
        >

            <p>This is a button pad that selects from eight scenes that have been preprogrammed for whatever activity seems “right” — so there is one for movies, yoga, reading, etc. Also its just fun to show off the system</p>
            <Photo
                src={sceneChanger}
                alt=""
                caption="Scene Changing Drum Pad"
            />

            <p>This gets imported as a MIDI device using Pygame and then it polls for button presses. After each button press it looks up the code in the same spreadsheet as the weather codes</p>

        </Subarticle>

        <Subarticle
            subtitle=""
        >

            <p> <a href="https://github.com/trbarron/Hue_Lights_Control">The code can be found here </a></p>
            <div></div>{/* this is some jank to make it work for no. todo: remove */}

        </Subarticle>

        </Article>

      </main>
      <Footer />
    </div>
  );
}
