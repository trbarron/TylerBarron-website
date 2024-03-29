import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Subarticle from '../components/Subarticle';
import Article from '../components/Article';
import Video from '../components/Video.js';
import Photo from '../components/Photo';

import setBoard from '../assets/img/Set/setBoard.jpg';
import setAnswers from '../assets/img/Set/setAnswers.jpg';
import setSetup from '../assets/img/Set/setSetup.jpg';

export default function Set() {
  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Article
          title="Set"
          subtitle=""
        >
          <Subarticle
            subtitle=""
          >
            <p>During quarantine, I found myself playing a lot of Set — a card game where you try to find sets of three cards that fit certain constraints.</p>

            <Photo
              src={setBoard}
              alt="Set Board"
              caption="An example Set Board"
            />

            <p>A set is three cards where each individual feature (color, shape, number, and shading) is either all the same or all different. Here are some examples:</p>

            <Photo
              src={setAnswers}
              alt="Set Answers"
              caption="Examples of sets using the above board"
            />

            <p>Naturally, this had to be automated. My friends were running a "casual distanced hackathon," and I chose this as my project. Here's the hardware setup I used:</p>

            <Photo
              src={setSetup}
              alt="Set Setup"
              caption="Hardware setup"
            />

            <p>Using the Kinect as an RGB camera, I was able to capture images and process them in OpenCV and Python. The program looks at an image of the board, labels the cards, finds sets, and reports them with a refresh rate of 0.25s on low powered laptop.</p>

            <p>Here's a demo:</p>

            <Video
              src="https://www.youtube.com/embed/U1rkMZI7B4M"
              caption="Demoing the product"
            />

            <p>I was very happy with what I was able to create in one weekend and ended up taking first in the hackathon.</p>
          </Subarticle>
        </Article>
      </main>
      <Footer />
    </div>
  );
}
