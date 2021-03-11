import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Input from "../components/TextInput.js";

import {getRound, getUsers, getUser, getTeams, postSelections, postCreateUser} from "../components/SurvivorBracketAPI.js"
import {encryptPass, checkPass} from "../assets/tools/passwordHash.js"

export default function SurvivorBracket() {

  const [showSignUp, setShowSignUp] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [selections, setSelections] = useState([]);
  
  
  const [currentUser, setCurrentUser] = useState();
  const [round, setRound] = useState();
  const [users, setUsers] = useState();
  const [teams, setTeams] = useState();

  const [entryName, setEntryName] = useState();
  const [password, setPassword] = useState();
  const [actualName, setActualName] = useState();
  const [venmo, setVenmo] = useState();
  const [commPassword, setCommPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();


  let mainContent = undefined;

  useEffect (() => {
    getData();

  }, [])

  function buttonify(teams, selectable) {
    let buttons = teams.map((entry) => {
        if (entry.filler === true) {
            return (<div key={entry.name + currentUser.selections} className={`w-2/6 rounded p-3 place-content-center h-min  ${selectable ? "cursor-pointer" : ""} `} onClick={() => teamSelectedHandle(entry.id, selectable)} >

            <div className="w-full ">
                <div className={`widget w-full p-2 rounded-lg bg-white border-l-8 duration-300 transition border-color-gray-dark ${(selections.includes(entry.id) && selectable)? "ring-4 ring-green-600 ring-opacity-60" : ""}`}>
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
            return (<div key={entry.name + currentUser.selections} className={`w-2/6 rounded p-3 place-content-center h-min  ${selectable ? "cursor-pointer" : ""} `} onClick={() => teamSelectedHandle(entry.id, selectable)} >

                <div className="w-full ">
                    <div className={`widget w-full p-2 rounded-lg bg-white border-l-8 duration-300 transition ${(selections.includes(entry.id) && selectable)? "ring-4 ring-green-600 ring-opacity-60" : ""}`} style={{borderColor: entry.color}}>
                        <div className="flex items-center">
                            <div className="icon w-14 p-3.5 text-lg text-white rounded-full mr-3 flex justify-center bg-gray-300" >
                                {entry.seed}
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="text-md text-gray-dark">{entry.name}</div>
                                <div className="text-sm text-gray-400">E{entry.seed}  ({entry.wlrecord})</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }
    })
    return buttons
  }


  async function getData() {
      let [_round, _users, _teams] = await Promise.all([getRound(),getUsers(),getTeams()])


      _users = parseUserTeamSelection(_users,_round,_teams);

      setRound(_round);
      setUsers(_users);
      setTeams(_teams);
  }

  async function logOn() {
    let userID = users.filter((u) => u.entryName === entryName);
    userID = userID[0].id;
    let user = await getUser(userID);

    if (checkPass(password,user.password)) {
        setCurrentUser(user);
        setLoggedIn(true);    
    }
    else {
        alert("ayy whoa you got the password wrong")
    }

  }

  async function signUp() {
    if (checkPass(commPassword,"$2a$04$Lnzgfev2RSknY3611TjxOuZt.F3gahg61aBakEWow1nS0KkJZxRfO")) { //hardcoded passwords are bad change ""
        //display something to show that they did it correctly
        
        let userID = users.filter((u) => u.entryName === entryName);
        if (userID.length > 0) {
            alert("username already exists")
            //show alert that shows that this username already exists
        }

        const encryptedPass = await encryptPass(password)
        console.log("encrptedpass: ",encryptedPass);
        await postCreateUser(entryName,encryptedPass,actualName,venmo,phoneNumber);
        
        getData()
        setShowSignUp(false);
    }

    else {
        alert("Commissioner Password was wrong");
    }
  }

  async function signUpToggleHandle() {
      setShowSignUp(!showSignUp);
  }

  async function submitTeams() {
      let formattedSelections = selections.join("o");
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
    let tempSum = parseInt(currentUser.totalSeed) || 0
    currSelTeams.forEach(element => {
        tempSum += parseInt(element.seed) || 0;
    });
    if (tempSum === NaN) {
        tempSum = 0
    }
    return tempSum
}

function parseUserTeamSelection(_users,_round,_teams) {
    
    _users.forEach(_user => {
        let data = `${_user.selections}`
        data = data.replaceAll("[","");
        data = data.replaceAll("]","");
        data = data.split(",");
        let allTeams = [];

        for (let _i = 0; _i < parseInt(_round); _i++) {
            let rData = data[_i].split("o");
            rData = rData.map(entry => parseInt(entry));

            allTeams.push(..._teams.filter((team) => rData.includes(parseInt(team.id))));
        }
        _user["visibleSelections"] = allTeams.map(a => a.name).join(", ");
    });

    
    return _users
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
                    id = {"Entry Name"}
                    label = {"Entry Name"}
                    handleChange = {(e) => setEntryName(e)}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Password"}
                    label = {"Password"}
                    isPassword = {true}
                    handleChange = {(e) => setPassword(e)}

                />
            </div>

            <div className="w-2/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={logOn}>
                <div className="w-full h-full text-center text-lg place-self-center pt-2">Log On</div>
            </div>

            <p></p>
            <p className="text-center">Need an account? <a onClick={signUpToggleHandle} className="cursor-pointer">Sign Up</a></p>

            <p className="text-center">Have questions? <a href="/MarchMadnessFAQ">FAQ</a></p>

        </Subarticle>

    }

    // Sign  Up for Account
    else if (showSignUp && !loggedIn) { mainContent = 
        <Subarticle>

            <h3 className="text-xl text-center pb-4">Sign Up</h3>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Entry Name"}
                    label = {"Entry Name"}
                    handleChange = {(e) => setEntryName(e)}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"User Password"}
                    label = {"User Password"}
                    isPassword = {true}
                    handleChange = {(e) => setPassword(e)}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Actual Name"}
                    label = {"Actual Name"}
                    handleChange = {(e) => setActualName(e)}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Venmo Name"}
                    label = {"Venmo Name"}
                    handleChange = {(e) => setVenmo(e)}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Phone Number"}
                    label = {"Phone Number"}
                    handleChange = {(e) => setPhoneNumber(e)}
                />
            </div>

            <div className="w-2/4 mx-auto h-16 pb-4">
                <Input
                    id = {"Commissioner Password"}
                    label = {"Commissioner Password"}
                    isPassword = {true}
                    handleChange = {(e) => setCommPassword(e)}
                />
            </div>

            <div className="w-2/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={signUp}>
                <div className="w-full h-full text-center text-lg place-self-center pt-2">Sign Up</div>
            </div>

            <p></p>
            <p className="text-center">Have an account? <a onClick={signUpToggleHandle} className="cursor-pointer">Log In</a></p>

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

        let fillerTeams = 0
        while (currSelTeams.length < 3) {
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

        let usersSorted = users.sort((a, b) => parseInt(b.totalSeed) - parseInt(a.totalSeed));
        
        let usersAlive = usersSorted.filter((u) => u.surv === "true");
        const formattedUsersAlive = usersAlive.map((u) => 
            <tr key={u.entryName}>
                <td className="px-6 py-4 text-center">{u.entryName}</td>
                <td className="px-6 py-4 text-center">{u.totalSeed}</td>
                <td className="px-6 py-4 text-center">{u.visibleSelections}</td>
                <td className="px-6 py-4 text-center">No</td>
            </tr>
        )
        
        let usersDead = usersSorted.filter((u) => u.surv === "false");
        const formattedUsersDead = usersDead.map((u) => 
            <tr key={u.entryName}>
                <td className="px-6 py-4 text-center">{u.entryName}</td>
                <td className="px-6 py-4 text-center">{u.totalSeed}</td>
                <td className="px-6 py-4 text-center">{u.visibleSelections}</td>
                <td className="px-6 py-4 text-center">Yes</td>
            </tr>
        )

        mainContent = 
            <Subarticle>

                <h3 className="text-xl text-center pb-4">Logged in: {currentUser.entryName}</h3>
                <h3 className="text-xl text-center pb-4">Total Seed Before Selections: {currentUser.totalSeed}</h3>
                <h3 className="text-xl text-center pb-4">Total Seed After Selections: {newTotalSeed(currSelTeams)}</h3>


                <div className="border-l-8 -ml-6 -mr-6 border-gray-600 border-opacity-50">

                    <h3 className="text-xl text-gray-dark pl-12 pb-4 text-center w-full bg-gray-600 bg-opacity-50 pt-3">Previously Selected Teams:</h3>

                    <div className="flex flex-wrap mx-6">
                        {buttonify(prevSelTeams, false)}
                    </div>
                </div>


                <div className="border-l-8 -ml-6 -mr-6 border-red-600 border-opacity-50">
                <h3 className="text-xl text-gray-dark pl-12 pb-4 text-center w-full bg-red-600 bg-opacity-50 pt-3">Eliminated Teams:</h3>

                    <div className="flex flex-wrap mx-6">
                        {buttonify(elimTeams, false)}
                    </div>
                </div>

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

                <div className="flex justify-between">
                <div className="w-5/12 h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={releaseTeams}>
                    <div className="w-full h-full text-center text-lg place-self-center pt-2">Release Teams</div>
                </div>

                <div className="w-5/12 h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={submitTeams}>
                    <div className="w-full h-full text-center text-lg place-self-center pt-2">Submit Teams</div>
                </div>
                </div>




                {/* Bro pull this code out plz */}
                <div className="flex flex-col h-80">
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
