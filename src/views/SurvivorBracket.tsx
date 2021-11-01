import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import analytics from '../components/Analytics.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Input from "../components/TextInput.js";

import { getRound, getUsers, getUser, getTeams, postSelections, postCreateUser } from "../components/SurvivorBracketAPI.js"
import { encryptPass, checkPass } from "../assets/tools/passwordHash.js"
import { entry, user, team } from "../types/SurvivorBracket";

export default function SurvivorBracket() {

    const [showSignUp, setShowSignUp] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [selections, setSelections] = useState<any>([]);

    const [currentUser, setCurrentUser] = useState<user>();
    const [round, setRound] = useState<string | undefined>();
    const [users, setUsers] = useState<any>();
    const [teams, setTeams] = useState<any>();

    const [entryName, setEntryName] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [actualName, setActualName] = useState<string | undefined>();
    const [venmo, setVenmo] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [commPassword, setCommPassword] = useState<string | undefined>();
    const [phoneNumber, setPhoneNumber] = useState<string | undefined>();

    const lockedOut = false;


    let mainContent: JSX.Element = <div></div>;
    let selectionsKey = currentUser ? currentUser.selections : "null" ;

    useEffect(() => {
        async function getData() {
            let [_round, _users, _teams] = await Promise.all([getRound(), getUsers(), getTeams()])
    
    
            _users = parseUserTeamSelection(_users, _round, _teams);
    
            setRound(_round);
            setUsers(_users);
            setTeams(_teams);
        }

        getData();

    }, [])

    async function getData() {
        let [_round, _users, _teams] = await Promise.all([getRound(), getUsers(), getTeams()])


        _users = parseUserTeamSelection(_users, _round, _teams);

        setRound(_round);
        setUsers(_users);
        setTeams(_teams);
    }

    function buttonify(teams: any, selectable: boolean) {
        let buttons = teams.map((entry: entry) => {
            if (entry.filler === true) {
                return (<div key={entry.name + selectionsKey} className={`w-2/6 rounded p-3 place-content-center h-min  ${selectable ? "cursor-pointer" : ""} `} onClick={() => teamSelectedHandle(entry.id, selectable)} >

                    <div className="w-full ">
                        <div className={`widget w-full p-2 rounded-lg bg-white border-l-8 duration-300 transition border-color-gray-dark ${(selections.includes(entry.id) && selectable) ? "ring-4 ring-green-600 ring-opacity-60" : ""}`}>
                            <div className="flex items-center">
                                <div className="icon w-14 p-3.5 text-xl text-white rounded-full mr-3 flex justify-center bg-gray-200" >
                                    --
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
            else {
                return (<div key={entry.name + selectionsKey} className={`w-2/6 rounded p-3 place-content-center h-min  ${selectable ? "cursor-pointer" : ""} `} onClick={() => teamSelectedHandle(entry.id, selectable)} >

                    <div className="w-full ">
                        <div className={`widget w-full p-2 rounded-lg bg-white border-l-8 duration-300 transition ${(selections.includes(entry.id) && selectable) ? "ring-4 ring-green-600 ring-opacity-60" : ""}`} style={{ borderColor: entry.color }}>
                            <div className="flex items-center">
                                <div className="icon w-14 p-3.5 text-lg text-white rounded-full mr-3 flex justify-center bg-gray-300" >
                                    {entry.seed}
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="text-md text-gray-dark">{entry.name}</div>
                                    <div className="text-sm text-gray-400">{entry.division}{entry.seed}  ({entry.wlrecord})</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        })
        return buttons
    }




    async function logOn() {
        let userID = users.filter((u: { entryName: string }) => u.entryName === entryName);
        userID = userID[0].id;
        let user = await getUser(userID);

        if (checkPass(password, user.password)) {
            setCurrentUser(user);
            setLoggedIn(true);
        }
        else {
            toast.error("Incorrect User Password Incorrect");
        }

    }

    async function signUp() {
        if (checkPass(commPassword, "$2a$04$Lnzgfev2RSknY3611TjxOuZt.F3gahg61aBakEWow1nS0KkJZxRfO")) { //hardcoded passwords are bad
            //display something to show that they did it correctly

            let userID = users.filter((u: user) => u.entryName === entryName);
            if (userID.length > 0) {
                toast.error("Entry Name has already been used");
            }
            else {
                const encryptedPass = await encryptPass(password)
                await postCreateUser(entryName, encryptedPass, actualName, venmo, email, phoneNumber);

                getData()
                setShowSignUp(false);
                toast.success("Successfully Created User");
            }
        }

        else {
            toast.error("Commissioner Password Incorrect");
        }
    }

    async function signUpToggleHandle() {
        setShowSignUp(!showSignUp);
    }

    async function submitTeams() {
        if (lockedOut) {
            toast.error("Selections Locked")
            return
        }
        else {
            if (selections.length !== allowedTeams) { toast.error("Incorrect # of teams selected") }
            else {
                let _id = currentUser ? currentUser.id : "";
                let formattedSelections = selections.join("o");

                await postSelections(_id, formattedSelections);
                setSelections([])
                toast.success("Successfully Submitted Teams")
                await logOn();
            }
        }
    }


    async function releaseTeams() {
        if (lockedOut) {
            toast.error("Selections Locked")
            return
        }
        else {
            await postSelections(currentUser!.id, "o");
            setSelections([])
            await logOn();
        }
    }

    async function logOut() {
        setCurrentUser(undefined);
        setLoggedIn(false);
        toast.success("Successfully Logged Out");
    }

    // function newTotalSeed(currSelTeams) {
    //     let tempSum = parseInt(currentUser.totalSeed) || 0
    //     currSelTeams.forEach(element => {
    //         tempSum += parseInt(element.seed) || 0;
    //     });
    //     if (tempSum === NaN) {
    //         tempSum = 0
    //     }
    //     return tempSum
    // }

    function parseUserTeamSelection(_users: user[], _round: string, _teams: team[]) {

        _users.forEach(_user => {
            let data = `${_user.selections}`
            data = data.replaceAll("[", "");
            data = data.replaceAll("]", "");
            const dataArray: string[] = data.split(",");
            let allTeams = [];

            let _i = 0

            do {
                const rDataString: string[] = dataArray[_i].split("o");
                const rDataInt: number[] = rDataString.map(entry => parseInt(entry));

                allTeams.push(..._teams.filter((team) => rDataInt.includes(parseInt(team.id))));
                _i++
            }
            while (_i < parseInt(_round))

            const visibleSelections = allTeams.map(a => a.name).join(", ");
            _user["visibleSelections"] = visibleSelections
        });


        return _users
    }

    function teamSelectedHandle(name: string, selectable: boolean) {
        if (!selectable) { return }

        if (selections.includes(name)) {
            setSelections(selections.filter((m: string) => m !== name))
        }
        else {
            setSelections([...selections, name]);
        }


    }

    let faq: JSX.Element = <div></div>
    if (!loggedIn) {
        faq = <Article
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
    }

    // Default view
    if (!showSignUp && !loggedIn) {
        mainContent =
            <Article
                title="March Madness"
            //   styleModifier={}
            >
                <Subarticle>

                    <h3 className="text-xl text-center pb-4">Log On</h3>

                    <div className="w-2/4 mx-auto h-16 pb-4">
                        <Input
                            id={"Entry Name"}
                            label={"Entry Name"}
                            handleChange={(e: string) => setEntryName(e)}
                        />
                    </div>

                    <div className="w-2/4 mx-auto h-16 pb-4">
                        <Input
                            id={"Password"}
                            label={"Password"}
                            isPassword={true}
                            handleChange={(e: string) => setPassword(e)}

                        />
                    </div>

                    <div className="w-2/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={logOn}>
                        <div className="w-full h-full text-center text-lg place-self-center pt-2">Log On</div>
                    </div>

                    <p></p>
                    <p className="text-center">Need an account? <a onClick={signUpToggleHandle} className="cursor-pointer">Sign Up</a></p>

                </Subarticle>
            </Article>

    }

    // Sign  Up for Account
    else if (showSignUp && !loggedIn) {
        mainContent =
            <Article
                title="March Madness"
            >
                <Subarticle>

                    <h3 className="text-xl text-center pb-4">Sign Up</h3>

                    <div className="w-2/4 mx-auto h-16 pb-4">
                        <Input
                            id={"Entry Name"}
                            label={"Entry Name"}
                            handleChange={(e: string) => setEntryName(e)}
                        />
                    </div>

                    <div className="w-2/4 mx-auto h-16 pb-4">
                        <Input
                            id={"User Password"}
                            label={"User Password"}
                            isPassword={true}
                            handleChange={(e: string) => setPassword(e)}
                        />
                    </div>

                    <div className="w-2/4 mx-auto h-16 pb-4">
                        <Input
                            id={"Actual Name"}
                            label={"Actual Name"}
                            handleChange={(e: string) => setActualName(e)}
                        />
                    </div>

                    <div className="w-2/4 mx-auto h-16 pb-4">
                        <Input
                            id={"Venmo Name"}
                            label={"Venmo Name"}
                            handleChange={(e: string) => setVenmo(e)}
                        />
                    </div>

                    <div className="w-2/4 mx-auto h-16 pb-4">
                        <Input
                            id={"Email"}
                            label={"Email"}
                            handleChange={(e: string) => setEmail(e)}
                        />
                    </div>


                    <div className="w-2/4 mx-auto h-16 pb-4">
                        <Input
                            id={"Phone Number"}
                            label={"Phone Number"}
                            handleChange={(e: string) => setPhoneNumber(e)}
                        />
                    </div>

                    <div className="w-2/4 mx-auto h-16 pb-4">
                        <Input
                            id={"Commissioner Password"}
                            label={"Commissioner Password"}
                            isPassword={true}
                            handleChange={(e: string) => setCommPassword(e)}
                        />
                    </div>

                    <div className="w-2/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={signUp}>
                        <div className="w-full h-full text-center text-lg place-self-center pt-2">Sign Up</div>
                    </div>

                    <p></p>
                    <p className="text-center">Have an account? <button type="button" onClick={signUpToggleHandle} className="cursor-pointer">Log In</button></p>



                </Subarticle>
            </Article>
    }

    // Real view
    else if (loggedIn) {


        //teams selected this round and 
        //teams already selected

        let prevSelTeams = []
        let currSelTeams = []
        // let elimTeams = teams.filter((ele) => ele.results.includes("l"))
        let availTeams: team[] = teams.filter((ele: team) => !ele.results.includes("l"))

        let selectionData: string = `${currentUser!.selections}`
        selectionData = selectionData.replaceAll("[", "");
        selectionData = selectionData.replaceAll("]", "");
        const selectionDataArray: string[] = selectionData.split(",");

        for (let _i: number = 0; _i <= parseInt(round!); _i++) {
            const rDataString: string[] = selectionDataArray[_i].split("o");
            const rDataNum: number[] = rDataString.map(entry => parseInt(entry));

            if (_i === parseInt(round!)) {
                currSelTeams.push(...teams.filter((team: team) => rDataNum.includes(parseInt(team.id))));
            }
            else {
                prevSelTeams.push(...teams.filter((team: team) => rDataNum.includes(parseInt(team.id))));
            }

            //remove teams that have been selected or are currently selected
            availTeams = availTeams.filter((m) => !rDataNum.includes(parseInt(m.id)));
        }

        let fillerTeams = 0
        var allowedTeams = 1
        if (round === "0" || (round === "1" && currentUser!.buyback)) { allowedTeams = 3 }
        if (round === "1" && !currentUser!.buyback) { allowedTeams = 2 }

        while (currSelTeams.length < allowedTeams) {
            let blankTeam = {
                id: fillerTeams,
                name: fillerTeams,
                seed: "-",
                wlrecord: "",
                color: "#222222",
                filler: true
            }
            fillerTeams += 1;
            currSelTeams.push(blankTeam)
            //todo make this look right currSelTeams.push(...teams.filter((team) => rData.includes(parseInt(team.id))));
        }




        // Users for table thing

        let usersSorted = users.sort((a: user, b: user) => parseInt(b.totalSeed) - parseInt(a.totalSeed));

        let usersAlive = usersSorted.filter((u: user) => u.surv === "true");
        const formattedUsersAlive = usersAlive.map((u: user) =>
            <tr key={u.entryName} className={` text-center ${u.hidden === "true" ? "hidden" : ""} `}>
                <td className="px-6 py-4 ">{u.entryName}</td>
                <td className="px-6 py-4 ">{u.totalSeed}</td>
                <td className="px-6 py-4 ">{u.visibleSelections}</td>
                <td className="px-6 py-4 ">No</td>
            </tr>
        )

        let usersDead = usersSorted.filter((u: user) => u.surv === "false");
        const formattedUsersDead = usersDead.map((u: user) =>
            <tr key={u.entryName} className={` text-center ${u.hidden === "true" ? "hidden" : ""} `}>
                <td className="px-6 py-4 ">{u.entryName}</td>
                <td className="px-6 py-4 ">{u.totalSeed}</td>
                <td className="px-6 py-4 ">{u.visibleSelections}</td>
                <td className="px-6 py-4 ">Yes</td>
            </tr>
        )

        mainContent = (
            <div>
                <Article
                    title="Selections"
                    subtitle={"Logged in: " + currentUser!.entryName}
                >
                    <Subarticle>
                        <div className="text-center pb-8 ">
                            <a className="text-3xl bg-white p-1" href="https://fantasy.espn.com/tournament-challenge-bracket/2021/en/bracket">
                                Link to ESPN bracket
                            </a>
                        </div>

                        <div className="flex justify-left">

                        </div>
                        {/* <h3 className="text-xl text-center">Total Seed Before Selections: {currentUser.totalSeed}</h3> */}
                        {/* <h3 className="text-xl text-center pb-4">Total Seed After Selections: {newTotalSeed(currSelTeams)}</h3> */}


                        <div className="border-l-8 -ml-6 -mr-6 border-gray-600 border-opacity-50 ">

                            <h3 className={`text-xl text-gray-dark pl-12 pb-4 text-center w-full bg-gray-600 bg-opacity-50 pt-3  ${prevSelTeams.length > 0 ? "" : " hidden"} `}>Previously Selected Teams:</h3>

                            <div className="flex flex-wrap mx-6">
                                {buttonify(prevSelTeams, false)}
                            </div>
                        </div>


                        {/* <div className= {`border-l-8 -ml-6 -mr-6 border-red-600 border-opacity-50  ${elimTeams.length > 0 ? "" : " hidden"} `}>
                            <h3 className="text-xl text-gray-dark pl-12 pb-4 text-center w-full bg-red-600 bg-opacity-50 pt-3">Eliminated Teams:</h3>
                            <div className="flex flex-wrap mx-6">
                                {buttonify(elimTeams, false)}
                            </div>
                        </div> */}

                        <div className="border-l-8 -ml-6 -mr-6 border-blue-600 border-opacity-50">

                            <h3 className="text-xl text-gray-dark pl-12 pb-4 text-center w-full bg-blue-600 bg-opacity-50 pt-3">Currently Selected Teams:</h3>

                            <div className="flex flex-wrap mx-6">
                                {buttonify(currSelTeams, false)}
                            </div>
                        </div>

                        <div className="border-l-8 -ml-6 -mr-6 border-green-400 border-opacity-50">

                            <h3 className="text-xl text-gray-dark pl-12 pb-4 text-center w-full bg-green-400 bg-opacity-50 pt-3">Available Teams:</h3>

                            <div className="flex flex-wrap mx-6">
                                {buttonify(availTeams, true)}
                            </div>
                        </div>

                        <div className="flex justify-between px-4">
                            <div className="w-full h-12 mb-4 bg-white border rounded cursor-pointer" onClick={submitTeams}>
                                <div className="w-full h-full text-center text-lg place-self-center pt-2">Submit Teams</div>
                            </div>
                        </div>

                        <div className="flex justify-between px-4">

                            <div className="w-5/12 h-12 mb-4 bg-white border rounded cursor-pointer" onClick={logOut}>
                                <div className="w-full h-full text-center text-lg place-self-center pt-2">Log Out</div>
                            </div>

                            <div className="w-5/12 h-12 mb-4 bg-white border rounded cursor-pointer" onClick={releaseTeams}>
                                <div className="w-full h-full text-center text-lg place-self-center pt-2">Release Teams</div>
                            </div>

                        </div>
                    </Subarticle>
                </Article>


                <Article
                    title="Standings"
                >
                    <Subarticle>

                        {/* Bro pull this code out plz */}
                        <div className="flex flex-col h-120">
                            <div className="flex-grow overflow-auto">
                                <table className="relative w-full border">
                                    <thead>
                                        <tr>
                                            <th className="sticky top-0 px-6 py-3 text-green-900 bg-green-300">Entry Name</th>
                                            <th className="sticky top-0 px-6 py-3 text-green-900 bg-green-300">Total Seed Score</th>
                                            <th className="sticky top-0 px-6 py-3 text-green-900 bg-green-300">Teams Selected</th>
                                            <th className="sticky top-0 px-6 py-3 text-green-900 bg-green-300">Eliminated?</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y bg-green-50">
                                        {formattedUsersAlive}
                                    </tbody>

                                    <thead>
                                        <tr>
                                            <th className="sticky top-0 px-6 py-3 text-red-900 bg-red-300">Entry Name</th>
                                            <th className="sticky top-0 px-6 py-3 text-red-900 bg-red-300">Total Seed Score</th>
                                            <th className="sticky top-0 px-6 py-3 text-red-900 bg-red-300">Teams Selected</th>
                                            <th className="sticky top-0 px-6 py-3 text-red-900 bg-red-300">Eliminated?</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y bg-red-50">
                                        {formattedUsersDead}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div></div>

                    </Subarticle>
                </Article>
            </div>)
    }

    return (
        <div className="bg-background bg-fixed min-h-screen flex flex-col justify-evenly">
            <Navbar />
            <ToastContainer />
            <main className="flex-grow">

                {mainContent}
                {faq}

            </main>
            <Footer />
        </div>
    );
}