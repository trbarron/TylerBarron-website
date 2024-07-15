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
            <p>It all started with a simple curiosity from my coworkers: just how much does my cat, Checo, work next to me?</p>
              
            <p>He seemed to always be there, clocking in hours. I decided to turn this into a side project to track his effort</p>

            <Photo
              src={checoSetup}
              alt="Checo Setup"
              caption="Hardware setup for tracking Checo"
            />

            <p>To measure Checo's presence, I built a system using a Raspberry Pi W Zero 2 and a Pycam 3. The camera captures photos at regular intervals, which are then processed using a MobileNet CNN to determine if there's a cat in the image </p>

            <Photo
              src={checoWorking}
              alt="Checo Working"
              caption="Checo hard at work, seen from camera"
            />

            <p>Whenever the model detects Checo in the image, an entry is made in a DynamoDB database. To calculate Checo's total "work time," I created an API that triggers a Lambda function which retrieves the number of entries and from that calculates the duration of Checo's work</p>

            <Photo
              src={vestaboard}
              alt="Checo's Work Log"
              caption="Work time displayed on a Vestaboard"
            />

            <p>Fun way to keep my cat working! See his current status here: </p>
            <p>
              <a href="/CatTracker/Live">Checo Live</a>
            </p>
          </Subarticle>
        </Article>
      </main>
      <Footer />
    </div>
  );
}