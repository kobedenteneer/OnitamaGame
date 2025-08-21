'use strict';
let init = false;
let intervalId = null;
const pawnHtml = `<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 6.5C9.5 5.11929 10.6193 4 12 4C13.3807 4 14.5 5.11929 14.5 6.5C14.5 7.88071 13.3807 9 12 9C10.6193 9 9.5 7.88071 9.5 6.5ZM12 2C9.51472 2 7.5 4.01472 7.5 6.5C7.5 7.91363 8.15183 9.17502 9.17133 10H8C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12H9.12533C9.15208 12.3659 9.16098 12.833 9.11237 13.3535C8.99568 14.6027 8.55656 16.0909 7.31094 17.2753C6.86615 17.6982 6.19221 18.1531 5.58717 18.5199C5.29266 18.6984 5.02896 18.8475 4.83934 18.9517C4.74472 19.0037 4.66905 19.0442 4.61781 19.0713L4.56008 19.1017L4.54633 19.1088L4.54347 19.1103L4.54336 19.1103L4.54322 19.1104C4.3106 19.2299 4.13401 19.4357 4.05132 19.6838L3.27924 22H3C2.44772 22 2 22.4477 2 23C2 23.5523 2.44772 24 3 24H4H20H21C21.5523 24 22 23.5523 22 23C22 22.4477 21.5523 22 21 22H20.7659L20.1559 19.7395C20.0787 19.4533 19.8784 19.2161 19.6092 19.0919L19.609 19.0918L19.6072 19.091L19.5951 19.0853C19.5836 19.0799 19.5655 19.0714 19.5415 19.0598C19.4933 19.0366 19.4214 19.0014 19.3304 18.9553C19.1482 18.8629 18.8918 18.7279 18.5996 18.5595C18.0041 18.2164 17.3055 17.7605 16.7767 17.2682C15.5139 16.0923 15.054 14.6022 14.92 13.349C14.8647 12.8316 14.8667 12.3662 14.8878 12H16C16.5523 12 17 11.5523 17 11C17 10.4477 16.5523 10 16 10H14.8287C15.8482 9.17502 16.5 7.91363 16.5 6.5C16.5 4.01472 14.4853 2 12 2ZM11.1037 13.5395C11.158 12.9576 11.1549 12.4315 11.1296 12H12.8852C12.8649 12.4363 12.8682 12.9705 12.9313 13.5616C13.0971 15.112 13.6847 17.1218 15.4138 18.7319C15.512 18.8233 15.6134 18.9128 15.717 19L8.38107 19C8.48825 18.9094 8.59149 18.8175 8.68906 18.7247C10.3982 17.0996 10.9591 15.0879 11.1037 13.5395ZM5.72076 21L18.4246 21L18.6944 22H5.38743L5.72076 21Z" fill="#000000"/>
</svg>`;
const masterHtml = `<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C12.5523 0 13 0.447715 13 1V2H14C14.5523 2 15 2.44772 15 3C15 3.55228 14.5523 4 14 4H13L13 6.13426C14.1873 6.46304 15.1164 7.36761 15.6095 8.53557C16.7887 7.70672 18.0146 7.33092 19.1893 7.38765C20.8173 7.46629 22.1801 8.37142 22.9824 9.70379C24.5267 12.2682 23.9536 16.1461 20.2565 19.277L21.1708 21.1056C21.8357 22.4354 20.8688 24 19.382 24H4.61805C3.13129 24 2.1643 22.4354 2.82919 21.1056L3.74347 19.277C0.0464058 16.1461 -0.526611 12.2682 1.01767 9.70378C1.82002 8.37141 3.18278 7.46628 4.8108 7.38766C5.9855 7.33093 7.21132 7.70675 8.3906 8.5356C8.88363 7.36763 9.81271 6.46305 11 6.13427L11 4H10C9.44771 4 9 3.55228 9 3C9 2.44772 9.44771 2 10 2H11V1C11 0.447715 11.4477 0 12 0ZM8.01285 10.8098C6.84088 9.69153 5.74956 9.34466 4.90727 9.38533C4.0034 9.42898 3.2202 9.92317 2.73099 10.7355C1.80208 12.2781 1.87787 15.2648 5.34014 18H10.4437C10.1872 17.422 9.88055 16.7115 9.57338 15.9543C9.19326 15.0173 8.80704 13.9956 8.51427 13.0583C8.27053 12.2779 8.06505 11.476 8.01285 10.8098ZM13.5564 18H18.6599C22.1222 15.2648 22.198 12.2781 21.2691 10.7355C20.7799 9.92318 19.9967 9.42898 19.0928 9.38533C18.2505 9.34464 17.1592 9.6915 15.9872 10.8097C15.935 11.4759 15.7296 12.2779 15.4858 13.0583C15.193 13.9956 14.8068 15.0173 14.4267 15.9543C14.1195 16.7115 13.8129 17.422 13.5564 18ZM18.382 20H12H5.61804L4.61805 22H19.382L18.382 20ZM12 16.5687C12.1822 16.1478 12.3779 15.6844 12.5734 15.2025C12.9433 14.2907 13.307 13.3255 13.5768 12.462C13.8564 11.5668 14 10.8867 14 10.5C14 10.4699 13.9996 10.4401 13.9989 10.4105C13.959 8.87922 12.9603 8 12 8C11.0398 8 10.0411 8.87924 10.0012 10.4105C10.0004 10.4401 10 10.47 10 10.5C10 10.8867 10.1437 11.5668 10.4233 12.462C10.693 13.3255 11.0568 14.2907 11.4267 15.2025C11.6222 15.6844 11.8179 16.1478 12 16.5687Z" fill="#000000"/>
</svg>`;
const emptyHtml = `<td></td>`;

