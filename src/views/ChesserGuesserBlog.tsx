import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Subarticle from '../components/Subarticle';
import Article from '../components/Article';
import Photo from '../components/Photo';

import chessBoard from '../assets/img/ChesserGuesser/screenshot.png';
import analyticsGraph from '../assets/img/Chess/analyticsGraph.jpg';
import communityInteraction from '../assets/img/Chess/communityInteraction.jpg';

export default function ChessBlog() {
  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Article
          title="Chesser Guesser"
          subtitle="A GeoGuessr for Chess Enthusiasts"
        >
          <Subarticle
            subtitle="The Why"
          >
            <p>Inspired by GeoGuessr, Chesser Guesser challenges players to estimate the computer's evaluation of chess positions. Players try to estimate the value of specific chess positions as accurately as possible, matching or closely approximating the engine's evaluation to extend their streak. The goal is to sharpen your evaluative skills by understanding why certain positions are deemed advantageous or disadvantageous by the computer.</p>

            <Photo
              src={chessBoard}
              alt="Chess Board Analysis"
              caption="A sample chess position from Chesser Guesser"
            />

            <p>The game integrates with the <a href='https://lichess.org/@/lichess/blog/thousands-of-stockfish-analysers/WN-gLzAA'>Lichess Cloud Analysis</a> to fetch position evaluations at scale, giving access to all the positions and their evaluations without me having to do any work. Having this resource made the tough part of this project incredibly easy.</p>
          </Subarticle>

      </Article>
      <Article
          title=""
          subtitle=""
        >
          <Subarticle
            subtitle="The How"
          >
            <p>Chesser Guesser uses Python connected to several Amazon DynamoDB instances for data storage. Lichess gives us a huge number of analyzed positions – we get to parse those down and only insert the interesting ones for our game. The criteria used was: </p>
            <p className='pl-8'>- The evaluation is not between -50 and 50 centipawns (in either direction to avoid ties)</p>
            <p className='pl-8'>- The evaluation is not above 400 centipawn (in either direction, would make the UI annoying)</p>
            <p className='pl-8'>- The same number of entries must be given for both the black and white side</p>
            <p className='pl-8'>- There are less than 5 pawns on any rank, to remove most analysis being on openings</p>
            <p>A total of 400 evaluations were added, although thousands meet the criteria</p>
            <hr></hr>
            <p>Then we have another application database that is also a DynamoDB that stores the daily user's scores. These will have the date, their total score and their name. The score is just the sums of the differences between their guesses and the computer's evaluation from all five rounds, which is what can land you on the leaderboards.</p>
          </Subarticle>
        </Article>
        <Article
          title=""
          subtitle=""
        >
          <Subarticle
            subtitle="The What"
          >
            <p>This was released on the afternoon of March 17th. It did really well on /r/chess, getting 40+k views, 50+ comments and a 95+% upvote rate. This spurred me to rush to implement Google Analytics where I could see the global engagement. Over one thousand people have since played in the daily challenges (including a few cheaters, which I try to remove), including a few titled players.</p>
            <p>Overall I would consider this experiment a success, hosting a lot of traffic and some fun conversations. I'm still playing most days of the week, so come give a try and say hello on the top 5!</p>
          </Subarticle>
        </Article>
      </main>
      <Footer />
    </div>
  );
}
