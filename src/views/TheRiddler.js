import React from "react";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Photo from "../components/Photo.js";

import img from "../assets/img/me.jpg"

export default function TheRiddler() {

  return (
    <div className="bg-background">
      <Navbar/>
      <main>

        {/* <BottomStripe/> */}
          
        <Article
          title="FiveThirtyEight's The Riddler" 
          subtitle="What is the Riddler?"
        >
          <Subarticle
            subtitle="Test 123234"
            content="subarticleBarsdfsdfronSquares"
          />

          <Photo
            src={img}
            alt="test"
            caption="Okay okay okay"
          />

          <Photo
            src={img}
            alt="test"
          />

          <Subarticle
            subtitle="Test 123"
            content="subarticleBarsdfsdfronSquares"
          />
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