const API_URL = "https://onitama-12a225e535b0.herokuapp.com/api"

let turnData = {
    turn: null,
    chosenCard: null,
    chosenPiece: null,
    chosenMove: null
}

let playerData = {
    direction: null,
    color: null
}

let gameEnded = false;

async function waitForTurn(gameId){
    let data = await getGame(gameId);
    let userId = localStorage.getItem("id");
    if (data.playerToPlayId == userId) {
        clearInterval(intervalId);
        updateGame(gameId);
    }
}

function clearPossibleMoves(data){
    console.log(("clearing possible moves"));
    console.log(data);
    for (let i = 0; i < data.playMat.grid.length; i++) {
        for (let j = 0; j < data.playMat.grid[i].length; j++) {
            let cell = document.getElementsByClassName("board")[0].querySelectorAll("tr")[i].querySelectorAll("td")[j];
            cell.style.backgroundColor = "white";
        }
    }
}

function refreshGrid(data) {
    let grid = data.playMat.grid;
    let userId = localStorage.getItem("id");
    let player = data.players.find(player => player.id === userId);
    let opponent = data.players.find(player => player.id !== userId);
    if (playerData.direction == "North") {
        grid.reverse();
    }
    let board = document.getElementsByClassName("board")[0];
    board.innerHTML = "";
    for (let i = 0; i < grid.length; i++) {
        let row = document.createElement("tr");
        if (playerData.direction == "South") {
            grid[i].reverse();
        }
        for (let j = 0; j < grid[i].length; j++) {
            let piece = document.createElement("td");
            if (grid[i][j]) {
                let color = (grid[i][j].OwnerId === userId) ? playerData.color : opponent.color;
                let html = (grid[i][j].Type === 1) ? pawnHtml : masterHtml;
                piece.innerHTML = html;
                piece.firstElementChild.firstElementChild.style.fill = color;
                if (!gameEnded){
                    if (grid[i][j].OwnerId === userId && turnData.turn == "client"){
                        piece.style.cursor = "pointer";
                        piece.addEventListener("click", async function () {
                            let playPiece = grid[i][j];
                            if (turnData.chosenCard) {
                            turnData.chosenPiece = playPiece;
                            await getPossibleMoves(data);
                            }
                        }
                        );
                    } else {
                        piece.removeEventListener(
                        "click",
                        async function () {}
                        );
                        piece.style.cursor = "default";
                    }
                }
            } else {
                piece.innerHTML = emptyHtml;
            }
            row.appendChild(piece);
        }
        board.appendChild(row);
    }
    clearPossibleMoves(data);
}

