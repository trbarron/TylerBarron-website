
import React from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Photo from "../components/Photo.js";
import Video from "../components/Video.js";

import exampleProblem from "../assets/img/SwiftneyGame/exampleProblem.png"
import exampleSolution from "../assets/img/SwiftneyGame/exampleSolution.png"
import phoneVersion from "../assets/img/SwiftneyGame/phoneVersion.jpg"
import webVersion from "../assets/img/SwiftneyGame/webVersion.png"


export default function SwiftneyGame() {

  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-grow">

        {/* <BottomStripe/> */}
          
        <Article
          title="The Swiftney Game" 
          subtitle=""
        >

        <Subarticle
            subtitle="What is the Swiftney Game?"
        >
            <p>The Swiftney Game is a puzzle game created and played frequently in high school chemistry, taught by Mr. Swiftney. It is really similar to the Numbers Game from Countdown.</p>

            <Video
                src="https://www.youtube.com/embed/pfa3MHLLSWI"
                alt=""
                caption="the inpiration for the Swiftney Game"
            />
            
        </Subarticle>

        <Subarticle
            subtitle="Here is how it works:"
        >
            <p>You are given 6 numbers between 1-9 (the "components") and one number between 90 and 130 (the "answer"). Then, using all 6 components and the 4 basic mathematical operators (+,-,*,/) you create a math expression that equals the answer.</p>

            <Photo
                src={exampleProblem}
                alt=""
                caption="An example Swiftney Game problem"
            />
            <p className="w-screen"></p>
            <Photo
                src={exampleSolution}
                alt=""
                caption="Two solutions to the above problem"
            />
            
        </Subarticle>
        </Article>

        <Article
          title="Web Version" 
          subtitle=""
        >

        <Subarticle
            subtitle="First web page"
        >
            <p>I made this version in early 2014 after learning the UW had free web hosting. Its poorly written but surprisingly functional</p>

            <Photo
                src={phoneVersion}
                alt=""
                caption="First version written in JS"
            />
            
        </Subarticle>
        </Article>
        <Article
          title="Android Version" 
          subtitle=""
        >

        <Subarticle
            subtitle="First android app"
        >
            <p>I made this version in early 2017 after wanting to try making a phone app. Its also poorly written but surprisingly functional</p>

            <Photo
                src={webVersion}
                alt=""
                caption="Second version, made for Android phones"
            />
            
        </Subarticle>
        </Article>

      </main>
      <Footer />
    </div>
  );
}
