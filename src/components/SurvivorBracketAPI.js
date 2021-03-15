function getRound() {
    return new Promise(resolve => {
        try {
            fetch('https://eusrys31w3.execute-api.us-east-1.amazonaws.com/api/round/get', {
                method: 'GET',
            }).then(response => {
                    return response.json()
                }).then(json => {
                    resolve (json.round.toString())
                });
        } catch (error) {
            console.log("Error 31: ",error)
            throw error
        }
    })
}

function getUsers() {
    return new Promise(resolve => {
        try {
            fetch('https://eusrys31w3.execute-api.us-east-1.amazonaws.com/api/user/getAll', {
                method: 'GET',
            }).then(response => {
                    return response.json()
                }).then(json => {
                    resolve (json)
                });
        } catch (error) {
            console.log("Error 32: ",error)
            throw error
        }
    })
}

function getUsersSuper() {
    return new Promise(resolve => {
        try {
            fetch('https://eusrys31w3.execute-api.us-east-1.amazonaws.com/api/user/getAllSuper', {
                method: 'GET',
            }).then(response => {
                    return response.json()
                }).then(json => {
                    resolve (json)
                });
        } catch (error) {
            console.log("Error 32: ",error)
            throw error
        }
    })
}

function getUser(id) {
    return new Promise(resolve => {
        try {
            fetch('https://eusrys31w3.execute-api.us-east-1.amazonaws.com/api/user/get/'+id, {
                method: 'GET',
            }).then(response => {
                    return response.json()
                }).then(json => {
                    resolve (json)
                });
        } catch (error) {
            console.log("Error 33: ",error)
            throw error
        }
    })
}


function getTeams() {
    return new Promise(resolve => {
        try {
            fetch('https://eusrys31w3.execute-api.us-east-1.amazonaws.com/api/team/getAll/', {
                method: 'GET',
            }).then(response => {
                    return response.json()
                }).then(json => {
                    resolve(json)
                });
        } catch (error) {
            console.log("Error 34: ",error)
            throw error
        }
    })
}

function postSelections(id,selections) {
    return new Promise(resolve => {
        try {
            fetch('https://eusrys31w3.execute-api.us-east-1.amazonaws.com/api/user/post/'+id + "/" + selections, {
                method: 'POST',
            }).then(response => {
                    return response.json()
                }).then(json => {
                    console.log("Successfully set selections");
                    resolve(json)
                });
        } catch (error) {
            console.log("Error 35: ",error)
            throw error
        }
    })
}

function postCreateUser(entryName,password,actualName,venmo,email,phoneNumber) {

    const data = {
        entryName,
        password,
        actualName,
        venmo,
        email,
        phoneNumber,
        "selections": "[[],[],[],[],[],[],[],[],[],[],[]]",
        "surv": "true",
        "totalSeed": "0",
        "deathTeam": "0",
        "broughtBack": "false",
    }

    return new Promise(resolve => {
        try {
            fetch('https://eusrys31w3.execute-api.us-east-1.amazonaws.com/api/user/post/createUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }).then(response => {
                    return response.json()
                }).then(json => {
                    console.log("Successfully created user");
                    resolve(json)
                });
        } catch (error) {
            console.log("Error 35: ",error)
            throw error
        }
    })
}

export {getRound, getUsers, getUsersSuper, getUser, getTeams, postSelections, postCreateUser}