async function movePiece(gameId, move) {
    let token = localStorage.getItem("token");
    let url = `${API_URL}/Games/${gameId}/move-pawn`;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(move)
    };
    let response = await fetch(url, options);
    if (response.ok) {
        turnData.chosenMove = null;
        turnData.chosenPiece = null;
        turnData.chosenCard[1].style.border = "none";
        turnData.chosenCard = null;
        await updateGame(gameId);
    }
    else {
        errorMessage("Kan het stuk niet verplaatsen");
    }
}

async function showPossibleMoves(possibleMoveData, gameData) {
    console.log(possibleMoveData);
    let boardRow = document.getElementsByClassName("board")[0].querySelectorAll("tr");
    let boardRowArray = [...boardRow];
    if (playerData.direction == "North") {
        boardRowArray.reverse();
    }
    let boardArray = boardRowArray.map(row => {
        let boardCol = row.querySelectorAll("td");
        if (playerData.direction == "South") {
            return [...boardCol].reverse();
        }
        return [...boardCol];
    });
    if (turnData.chosenMove) {
        for (let ci = 0; ci < turnData.chosenMove.length; ci++) {
            const chosenMove = turnData.chosenMove[ci].to;
            const cell = boardArray[chosenMove.row][chosenMove.column];
            cell.style.backgroundColor = "white";
            cell.removeEventListener("click", async function() {});
            cell.style.cursor = "default";
        }
    }
    turnData.chosenMove = possibleMoveData;
    for (let index = 0; index < possibleMoveData.length; index++) {
        const possibleMove = possibleMoveData[index].to;
        const cell = boardArray[possibleMove.row][possibleMove.column];
        cell.style.backgroundColor = "green";
        cell.style.cursor = "pointer";
        cell.removeEventListener("click", async function() {});
        cell.addEventListener("click", async function() {
            let move = {
                pawnId: possibleMoveData[index].pawn.id,
                moveCardName: possibleMoveData[index].card.name,
                to: possibleMove
            };
            turnData.chosenCard[1].className = "Card";
            this.style.backgroundColor = "white";
            await movePiece(gameData.id, move);
            this.removeEventListener("click", async function() {});
            turnData.chosenMove = null;
        });
    }
}

function showOpponentsMoves(possibleMoveData) {
    let boardRow = document.getElementsByClassName("board")[0].querySelectorAll("tr");
    let boardRowArray = [...boardRow];
    if (playerData.direction == "South") {
        boardRowArray;
    }
    let boardArray = boardRowArray.map(row => {
        let boardCol = row.querySelectorAll("td");
        if (playerData.direction == "North") {
            return [...boardCol];
        }
        return [...boardCol];
    });
    for (let index = 0; index < possibleMoveData.length; index++) {
        const possibleMove = possibleMoveData[index].to;
        const cell = boardArray[possibleMove.row][possibleMove.column];
        cell.style.backgroundColor = "red";
        cell.style.opacity = "0.5";
    }
}

async function getOpponnentMoves(gameData) {
    let gameId = gameData.id;
    let token = localStorage.getItem("token");
    let client = gameData.players[0];
    let playerId = null;
    let opponent = null;
    if (client.id !== localStorage.getItem("id")) {
        opponent = gameData.players.find(player => player.id !== localStorage.getItem("id"));
        playerId = opponent.id;
    }
    else {
        playerId = localStorage.getItem("id");
    }
    let url = `${API_URL}/Games/${gameId}/possible-moves-for-player/${playerId}`;
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    };
    let response = await fetch(url, options);
    let data = await response.json();
    if (response.ok) {
        // showOpponentsMoves(data);  
    }
    else {
        errorMessage("Kan de mogelijke zetten niet vinden");
    }
}

