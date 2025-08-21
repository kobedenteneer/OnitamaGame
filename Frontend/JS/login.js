'use strict';

const API_URL = "https://onitama-12a225e535b0.herokuapp.com/api"

async function loginPost(username, password) {
    let url = `${API_URL}/Authentication/token`;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    }
    let response = await fetch(url, options);
    let data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.user.warriorName);
        localStorage.setItem("id", data.user.id)
    } else {
        errorMessage(JSON.parse(data).message);
        throw new Error(`error with status ${response.status}`);
    }
}

async function handleClick() {
    let name = document.getElementById("name").value;
    let pass = document.getElementById("password").value;
    if (name != '' && pass.length > 5) {
        try {
            await loginPost(name, pass);
            window.location.href = "lobby.html";
        } catch (error) {
            if (error.message != '') {
                errorMessage("Gebruikersnaam of wachtwoord is verkeerd");
            }
            return;
        }
    } else {
        errorMessage("Gebruikersnaam of wachtwoord is verkeerd");
    }
}

function handleClick2() {
    window.location.href = "register.html";
}

function handleEnterKey(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        let name = document.getElementById("name").value;
        let pass = document.getElementById("password").value;
        if (name != '' && pass.length > 5) {
            handleClick();
        }
    }
}

window.onload = function () {
    function handleLoad() {
        let knop = document.getElementById("loginButton");
        knop.addEventListener("click", handleClick);
        let knop2 = document.getElementById("registerButton");
        knop2.addEventListener("click", handleClick2);
        let knop3 = document.getElementById("teamButton");
        knop3.addEventListener("click", function () {
            window.location.href = "team.html";
        });
        if (localStorage.getItem("register") === "true") {
            document.getElementsByClassName("succesBox")[0].style.display = "flex";
            document.getElementById("name").value = localStorage.getItem("email");
            localStorage.removeItem("email");
            localStorage.removeItem("register");
        }
    }
    handleLoad();

    let passwordInput = document.getElementById("password");
    passwordInput.addEventListener("keydown", handleEnterKey);
}