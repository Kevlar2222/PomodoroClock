function beginCountdown (currentSessionTime) {
    if(time == 0){
        time = currentSessionTime * 60;
    }
    run = setInterval(reduceTime, 1000);
}



function breakDecrement () {
    document.getElementById("breakTime").innerHTML = Number(document.getElementById("breakTime").innerHTML) - 1;
    if(document.getElementById("breakTime").innerHTML == 0){
        document.getElementById("breakTime").innerHTML = 10;
    }
}

function breakIncrement () {
    document.getElementById("breakTime").innerHTML = Number(document.getElementById("breakTime").innerHTML) + 1;
    if(document.getElementById("breakTime").innerHTML == 11){
        document.getElementById("breakTime").innerHTML = 1;
    }
}

function reduceTime () {
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    if(minutes == 0){
        document.documentElement.style.setProperty("--timeColor", "yellow");  
    }
    if(seconds < 10){
        document.getElementById("time").innerHTML = minutes + ":0" + seconds;
    }
    if(seconds >= 10){
        document.getElementById("time").innerHTML = minutes + ":" + seconds;
    }
    time -= 1;
    if(time == -1){
        clearInterval(run);
        time = 0;
        fork = fork * -1;
        if(fork == 1){
            document.getElementById("timer").innerHTML = "Break";
            beginCountdown(document.getElementById("breakTime").innerHTML);
            document.documentElement.style.setProperty("--timeColor", "green");
        }
        else{
            document.getElementById("timer").innerHTML = "Session";
            beginCountdown(document.getElementById("sessionTime").innerHTML);
            document.documentElement.style.setProperty("--timeColor", "green");
        }
        
    }
}

function pressedReset () {
    clearInterval(run);
    document.documentElement.style.setProperty("--timeColor", "white");
    document.getElementById("sessionTime").innerHTML = 25;
    document.getElementById("breakTime").innerHTML = 5;
    document.getElementById("time").innerHTML = document.getElementById("sessionTime").innerHTML + ":00";
    time = 0;
    document.getElementById("timer").innerHTML = "Session";
    sessionDecrease.addEventListener("click", sessionDecrement);
    sessionIncrease.addEventListener("click", sessionIncrement);
    breakDecrease.addEventListener("click", breakDecrement);
    breakIncrease.addEventListener("click", breakIncrement);
    playButton.addEventListener("click", pressedPlay); 
}

function pressedPause () {
    document.documentElement.style.setProperty("--timeColor", "white");
    clearInterval(run);
    playButton.addEventListener("click", pressedPlay);
}

function pressedPlay () {
    sessionDecrease.removeEventListener("click", sessionDecrement);
    sessionIncrease.removeEventListener("click", sessionIncrement);
    breakDecrease.removeEventListener("click", breakDecrement);
    breakIncrease.removeEventListener("click", breakIncrement);
    document.documentElement.style.setProperty("--timeColor", "green");
    playButton.removeEventListener("click", pressedPlay);
    beginCountdown(document.getElementById("sessionTime").innerHTML);
}

function pressedStop () {
    clearInterval(run);
    time = 0;
    document.getElementById("timer").innerHTML = "Session";
    document.getElementById("time").innerHTML = document.getElementById("sessionTime").innerHTML + ":00";
    document.documentElement.style.setProperty("--timeColor", "white");
    sessionDecrease.addEventListener("click", sessionDecrement);
    sessionIncrease.addEventListener("click", sessionIncrement);
    breakDecrease.addEventListener("click", breakDecrement);
    breakIncrease.addEventListener("click", breakIncrement);
    playButton.addEventListener("click", pressedPlay); 
}

function sessionDecrement () {
    document.getElementById("sessionTime").innerHTML -= 1;
    document.getElementById("time").innerHTML = document.getElementById("sessionTime").innerHTML + ":00";
    if(document.getElementById("sessionTime").innerHTML == 0){
        document.getElementById("sessionTime").innerHTML = 60;
        document.getElementById("time").innerHTML = document.getElementById("sessionTime").innerHTML + ":00";
    }
}

function sessionIncrement () {
    document.getElementById("sessionTime").innerHTML = Number(document.getElementById("sessionTime").innerHTML) + 1;
    document.getElementById("time").innerHTML = document.getElementById("sessionTime").innerHTML + ":00";
    if(document.getElementById("sessionTime").innerHTML == 61){
        document.getElementById("sessionTime").innerHTML = 1;
        document.getElementById("time").innerHTML = document.getElementById("sessionTime").innerHTML + ":00";
    }
}

const sessionDecrease = document.getElementById("sessionDecrement");
sessionDecrease.addEventListener("click", sessionDecrement);

const sessionIncrease = document.getElementById("sessionIncrement");
sessionIncrease.addEventListener("click", sessionIncrement);

const breakDecrease = document.getElementById("breakDecrement");
breakDecrease.addEventListener("click", breakDecrement);

const breakIncrease = document.getElementById("breakIncrement");
breakIncrease.addEventListener("click", breakIncrement);

const playButton = document.getElementById("playButton");
playButton.addEventListener("click", pressedPlay);

const pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", pressedPause);

const stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", pressedStop);

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", pressedReset);

let time = 0;
let run;
let fork = -1;