async function getPossibleMoves(gameData) {
    let gameId = gameData.id;
    let token = localStorage.getItem("token");
    let cardname = turnData.chosenCard[0].name;
    let url = `${API_URL}/Games/${gameId}/possible-moves-of/${turnData.chosenPiece.Id}/for-card/${cardname}`;
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    };
    let response = await fetch(url, options);
    let data = await response.json();
    if (response.ok) {
        await showPossibleMoves(data, gameData);
    }
    else {
        errorMessage("Kan de mogelijke zetten niet vinden");
    }
}

function clearCard(card){
    for (let i = 0; i < card.length; i++) {
        let HTMLRow = card[i].querySelectorAll("td");
        for (let j = 0; j < HTMLRow.length; j++) {
            if (!(i == 2 && j == 2)) {
                HTMLRow[j].style.backgroundColor = "transparent";
            }
        }
    }
    // card.getElementsByClassName("center")[0].style.backgroundColor = "white";
}

function colorCard(card, HTMLCard, userType) {
    clearCard(HTMLCard);
    let moveCard = card.grid;
    if (userType == "client") {
        moveCard = moveCard.reverse();
    }
    for (let i = 0; i < moveCard.length; i++) {
        if (userType == "opponent") {
            let cardcol = moveCard[i].reverse();
            for (let j = 0; j < cardcol.length; j++) {
                if (cardcol[j] === 1) {
                    HTMLCard[i].querySelectorAll("td")[j].style.backgroundColor = "green";
                }
            }
        }
        else{
            for (let j = 0; j < moveCard[i].length; j++) {
                if (moveCard[i][j] === 1) {
                    HTMLCard[i].querySelectorAll("td")[j].style.backgroundColor = "green";
                }
            }
        }
    }
}

function distributeCards(data) {
    let client = data.players.find(player => player.id === localStorage.getItem("id"));
    let opponent = data.players.find(player => player.id !== localStorage.getItem("id"));
    let clientHTMLCards = document.getElementsByClassName("CardContainer south")[0].getElementsByClassName("Card");
    let opponentHTMLCards = document.getElementsByClassName("CardContainer north")[0].getElementsByClassName("Card");
    console.log(data);
    let clientMoveCards = client.moveCards;
    let opponentMoveCards = opponent.moveCards;

    if (data.playerToPlayId == client.id) {
        turnData.turn = "client";
        initialExtraCard(data.extraMoveCard, "right");
    }
    else {
        turnData.turn = "opponent";
        initialExtraCard(data.extraMoveCard, "left");
    }
    
    for (let cardsIndex = 0; cardsIndex < clientHTMLCards.length; cardsIndex++) {
        if (!gameEnded) {
            if (turnData.turn == "client") {
              clientHTMLCards[cardsIndex].style.cursor = "pointer";
              clientHTMLCards[cardsIndex].className = "Card";
              clientHTMLCards[cardsIndex].addEventListener("click", async function () {
                  if (!turnData.chosenCard) {
                    turnData.chosenCard = [
                      clientMoveCards[cardsIndex],
                      clientHTMLCards[cardsIndex],
                    ];
                    this.className = "Card clicked";
                  } else if (
                    turnData.chosenCard[0] == clientMoveCards[cardsIndex]
                  ) {
                    turnData.chosenCard = null;
                    this.className = "Card";
                    this.removeAttribute("style");
                  } else {
                    turnData.chosenCard[1].className = "Card";
                    turnData.chosenCard = [
                      clientMoveCards[cardsIndex],
                      clientHTMLCards[cardsIndex],
                    ];
                    this.className = "Card clicked";
                  }
                }
              );
            } else {
              clientHTMLCards[cardsIndex].removeAttribute("style");
              clientHTMLCards[cardsIndex].removeEventListener(
                "click",
                async function () {}
              );
            }
        }
        let HTMLCard = clientHTMLCards[cardsIndex].querySelectorAll("tr");
        let card = clientMoveCards[cardsIndex];
        clientHTMLCards[cardsIndex].querySelector("span").innerHTML = `<p>${clientMoveCards[cardsIndex].name}</p>`;
        clientHTMLCards[cardsIndex].getElementsByClassName("stamp")[0].style.backgroundColor = clientMoveCards[cardsIndex].stampColor;
        colorCard(card, HTMLCard, "client");
    }
    
    for (let cardsIndex = 0; cardsIndex < opponentHTMLCards.length; cardsIndex++) {
        let HTMLCard = opponentHTMLCards[cardsIndex].querySelectorAll("tr");
        let card = opponentMoveCards[cardsIndex];
        opponentHTMLCards[cardsIndex].querySelector("span").innerHTML = `<p>${opponentMoveCards[cardsIndex].name}</p>`;
        opponentHTMLCards[cardsIndex].getElementsByClassName("stamp")[0].style.backgroundColor = opponentMoveCards[cardsIndex].stampColor;
        colorCard(card, HTMLCard, "opponent");
    }
}

