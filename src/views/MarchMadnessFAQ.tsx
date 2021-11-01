
import analytics from '../components/Analytics.js'

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";


export default function MarchMadnessFAQ() {

  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-grow">
        <Article
          title="March Madness" 
          subtitle=""
        >

        <Subarticle
            subtitle="How the survivor pool works:"
        >
            
            <p>
                Traditional NCAA tournament pools have users select their entire bracket before the 64-team tournament starts. The survivor pool has users select a small number of teams they think will win ahead of each of the tournament's six rounds. The catch is that users cannot select the same team twice, meaning they have a very small pool of teams to pick as the tournament field is cut in half at each round.
            </p>

            <p>
                In Round 1, users select 3 teams they think will win. In order to pick again in Round 2, users need all three of their teams to win.
            </p>

            <p>
                In Round 2, users select 2 teams they think will win. The catch is users cannot select teams they've already picked. They need both of their selections to win in order to advance.
            </p>

            <p>
                In Round 3, and every round after that, users need to select just 1 winning team to move on. Again, it cannot be a team they have already picked.
            </p>

            <p className="font-bold">
                Users are eliminated when you either:
            </p>

            <p>
                -Pick a team that loses in that round (e.g. picking 1, 2, or 3 losing teams in Round 1, picking 1 or 2 losing teams in Round 2, picking a losing team in Round 3, etc.)
            </p>
            
            <p>
                -Run out of teams to use in the upcoming round (e.g. made it to Round 4 but have already used all the remaining teams).
            </p>
            
            <p>
                The winner will correctly pick the sufficient number of winners in each round OR make it farther than any other participant. The tiebreaker will be the user's total seed sum over the course of the tournament, so making riskier picks is incentivized.
            </p>

        </Subarticle>

        <Subarticle
            subtitle="Total seed sum explained:"
        >

            <p>
                User A in Round 1 picks 1-seed Gonzaga, 2-seed Villanova, and 7-seed UCLA. If all three teams win, their total seed sum is 1+2+7 = 10.
            </p>

            <p>
                User B in Round 1 picks 1-seed Baylor, 4-seed Tennessee, and 8-seed Oregon. If all three teams win, their total seed sum is 1+4+8 = 13. User B has the higher seed sum and is rewarded for making riskier picks.
            </p>

        </Subarticle>
        <Subarticle
            subtitle="Tiebreaker scenario explained:"
        >

            <p>
                An entry that loses in Round 5 is better than any entry that lost in Round 4, regardless of total seed sum. Two entries that both lost in Round 5 are differentiated by their total seed sums of correct picks through the first four rounds.
            </p>

            <p className="font-italics">
                Scenarios:
            </p>

            <p>
                In Round 5, User A has a total seed sum of 40 and selects 1-seed Gonzaga. User B has a total seed sum of 43 and also selects 1-seed Gonzaga. User C has a total seed sum of 51 and selects 4-seed Wisconsin. Gonzaga wins and Wisconsin loses.
            </p>

            <p>
                User C is eliminated and their very high seed sum is now irrelevant. User A and User B are still alive, but User B is ahead of User A in the standings because their total seed sum is 43+1=44 and User A's total seed sum is 40+1=41.
            </p>

            <p className="font-bold">
                There are also an opportunities to buy back into the pool if you have lost.
            </p>

            <p>
                Users can pay $20 to return to the pool if they select a losing team (or teams) in Round 1. Once you buy back in, they must then get one additional pick right in Round 2 in order to keep playing. So in order for buybackers to advance to Round 3, they would have to get 3 picks correct instead of just 2. Only their two highest seeded selections of the three will count towards the tiebreaker seed sum.
            </p>

        </Subarticle>

        <Subarticle
            subtitle="Buyback seed sum explained:"
        >

            <p>
                User selected 1-seed Gonzaga, 5-seed Louisville, and 7-seed UCLA in Round 1. Gonzaga and UCLA won, but Louisville did not win. Their total seed sum is 1+7 = 8 because Louisville did not win.
            </p>

            <p>
                User buys back in. In Round 2, they must select three teams. They select 1-seed Baylor, 4-seed Tennessee, and 11-seed Seton Hall. All three teams win and they can keep playing, but only Tennessee (4) and Seton Hall (11) count for their total seed sum.
            </p>

        </Subarticle>

        <Subarticle
            subtitle="The Nitty Gritty:"
        >
            <p>
                -$20 per entry (unlimited entries per user)
            </p>

            <p>
                -70% payout to winner, 25% to second, 5% of proceeds will benefit Left Behind K-9 Rescue
            </p>
        </Subarticle>
        
        <Subarticle
            subtitle="Schedule:"
        >
            <p>
                More info on the NCAA Tournament schedule linked here.
            </p>

            <p>
                The tournament starts on Thursday, March 18 at 4PM, so users' first three picks would need to be in before then.
            </p>

            <p>
                The second round starts on Sunday, March 20 at 12PM, so users' second two (or three for buybackers) picks would need to be in before then. If they have not selected by then, they are eliminated.
            </p>

            <p>
                The third round starts on Saturday, March 27 at 2PM, so users' picks (one pick for Round 3) would need to be in before then. If they have not selected by then, they are eliminated.
            </p>

            <p>
                Fourth round starts on Monday, March 29 at 7PM, so users' picks (one pick for Round 4) would need to be in before then. If they have not selected by then, they are eliminated.
            </p>

            <p>
                Fifth round starts on Saturday, April 3 at 5PM, so users' picks (one pick for Round 5) would need to be in before then. If they have not selected by then, they are eliminated.
            </p>

            <p>
                Sixth (last) round starts on Monday, April 5 at 9PM, so users' picks (one pick for Round 6) would need to be in before then. If they have not selected by then, they are eliminated.
            </p>

        </Subarticle>
        </Article>

      </main>
      <Footer />
    </div>
  );
}