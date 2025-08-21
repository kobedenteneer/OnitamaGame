'use strict';

function handleClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    window.location.href = "index.html";
}

 function handleLoad() {
    let username = localStorage.getItem("username");
    document.getElementsByClassName("username")[0].innerHTML = username;
    let logout = document.getElementsByClassName("logout")[0];
    let gamepage = document.getElementsByClassName("gamepage")[0];
    if (localStorage.getItem("username") != null) {
        logout.addEventListener("click", handleClick);
        gamepage.addEventListener("click", function() {
            window.location.href = "lobby.html";
        });
    }
    else {
        logout.innerHTML = "Login";
        gamepage.addEventListener("click", function() {
            window.location.href = "index.html";
        });
    }
}


window.onload = function() {
    handleLoad();
}