function initialExtraCard(moveCard, side) {
    let userType = side == "left" ? "opponent" : "client";
    let oppositeSide = side == "left" ? "right" : "left";
    document.getElementsByClassName("extraCard " + side)[0].querySelector("span").innerHTML = `<p>${moveCard.name}</p>`;
    document.getElementsByClassName("extraCard " + side)[0].getElementsByClassName("stamp")[0].style.backgroundColor = moveCard.stampColor;
    document.getElementsByClassName("extraCard " + side)[0].style.visibility = 'visible';
    document.getElementsByClassName("extraCard " + oppositeSide)[0].style.visibility = 'hidden';
    let HTMLCard = document.getElementsByClassName("extraCard " + side)[0].querySelectorAll("tr");
    colorCard(moveCard, HTMLCard, userType);
}

async function getGame(gameId) {
    let userId = localStorage.getItem("id");
    let token = localStorage.getItem("token");
    let url = `${API_URL}/Games/${gameId}`;
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    };
    let response = await fetch(url, options);
    let data = await response.json();
    if (response.ok) {
        if (data.winnerPlayerId != "00000000-0000-0000-0000-000000000000") {
            gameEnded = true;
            if (data.winnerPlayerId == userId) {
                document.getElementsByClassName("succesBox")[0].style.display = "flex";
                let winnermethod = data.winnerMethod;
                document.getElementsByClassName("succesBox")[0].innerHTML = `Je hebt gewonnen! <br> By the ${winnermethod}`
            }
            else {
                errorMessage(`Je hebt verloren!`);
            }
            return data;
        }
        playerData.direction = data.players.find(player => player.id === userId).direction;
        playerData.color = data.players.find(player => player.id === userId).color;
        return data;
    }
    else {
        errorMessage("Kan het spel niet vinden");
    }
}

async function skipTurn(gameId){
    let token = localStorage.getItem("token");
    let url = `${API_URL}/Games/${gameId}/skip-movement`;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    };
    let response = await fetch(url, options);
    if (response.ok) {
        await updateGame(gameId);
    }
    else {
        errorMessage("Kan de beurt niet overslaan");
    }

}


async function updateGame(gameId) {
    hideErrorMessage();
    let data = await getGame(gameId);
    distributeCards(data);
    refreshGrid(data);
    let skipButton = document.getElementsByClassName("skipButton")[0];
    //await getOpponnentMoves(data);
    if (turnData.turn == "opponent") {
        skipButton.removeEventListener("click", skipTurn);
        intervalId = setInterval(async function() {await waitForTurn(data.id);}, 2000);
    }
    else {
        skipButton.addEventListener("click", skipTurn);
    }
}

