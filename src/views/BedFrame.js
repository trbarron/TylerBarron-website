
import React from "react";
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Photo from "../components/Photo.js";

import wood from "../assets/img/BedFrame/wood.jpg"
import bedRender from "../assets/img/BedFrame/bedRender.jpg"
import sanding from "../assets/img/BedFrame/sanding.jpg"
import bedFrameFinished from "../assets/img/BedFrame/bedFrameFinished.jpg"
import sageAndBed from "../assets/img/BedFrame/sageAndBed.jpg"


export default function BedFrame() {

  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-grow">

        {/* <BottomStripe/> */}
          
        <Article
          title="Bed Frame" 
          subtitle=""
        >

        <Subarticle
            subtitle="We all need a place to rest our heads at night"
        >
            <p>During the holiday break our company gave during 2016-2017 my dad and I decided to build a bed frame. It was the first proper furnature product I've made and remains one of my projects I'm most proud of.</p>

            <Photo
                src={wood}
                alt=""
                caption="The wood, as purchased"
            />

            <p>With the headboard purchased we were able to plan the rest. The sideboards and legs were to be made of a matching wood, and the design was finalized</p>

            <Photo
                src={bedRender}
                alt=""
                caption="Render of the bed design"
            />

            <p>Then it was time to get to work making this thing in real life! See the full build pictures here</p>

            <Photo
                src={sanding}
                alt=""
                caption="Sanding in winter requires layers"
            />

            <p></p>

            <Photo
                src={sageAndBed}
                alt=""
                caption="Sage was abel to sneak the first nap on the bed!"
            />

            <p></p>

            <Photo
                src={bedFrameFinished}
                alt=""
                caption="The finished bedframe"
            />

            <p></p>



        </Subarticle>
        </Article>
      </main>
      <Footer />
    </div>
  );
}
