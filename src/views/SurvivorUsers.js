import React, { useEffect, useState } from "react";
import analytics from '../components/Analytics.js'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Subarticle from "../components/Subarticle.js";
import Article from "../components/Article.js";
import Input from "../components/TextInput.js";

import { getRound, getUser, getUsersSuper, getTeams, postCreateUser } from "../components/SurvivorBracketAPI.js"
import { encryptPass, checkPass } from "../assets/tools/passwordHash.js"

export default function SurvivorUsers() {

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
    const [email, setEmail] = useState();
    const [commPassword, setCommPassword] = useState();
    const [phoneNumber, setPhoneNumber] = useState();


    let mainContent = undefined;

    useEffect(() => {
        getData();

    }, [])

    async function getData() {
        let [_round, _users, _teams] = await Promise.all([getRound(), getUsersSuper(), getTeams()])


        _users = parseUserTeamSelection(_users, _round, _teams);

        setRound(_round);
        setUsers(_users);
        setTeams(_teams);
    }

    async function logOn() {
        let userID = users.filter((u) => u.entryName === entryName);
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

            let userID = users.filter((u) => u.entryName === entryName);
            if (userID.length > 0) {
                toast.error("Entry Name has already been used");
            }

            const encryptedPass = await encryptPass(password)
            await postCreateUser(entryName, encryptedPass, actualName, venmo, email, phoneNumber);

            getData()
            setShowSignUp(false);
            toast.success("Successfully Created User");
        }

        else {
            toast.error("Commissioner Password Incorrect");
        }
    }

    async function signUpToggleHandle() {
        setShowSignUp(!showSignUp);
    }

    async function logOut() {
        setCurrentUser(null);
        setLoggedIn(false);
        toast.success("Successfully Logged Out");
    }


    function parseUserTeamSelection(_users, _round, _teams) {

        _users.forEach(_user => {
            let data = `${_user.selections}`
            data = data.replaceAll("[", "");
            data = data.replaceAll("]", "");
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

    let faq = ""

    // Default view
    if (!showSignUp && !loggedIn) {
        mainContent =
        <Article
            title="Users All Info Portal"
        >
            <Subarticle>

                <h3 className="text-xl text-center pb-4">Log On</h3>

                <div className="w-2/4 mx-auto h-16 pb-4">
                    <Input
                        id={"Entry Name"}
                        label={"Entry Name"}
                        handleChange={(e) => setEntryName(e)}
                    />
                </div>

                <div className="w-2/4 mx-auto h-16 pb-4">
                    <Input
                        id={"Password"}
                        label={"Password"}
                        isPassword={true}
                        handleChange={(e) => setPassword(e)}

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
            title="Users All Info Portal"
        >
            <Subarticle>

                <h3 className="text-xl text-center pb-4">Sign Up</h3>

                <div className="w-2/4 mx-auto h-16 pb-4">
                    <Input
                        id={"Entry Name"}
                        label={"Entry Name"}
                        handleChange={(e) => setEntryName(e)}
                    />
                </div>

                <div className="w-2/4 mx-auto h-16 pb-4">
                    <Input
                        id={"User Password"}
                        label={"User Password"}
                        isPassword={true}
                        handleChange={(e) => setPassword(e)}
                    />
                </div>

                <div className="w-2/4 mx-auto h-16 pb-4">
                    <Input
                        id={"Actual Name"}
                        label={"Actual Name"}
                        handleChange={(e) => setActualName(e)}
                    />
                </div>

                <div className="w-2/4 mx-auto h-16 pb-4">
                    <Input
                        id={"Venmo Name"}
                        label={"Venmo Name"}
                        handleChange={(e) => setVenmo(e)}
                    />
                </div>

                <div className="w-2/4 mx-auto h-16 pb-4">
                    <Input
                        id={"Email"}
                        label={"Email"}
                        handleChange={(e) => setEmail(e)}
                    />
                </div>


                <div className="w-2/4 mx-auto h-16 pb-4">
                    <Input
                        id={"Phone Number"}
                        label={"Phone Number"}
                        handleChange={(e) => setPhoneNumber(e)}
                    />
                </div>

                <div className="w-2/4 mx-auto h-16 pb-4">
                    <Input
                        id={"Commissioner Password"}
                        label={"Commissioner Password"}
                        isPassword={true}
                        handleChange={(e) => setCommPassword(e)}
                    />
                </div>

                <div className="w-2/4 mx-auto h-12 mb-4 bg-red-light rounded cursor-pointer" onClick={signUp}>
                    <div className="w-full h-full text-center text-lg place-self-center pt-2">Sign Up</div>
                </div>

                <p></p>
                <p className="text-center">Have an account? <a onClick={signUpToggleHandle} className="cursor-pointer">Log In</a></p>



            </Subarticle>
        </Article>
    }

    // Real view
    else if (loggedIn && (currentUser.id === "1" || currentUser.id === "2")) {


        // Users for table thing

        let usersSorted = users.sort((a, b) => parseInt(b.totalSeed) - parseInt(a.totalSeed));

        const formattedUsers = usersSorted.map((u) =>
            <tr key={u.entryName} className={` text-center ${u.hidden === "true" ? "bg-red-300" : "bg-white"} `}>
                <td className="px-3 py-1">{u.entryName}</td>
                <td className="px-3 py-1">{u.actualName}</td>
                <td className="px-3 py-1">{u.venmo}</td>
                <td className="px-3 py-1">{u.email}</td>
                <td className="px-3 py-1">{u.phoneNumber}</td>
                <td className="px-3 py-1">{u.broughtBack}</td>
                <td className="px-3 py-1">{u.hidden}</td>
            </tr>
        )

        mainContent = (
            <div>
                <Article
                    title="Standings"
                    subtitle={"Logged in: " + currentUser.entryName}
                >
                    <Subarticle>

                        {/* Bro pull this code out plz */}
                        <div className="flex flex-col h-120">
                            <div className="flex-grow overflow-auto">
                                <table className="relative w-full border">
                                    <thead>
                                        <tr>
                                            <th className="sticky top-0 px-3 py-3">Entry Name</th>
                                            <th className="sticky top-0 px-3 py-3">Actual Name</th>
                                            <th className="sticky top-0 px-3 py-3">Venmo</th>
                                            <th className="sticky top-0 px-3 py-3">Email</th>
                                            <th className="sticky top-0 px-3 py-3">Phone #</th>
                                            <th className="sticky top-0 px-3 py-3">Bought Back?</th>
                                            <th className="sticky top-0 px-3 py-3">Hidden?</th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y bg-black">
                                        {formattedUsers}
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
