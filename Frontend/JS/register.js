'use strict';

const API_URL = "https://onitama-12a225e535b0.herokuapp.com/api"
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0 // De node fetch API accepteert geen ongeldige SSL certificaten. Deze lijn code zorgt ervoor dat dit wel geaccepteerd wordt.

function validateUsername(username) {
    if (username.length < 5) {
        throw new Error("Gebruikersnaam is te kort.");
    }
    else if (username.length > 20) {
        throw new Error("Gebruikersnaam is te lang.");
    }
    return true;
}

function validateEmail(email) {
    if (email.length < 3) {
        throw new Error("Email is te kort.");
    }
    return true;
}

function validatePassword(password) {
    if (password.length < 5) {
        throw new Error("Wachtwoord is te kort.");
    }
    return true;
}

function validatePasswordRepeat(password, repeatedPassword) {
    if (password !== repeatedPassword) {
        throw new Error("Wachtwoorden komen niet overeen.");
    }
    return true;
}

async function registerPost(username, email, password){
    let url = `${API_URL}/Authentication/register`;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            wariorName: username,
            username: username,
            email: email,
            password: password
        }),
    };

    let response = await fetch(url, options);
    if (!response.ok) {
        let data = await response.text();
        if (data) {
            let jsonData = JSON.parse(data);
            errorMessage(jsonData.message);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

window.onload = function() {
    async function handleClick() {
        let username = document.getElementById("username").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let repeatedPassword = document.getElementById("passwordrepeat").value;

        try {
            validateUsername(username);
            validateEmail(email);
            validatePassword(password);
            validatePasswordRepeat(password, repeatedPassword);

        } catch (error) {
            errorMessage(error)
            return;
        }
        try {
            await registerPost(username, email, password);
            localStorage.setItem("email", email);
            localStorage.setItem("register", "true");
            window.location.href = "index.html";
        } catch (error) {
            return;
        }
    }

    function handleLoad() {
        console.log('We here');
        let knop = document.getElementById('registerButton');
        knop.addEventListener("click", handleClick);

        let inputFields = document.querySelectorAll('input');
        inputFields.forEach(function(input) {
            input.addEventListener('keydown', function(event) {
                if (event.keyCode === 13) {
                    event.preventDefault();
                    handleClick();
                }
            });
        });
    }

    handleLoad();
}