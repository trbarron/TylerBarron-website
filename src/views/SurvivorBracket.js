import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Input from "../components/TextInput.js";

import {getRound, getUsers, getUser, getTeams, postSelections} from "../components/SurvivorBracketAPI.js"

export default function SurvivorBracket() {

  const [showSignUp, setShowSignUp] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selections, setSelections] = useState([]);
  
  
  const [currentUser, setCurrentUser] = useState();
  const [round, setRound] = useState();
  const [users, setUsers] = useState();
  const [teams, setTeams] = useState();

  let mainContent = undefined;

  useEffect (() => {
    getData();

  }, [])

  function buttonify(teams, selectable) {
    let buttons = teams.map((entry) =>
        <div key={entry.name + currentUser.selections} className={`w-1/6 ml-12 mb-4 rounded place-content-center h-min duration-300 transition ${selectable ? "cursor-pointer" : ""} ${(selections.includes(entry.id) && selectable)? "ring-4 p-2 ring-green-600 ring-opacity-60" : "p-2 "}`} onClick={() => teamSelectedHandle(entry.id, selectable)} style={{backgroundColor: entry.color}}>
            <div className="w-full h-full text-center bg-gray-light mx-auto my-auto p-2 rounded">
                <div className="absolute -mt-1 text-md font-bold">
                    {entry.seed}
                </div>

                <div className="text-lg">
                    {entry.name}
                </div>
                <div className= "text-sm">
                    ({entry.wlrecord})
                </div>
            </div>
        </div>
    )
    return buttons
  }


  async function getData() {
      const [_round, _users, _teams] = await Promise.all([getRound(),getUsers(),getTeams()])

      setRound(_round);
      setUsers(_users);
      setTeams(_teams);
  }

  async function logOn() {
    let user = await getUser(1);
    setCurrentUser(user);
    setLoggedIn(true);
  }

  async function signUpHandle() {
      setShowSignUp(!showSignUp);
  }

  async function submitTeams() {
      console.log("selections: ",selections);
      let formattedSelections = selections.join("o");
      console.log(formattedSelections)
      await postSelections(currentUser.id,formattedSelections);
      setSelections([])
      await logOn();

  }


  async function releaseTeams() {
    await postSelections(currentUser.id,"o");
    setSelections([])
    await logOn();
}

