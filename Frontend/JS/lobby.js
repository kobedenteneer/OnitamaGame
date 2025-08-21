'use strict';

const API_URL = "https://onitama-12a225e535b0.herokuapp.com/api"

async function createTable(id, username, token){
    let url = `${API_URL}/Tables`;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(
            {
                "numberOfPlayers": 2,
                "playerMatSize": 5,
                "moveCardSet": 0
            }
        )
    }
    let response = await fetch(url, options);
    let data = await response.json();
    if (response.ok) {
        let tables = [JSON.stringify(data)];
        console.log(tables);
        localStorage.setItem("tables", tables);
        let div = document.createElement('div');
        div.className = "differentTables";
        div.innerHTML = `
            <div class="notfull" id=}>
                <svg width="800px" height="800px" viewBox="0 0 24 24" id="_24x24_On_Light_Session-Join" data-name="24x24/On Light/Session-Join" xmlns="http://www.w3.org/2000/svg">
                    <rect id="view-box" width="24" height="24" fill="none"/>
                    <path id="Shape" d="M5.75,17.5a.75.75,0,0,1,0-1.5h8.8A1.363,1.363,0,0,0,16,14.75v-12A1.363,1.363,0,0,0,14.55,1.5H5.75a.75.75,0,0,1,0-1.5h8.8A2.853,2.853,0,0,1,17.5,2.75v12A2.853,2.853,0,0,1,14.55,17.5ZM7.22,13.28a.75.75,0,0,1,0-1.061L9.939,9.5H.75A.75.75,0,0,1,.75,8H9.94L7.22,5.28A.75.75,0,0,1,8.28,4.22l4,4,.013.013.005.006.007.008.007.008,0,.005.008.009,0,0,.008.01,0,0,.008.011,0,0,.008.011,0,0,.008.011,0,0,.007.011,0,.005.006.01,0,.007,0,.008,0,.009,0,.006.006.011,0,0,.008.015h0a.751.751,0,0,1-.157.878L8.28,13.28a.75.75,0,0,1-1.06,0Z" transform="translate(3.25 3.25)" fill="#141124"/>
                </svg>
            </div>
            <span><p>User1 <br>1/2</p></span>
        `;
        document.body.appendChild(div);
        localStorage.setItem("currentTableId", data.id);
        localStorage.setItem("ownerPlayerId", data.ownerPlayerId);
        window.location.href = "game.html";
    }
    else {
        errorMessage(JSON.parse(data).message);
        throw new Error(`error with status ${response.status}`);
    }
}

async function getAvailableTables(token) {
    let url = `${API_URL}/Tables/with-available-seats`;
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${token}`
        }
    }
    let response = await fetch(url, options);
    let data = await response.json();
    if (response.ok) {
        let main = document.getElementsByClassName("lobby")[0];
        let tables = [];
        for (let i = 0; i < data.length; i++) {
            tables.push(JSON.stringify(data[i]));
            console.log(data[i]);
            localStorage.setItem("tables", tables);
            let classname = "notfull";
            if (data[i].seatedPlayers.length == 2) {
                classname = "full";
            }
            let div = document.createElement('a');
            div.id = data[i].id;
            div.className = "differentTables";
            div.innerHTML = `
                <div class="${classname}">
                    <svg width="800px" height="800px" viewBox="0 0 24 24" id="_24x24_On_Light_Session-Join" data-name="24x24/On Light/Session-Join" xmlns="http://www.w3.org/2000/svg">
                        <rect id="view-box" width="24" height="24" fill="none"/>
                        <path id="Shape" d="M5.75,17.5a.75.75,0,0,1,0-1.5h8.8A1.363,1.363,0,0,0,16,14.75v-12A1.363,1.363,0,0,0,14.55,1.5H5.75a.75.75,0,0,1,0-1.5h8.8A2.853,2.853,0,0,1,17.5,2.75v12A2.853,2.853,0,0,1,14.55,17.5ZM7.22,13.28a.75.75,0,0,1,0-1.061L9.939,9.5H.75A.75.75,0,0,1,.75,8H9.94L7.22,5.28A.75.75,0,0,1,8.28,4.22l4,4,.013.013.005.006.007.008.007.008,0,.005.008.009,0,0,.008.01,0,0,.008.011,0,0,.008.011,0,0,.008.011,0,0,.007.011,0,.005.006.01,0,.007,0,.008,0,.009,0,.006.006.011,0,0,.008.015h0a.751.751,0,0,1-.157.878L8.28,13.28a.75.75,0,0,1-1.06,0Z" transform="translate(3.25 3.25)" fill="#141124"/>
                    </svg>
                </div>
                <span><p>${data[i].seatedPlayers[0].name} <br>${data[i].seatedPlayers.length}/2</p></span>
            `;
            main.appendChild(div);
        }  
    }
    else {
        errorMessage(JSON.parse(data).message);
        throw new Error(`error with status ${response.status}`);
    } 
}

async function joinTable(id, username, token){
    let url = `${API_URL}/Tables/${id}/join`;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    let response = await fetch(url, options);
    let data = await response.json();
    if (response.ok) {
        return data;
    }
    else {
        console.log(response);
        throw new Error(`error with status ${response.status}`);
    }
}

async function handleClick() {
    let id = localStorage.getItem("id");
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("token");
    if (id != '' && username != '' && token != '' && id != null && username != null && token != null) {
        try {
            await createTable(id, username, token);
        }
        catch (error) {
            if (error.message != '') {
                errorMessage("Kan geen tafel maken");
                console.log(error);
            }
            return;
        }
    }
    else {
        errorMessage("kan geen tafel maken, je bent niet ingelogd");
    }
}

function logoutHandleClick() {
    localStorage.clear();
    window.location.href = "index.html";
}

async function handleLoad() {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username");

    document.getElementsByClassName("username")[0].innerHTML = username;
    document.getElementsByClassName("logout")[0].addEventListener("click", logoutHandleClick);

    let knop = document.getElementById("addtableButton").addEventListener("click", handleClick);
    
    await getAvailableTables(token);
    
    for (let i = 0; i < document.getElementsByClassName("differentTables").length; i++) {
        document.getElementsByClassName("differentTables")[i].addEventListener("click", async function() {
            let id = document.getElementsByClassName("differentTables")[i].id;
            localStorage.setItem("currentTableId", id);
            try {
                let data = await joinTable(id, username, token);
                localStorage.setItem("ownerPlayerId", data.ownerPlayerId);
                localStorage.removeItem("tables");
                window.location.href = "game.html";
            }
            catch (error) {
                if (error.message != '') {
                    errorMessage("Kan niet joinen bij tafel");
                    console.log(error);
                }
                return;
            }
        });
    }
}


window.onload = function() {
    handleLoad();
}