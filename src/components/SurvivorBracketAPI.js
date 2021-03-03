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

export {getRound, getUsers, getUser, getTeams, postSelections}