function newTotalSeed(currSelTeams) {
    let tempSum = parseInt(currentUser.totalSeed)
    currSelTeams.forEach(element => {
        tempSum += parseInt(element.seed);
    });

    return tempSum
}

  function teamSelectedHandle(name, selectable) {
    if (!selectable) {return}  
    
      if (selections.includes(name)) {
        setSelections(selections.filter((m) => m !== name))
      }
      else {
        setSelections([...selections, name]);
      }

      
  }

    // Default view
    if (!showSignUp && !loggedIn) { mainContent = 
        <Subarticle>

            <h3 className="text-xl text-center pb-4">Log On</h3>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Username"}
                    label = {"Username"}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"User Password"}
                    label = {"User Password"}
                    isPassword = {true}
                />
            </div>

            <div className="w-2/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={logOn}>
                <div className="w-full h-full text-center text-lg place-self-center pt-2">Log On</div>
            </div>

            <p></p>
            <p className="text-center">Need an account? <a onClick={signUpHandle} className="cursor-pointer">Sign Up</a></p>

            <p className="text-center">Have questions? <a href="/MarchMadnessFAQ">FAQ</a></p>

        </Subarticle>

    }

    // Sign  Up for Account
    else if (showSignUp && !loggedIn) { mainContent = 
        <Subarticle>

            <h3 className="text-xl text-center pb-4">Sign Up</h3>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Username"}
                    label = {"Username"}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"User Password"}
                    label = {"User Password"}
                    isPassword = {true}
                    locked = {true}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Actual Name"}
                    label = {"Actual Name"}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Venmo Name"}
                    label = {"Venmo Name"}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Commissioner Password"}
                    label = {"Commissioner Password"}
                    isPassword = {true}
                />
            </div>

            <div className="w-2/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={logOn}>
                <div className="w-full h-full text-center text-lg place-self-center pt-2">Sign Up</div>
            </div>

            <p></p>
            <p className="text-center">Have an account? <a onClick={signUpHandle} className="cursor-pointer">Log In</a></p>

            <p className="text-center">Have questions? <a href="/MarchMadnessFAQ">FAQ</a></p>

        </Subarticle>
    }

    // Real view
    else if (loggedIn) {


        //teams selected this round and 
        //teams already selected

        let prevSelTeams = []
        let currSelTeams = []
        let elimTeams = teams.filter((ele) => ele.results.includes("l"))
        let availTeams = teams.filter((ele) => !ele.results.includes("l"))

        let selectionData = `${currentUser.selections}`
        selectionData = selectionData.replaceAll("[","");
        selectionData = selectionData.replaceAll("]","");
        selectionData = selectionData.split(",");

        for (let _i = 0; _i <= round; _i++) {
            let rData = selectionData[_i].split("o");
            rData = rData.map(entry => parseInt(entry));

            if (_i === parseInt(round)) {
                currSelTeams.push(...teams.filter((team) => rData.includes(parseInt(team.id))));
            }
            else {
                prevSelTeams.push(...teams.filter((team) => rData.includes(parseInt(team.id))));
            }

            //remove teams that have been selected or are currently selected
            availTeams = availTeams.filter((m) => !rData.includes(parseInt(m.id)));
        }




        // Users for table thing

        let usersSorted = users.sort((a, b) => parseInt(b.totalSeed) - parseInt(a.totalSeed));
        
        let usersAlive = usersSorted.filter((u) => u.surv === "true");
        const formattedUsersAlive = usersAlive.map((u) => 
            <tr key={u.nickname}>
                <td className="px-6 py-4 text-center">{u.nickname}</td>
                <td className="px-6 py-4 text-center">{u.totalSeed}</td>
                <td className="px-6 py-4 text-center">No</td>
            </tr>
        )
        
        let usersDead = usersSorted.filter((u) => u.surv === "false");
        const formattedUsersDead = usersDead.map((u) => 
            <tr key={u.nickname}>
                <td className="px-6 py-4 text-center">{u.nickname}</td>
                <td className="px-6 py-4 text-center">{u.totalSeed}</td>
                <td className="px-6 py-4 text-center">Yes</td>
            </tr>
        )

        mainContent = 
            <Subarticle>

                <h3 className="text-xl text-center pb-4">Logged in: {currentUser.nickname}</h3>
                <h3 className="text-xl text-center pb-4">Total Seed Before Selections: {currentUser.totalSeed}</h3>
                <h3 className="text-xl text-center pb-4">Total Seed After Selections: {newTotalSeed(currSelTeams)}</h3>

                <h3 className="text-xl text-gray-dark pl-12 pb-4">Currently Selected Teams:</h3>

                <div className="flex flex-wrap">
                    {buttonify(currSelTeams, false)}
                </div>

                <h3 className="text-xl text-gray-dark pl-12 pb-4">Previously Selected Teams:</h3>

                <div className="flex flex-wrap">
                    {buttonify(prevSelTeams, false)}
                </div>

                <h3 className="text-xl text-gray-dark pl-12 pb-4">Eliminated Teams:</h3>

                <div className="flex flex-wrap">
                    {buttonify(elimTeams, false)}
                </div>

                <h3 className="text-xl text-gray-dark pl-12 pb-4">Available Teams:</h3>

                <div className="flex flex-wrap">
                    {buttonify(availTeams, true)}
                </div>

                <div className="w-2/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={releaseTeams}>
                    <div className="w-full h-full text-center text-lg place-self-center pt-2">Release Currently Selected Teams</div>
                </div>

                <div className="w-2/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={submitTeams}>
                    <div className="w-full h-full text-center text-lg place-self-center pt-2">Submit</div>
                </div>



                {/* Bro pull this code out plz */}
                <div className="flex flex-col h-80">
                    <div className="flex-grow overflow-auto">
                    <table className="relative w-full border">
                        <thead>
                        <tr>
                            <th className="sticky top-0 px-6 py-3 text-green-900 bg-green-300">Nickname</th>
                            <th className="sticky top-0 px-6 py-3 text-green-900 bg-green-300">Total Seed Score</th>
                            <th className="sticky top-0 px-6 py-3 text-green-900 bg-green-300">Eliminated?</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y bg-green-50">
                        {formattedUsersAlive}
                    </tbody>

                    <thead>
                        <tr>
                            <th className="sticky top-0 px-6 py-3 text-red-900 bg-red-300">Nickname</th>
                            <th className="sticky top-0 px-6 py-3 text-red-900 bg-red-300">Total Seed Score</th>
                            <th className="sticky top-0 px-6 py-3 text-red-900 bg-red-300">Eliminated?</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y bg-red-50">
                        {formattedUsersDead}
                        </tbody>
                </table>
                </div>
            </div>

                <p className="text-center">Have questions? <a href="/MarchMadnessFAQ">FAQ</a></p>

            </Subarticle>
    }

  return (
    <div className="bg-background bg-fixed min-h-screen flex flex-col justify-evenly">
      <Navbar/>
      <main className="flex-grow">

          
        <Article
          title="March Madness Survivor Bracket" 
          subtitle="Supporting Left Behind K-9 Rescue"
        //   styleModifier={}
        >
        {mainContent}


        </Article>

      </main>
      <Footer />
    </div>
  );
}