async function startGameHandleClick() {
    clearInterval(intervalId);
    let token = localStorage.getItem("token");
    let currentTableId = localStorage.getItem("currentTableId");
    let url = `${API_URL}/Tables/${currentTableId}/start-game`;
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    };
    let response = await fetch(url, options);
    let data = await response.json();
    if (response.ok) {
        await updateGame(data.gameId);
        document.getElementsByClassName("startGame")[0].style.display = 'none';
    }
    else {
        errorMessage("Kan het spel niet starten");
    }
}

 async function handleLoad() {
    let username = localStorage.getItem("username");
    let owneruserid = localStorage.getItem("ownerPlayerId");
    let userid = localStorage.getItem("id");
    let currentTableId = localStorage.getItem("currentTableId");
    document.getElementsByClassName("username")[0].innerHTML = username;
    document.getElementsByClassName("logout")[0].addEventListener("click", logoutHandleClick);
    document.getElementsByClassName("startGame")[0].addEventListener("click", startGameHandleClick);
    let leaveknop = document.getElementsByClassName("leave")[0].addEventListener("click", async function() {
        let url = `${API_URL}/Tables/${currentTableId}/leave`;
        let token = localStorage.getItem("token");
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }
        let response = await fetch(url, options);
        if (response.ok) {
            localStorage.removeItem("currentTableId");
            localStorage.removeItem("ownerPlayerId");
            window.location.href = "lobby.html";
        }
        else {
            errorMessage("kan niet weggaan van tafel");
            return;
        }
    });
    document.getElementsByClassName("succesBox")[0].style.display = "none";
    hideErrorMessage();
    intervalId = setInterval(lobbyUpdater, 1000);
 }

 async function lobbyUpdater() {
    let currentTableId = localStorage.getItem("currentTableId");
    let token = localStorage.getItem("token");
    let url = `${API_URL}/Tables/${currentTableId}`;
    let options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        }
    };
    let response = await fetch(url, options);
    let data = await response.json();
    console.log(data);
    if (response.ok) {
        let numberOfPlayers = data.seatedPlayers.length;
        let owneruserid = data.ownerPlayerId;
        let userid = localStorage.getItem("id");
        document.getElementsByClassName("clientUser")[0].innerHTML = data.seatedPlayers.find(player => player.id == userid).name;
        document.getElementsByClassName("clientUser")[0].style.display = 'block';
        if (owneruserid == userid) {
            if (numberOfPlayers != 2) {
                errorMessage("Er zijn niet genoeg spelers om te starten");
                document.getElementsByClassName("oppUser")[0].style.display = 'none';
            }
            else {
                hideErrorMessage();
                document.getElementsByClassName("startGame")[0].style.display = 'flex';
                document.getElementsByClassName("oppUser")[0].innerHTML = data.seatedPlayers.find(player => player.id != userid).name;
                document.getElementsByClassName("oppUser")[0].style.display = 'block';
            }
        }
        else {
            document.getElementsByClassName("startGame")[0].style.display = 'none';
            errorMessage("Wacht tot de eigenaar van de tafel het spel start.");
            document.getElementsByClassName("oppUser")[0].innerHTML = data.seatedPlayers.find(player => player.id != userid).name;
            document.getElementsByClassName("oppUser")[0].style.display = 'block';
        }
        if (data.gameId != "00000000-0000-0000-0000-000000000000") {
            clearInterval(intervalId);
            hideErrorMessage();
            await updateGame(data.gameId);
        }
    }
    else {
        errorMessage("Kan de tafel niet vinden");
    }
}

window.onload = function() {
    handleLoad();
}

function logoutHandleClick() {
    localStorage.clear();
    window.location.href = "index.html";
}