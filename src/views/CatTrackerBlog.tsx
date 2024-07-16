import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Subarticle from '../components/Subarticle';
import Article from '../components/Article';
import Photo from '../components/Photo';

import checoSetup from '../assets/img/Checo/checoSetup.png';
import checoWorking from '../assets/img/Checo/checoWorking.jpg';
import vestaboard from '../assets/img/Checo/vestaboard.png';
import { Link } from "react-router-dom";

export default function CatTrackerBlog() {
  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Article
          title="Cat Tracker"
          subtitle="Measuring Checo's Work Ethic"
        >
          <Subarticle
            subtitle=""
          >
            <p>A familiar theme for me is having an idea and then later finding myself a bit too committed to the bit. That's what happened here with my cat, Checo.</p>
              
            <p>It all started with a simple curiosity: just how much does Checo work next to me? He seemed to always be there, clocking in hours by sleeping in his circle next to my desk. With a free weekend, I decided to turn this into a project to track his effort.</p>

            <Photo
              src={checoSetup}
              alt="Checo Setup"
              caption="Hardware setup for tracking Checo"
            />

            <p>To measure Checo's presence, I built a system using a Raspberry Pi W Zero 2 and a Pycam 3/</p>
            <p>The software stack includes using DynamoDB, MobileNet CNN, API Gateway, and Python in Lambda functions and on the RPi. </p>

            <Photo
              src={checoWorking}
              alt="Checo Working"
              caption="Checo hard at work, seen from camera"
            />

            <p>The camera captures photos at regular intervals, which are then processed to determine if there's a cat in the image.</p>
            <p>After each picture is taken, the image is run through MobileNet, a convolutional neural net designed for image classification on low-powered devices. If a cat is found (with a confidence of 0.20 or higher), then it adds an entry to our database (DynamoDB).</p>
            <p>When a user visits the website, we use API Gateway to hit a Lambda that calculates the time worked based on the total database entries on that day and determines if he is currently working based on whether the most recent entry was added in the last 3 minutes.</p>

            <Photo
              src={vestaboard}
              alt="Checo's Work Log"
              caption="Work time displayed on a Vestaboard"
            />

            <p>It's a fun way to keep my manager, the Checman, on task!</p>

            <p>See Checo's current status here: <Link to="/CatTracker/Live">Checo Live</Link></p>
          </Subarticle>
        </Article>
      </main>
      <Footer />
    </div>
  );
}