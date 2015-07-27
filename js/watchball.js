//TODO

/********************************************************
 * Stuff marked with RLLY? means that is a bit          *
 * ill thought and I should really really rewrite it.   *
 ********************************************************/


/*Some variables */
var clock = new Date(); //?

/* HTML elements */
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');
var hundseconds = document.getElementById('hundseconds');

var htmlscore1 = document.getElementById('score1');
var htmlscore2 = document.getElementById('score2');
var start_btn = document.getElementById('start');

/* Game variables */
running = true;
var totalHundSeconds = 0;
var dispHundSeconds = 0;
var player1 = true;
var state = 'normal';

var score1 = 0; 
var score2 = 0;

setInterval(setTime, 10);

function setTime() {
    
    ++totalHundSeconds;
    dispHundSeconds = (totalHundSeconds % 100);
    dispSeconds = parseInt(totalHundSeconds / 100);
    
    if(dispSeconds == 60)
        dispSeconds = 0;
    if(dispSeconds < 10)
        dispSeconds = ('0' + dispSeconds);

    if(dispHundSeconds == 100)
        dispHundSeconds = 0;
    if(dispHundSeconds < 10)
        dispHundSeconds = ('0' + dispHundSeconds);
    
    hundseconds.innerHTML = dispHundSeconds;
    seconds.innerHTML = dispSeconds;
    minutes.innerHTML = parseInt(totalHundSeconds / 100 / 60);
}

function start() {
    clock = setInterval(setTime, 10);
    running = true;
}

function stop() {
    checkTimer();
    clearInterval(clock);
    running = false;
}

function checkTimer() {
    //RLLY?
    if(player1) {
        player1 = false;
        htmlscore1.style.color = '#000';
        htmlscore2.style.color = '#1400FF';        
    } else {
        player1 = true;
        htmlscore1.style.color = '#FF0000';
        htmlscore2.style.color = '#000';
    }
    
    if(state == 'normal') {
        if(dispHundSeconds == 99) {
            if(player) {
                score1++;
                        
            } else {
                score2++;
                htmlscore2.innerHTML = score2;
            }
        }
        if(dispHundSeconds == 98 || dispHundSeconds == 1) {
            alert('penalty');
            state = 'penalty';
        }
    } else if(state = 'penalty') {
        
    }
}


/* Key Listeners */
window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;

    if (key == 32) {
        if(running)
            stop();
        else
            start();
    }
}

window.onclick = function(e) {
    if(running)
        stop();
    else
        start();
}