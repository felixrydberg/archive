const body = document.querySelector("body"),
rpsName = document.querySelector(".rps-nameinput"),
rpsUserDisplay = document.querySelector(".rps-displayusername"),
rpsComputerDisplay = document.querySelector(".rps-displaycomputer"),
rpsComputerMove = document.querySelector(".rps-computermove"),
rpsResultDisplay = document.querySelector(".rps-results p"),
rpsWinner = document.querySelector(".rps-results h1"),
rpsPlayer = document.querySelector(".rps-player"),
rpsResult = document.querySelector(".rps-results"),
rpsRock = document.querySelector(".rps-rock"),
rpsPaper = document.querySelector(".rps-paper"),
rpsScissors = document.querySelector(".rps-scissors"),
rpsReplay = document.querySelector(".rps-results button");
let gameBool = false;

let userScore,
computerScore,
tiedScore;

rpsName.addEventListener("click", startgame);
rpsRock.addEventListener("click", function(){
    game("rock")
});
rpsPaper.addEventListener("click", function(){
    game("paper")
});
rpsScissors.addEventListener("click", function(){
    game("scissors")
});
rpsReplay.addEventListener("click", function(){
    console.log("restart");
    startgame();
    rpsResultDisplay.innerHTML=`You: ${userScore} Computer: ${computerScore} Tied: ${tiedScore}`;
    rpsWinner.innerHTML="Results:";
    rpsComputerMove.innerHTML="Computer choose:";
});

// Opacity 1 på Result och "Spelaren"
function startgame() {
    username = document.querySelector(".rps-name").value;
    if(username===""){
        alert("Please enter a name!");
    }
    else{
        gameBool = true;
        userScore = 0,
        computerScore = 0,
        tiedScore = 0;
        rpsUserDisplay.innerHTML=`Welcome ${username}`;
        rpsPlayer.style.transition="0.5s";
        rpsPlayer.style.opacity=1;
        rpsResult.style.transition="0.5s";
        rpsResult.style.opacity=1;
        rpsReplay.style.transition="0.5s"
        rpsReplay.style.opacity=0;
    }
}

// Skapar datorns val och räknar vem som vunnit, skickar resultat till result()
function game(input){
    if(gameBool){
        let computer = Math.floor(Math.random() * 3);
        console.log(computer);
        if(input==="rock"){
            if(computer===0){
                display("tie");
                rpsComputerMove.innerHTML="Computer choose: 👊";
            }
            else if(computer===1){
                display("computer");
                rpsComputerMove.innerHTML="Computer choose: ✋";
            }
            else if(computer===2){
                display("user");
                rpsComputerMove.innerHTML="Computer choose: ✌";
            }
            else{
                console.log("User=Rock computer failed")
            }
        }
        else if(input==="paper"){
            if(computer===0){
                display("user");
                rpsComputerMove.innerHTML="Computer choose: 👊";
            }
            else if(computer===1){
                display("tie");
                rpsComputerMove.innerHTML="Computer choose: ✋";
            }
            else if(computer===2){
                display("computer");
                rpsComputerMove.innerHTML="Computer choose: ✌";
            }
            else{
                console.log("User=paper computer failed")
            }
        }
        else if(input==="scissors"){
            if(computer===0){
                display("computer");
                rpsComputerMove.innerHTML="Computer choose: 👊";
            }
            else if(computer===1){
                display("user");
                rpsComputerMove.innerHTML="Computer choose: ✋";
            }
            else if(computer===2){
                display("tie");
                rpsComputerMove.innerHTML="Computer choose: ✌";
            }
            else{
                console.log("User=scissors computer failed")
            }
        }
        else{
            console.log("user failed")
        }
    }
    else{
        alert("Game is not started!")
    }
    
}

// Display och räknar om någon vunnit
function display(winner) {
    console.log(winner)

    if(winner==="user"){
        userScore++;
    }
    else if(winner==="computer"){
        computerScore++;
    }
    else if(winner==="tie"){
        tiedScore++;
    }

    rpsResultDisplay.innerHTML=`You: ${userScore} Computer: ${computerScore} Tied: ${tiedScore}`;

    if(userScore === 3) {
        gameBool = false;
        rpsWinner.innerHTML="You WIN!";
        rpsPlayer.style.transition="0.5s";
        rpsPlayer.style.opacity=0;
        rpsReplay.style.transition="0.5s"
        rpsReplay.style.opacity=1;
    }
    else if(computerScore === 3) {
        gameBool = false;
        rpsWinner.innerHTML="You lose :(";
        rpsPlayer.style.transition="0.5s";
        rpsPlayer.style.opacity=0;
        rpsReplay.style.transition="0.5s"
        rpsReplay.style.opacity=1;
    }
}