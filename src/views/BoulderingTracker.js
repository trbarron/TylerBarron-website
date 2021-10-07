import React from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Video from "../components/Video.js";

export default function BoulderingTracker() {

  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-grow">

        {/* <BottomStripe/> */}
          
        <Article
          title="Bouldering Tracker" 
          subtitle=""
        >

        <Subarticle
            subtitle="Measuring the ability to go up"
        >
            <p>Deep in youtube I found a video that showcased some software that I was really impressed with</p>

            <Video
                src="https://www.youtube.com/embed/7BrYiaSyNto"
                alt="First Demo"
            />

            <p>Naturally, after seeing that, I wanted to make one myself. A few weeks later I had this demo</p>
            
            <Video
                src="https://www.youtube.com/embed/q8dG_Ff2cAc"
                alt="First Demo"
                caption="First demo in apartment"
            />

            <p>This was improved over a few weekends and taken to the gym to try out</p>

            <Video
                src="https://www.youtube.com/embed/rpvqT8xBKl0"
                caption="Demoing it at the gym"
            />

            <p className="w-full"></p>

        </Subarticle>

        <Subarticle
            subtitle="Hardware:"
        >
            <p>The project used a Kinect V2 Camera that connected to a 2018 Dell XPS Ultrabook. No special lighting is needed</p>
            <div></div>{/*  todo fix this */}
        </Subarticle>

        <Subarticle
            subtitle="Software:"
        >
            <p className="font-bold text-gray-dark">Highlighting Holds: </p>
            <p>This is where it highlights the holds, showing in the first few seconds of the video. It uses color and depth to determine if the hold is contiguous</p>
            <p className="font-bold text-gray-dark">Tracking People: </p>
            <p>This is where it highlights the holds, showing in the first few seconds of the video. It uses color and depth to determine if the hold is contiguous</p>
            <p className="font-bold text-gray-dark">Detecting Human to Hold Collisions: </p>
            <p>This is done by tracking the human hand and checking it against the distance (one threshold) and depth (another threshold). If each are met, the hold is marked as “reached” and the color is changed.</p>
            <p className="w-screen py-4"></p>
            <p><a href="https://github.com/trbarron/bouldering-sensing">Check out the code here</a></p>
        </Subarticle>


        </Article>

      </main>
      <Footer />
    </div>
  );
}
