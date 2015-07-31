/********************************************************
 * TODO:                                                *
 * - Implement fouls(?)                                 *
 * - Implement max time per turn                        *
 * - Animations                                         *
 * - Show stats in endGame                              *
 ********************************************************/

/********************************************************
 * Stuff marked with RLLY? means that is a bit          *
 * ill thought and I should really really rewrite it.   *
 *                                                      *
 * REMEMBER: Always code as if the person who ends up   *
 *  maintaining your code is a violent psychopath who   *
 *  knows where you live.                               *
 ********************************************************/

/*var options = document.getElementsByClassName('option');

for (var i = 0; i < options.length; ++i) {
    var option = options[i];  
    option.addEventListener('click', newGame(option.value), false);
}*/

/* DO YOU WANNA DEBUG BITCH? */
var debug = true;

/*Some variables */
var clock = new Date(); //?

/* HTML elements */
var minutes = document.getElementById('minutes');
var seconds = document.getElementById('seconds');
var hundseconds = document.getElementById('hundseconds');
var aux_fuck = document.getElementById('aux_fuck');

var htmlscore1 = document.getElementById('score1');
var htmlscore2 = document.getElementById('score2');
var start_btn = document.getElementById('start');

/* Game variables */
running = false;
var totalHundSeconds = 0;
var dispHundSeconds = 0;
var player1 = true;
var state = 'normal';
var max_time;

var score1 = 0; 
var score2 = 0;

/* Options menu */
var game30 = document.getElementById('game30');
var game1 = document.getElementById('game1');
var game2 = document.getElementById('game2');

game30.addEventListener('click', function() { newGame(3000) }, false);
game1.addEventListener('click', function() { newGame(6000) }, false);
game2.addEventListener('click', function() { newGame(12000) }, false);

function newGame(time) {
    max_time = time;
    
    if(debug)
        console.log(time);
    
    if(time == 3000) {
        game30.style.color = '#909090';
        game1.style.color = '#000';
        game2.style.color = '#000';
    } else if (time == 6000) {
        game30.style.color = '#000';
        game1.style.color = '#909090';
        game2.style.color = '#000';
    } else {
        game30.style.color = '#000';
        game1.style.color = '#000';
        game2.style.color = '#909090';
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

    document.getElementById('scoreboard').onclick = function() {
        if(running)
            stop();
        else
            start();
    }

    running = false;
    totalHundSeconds = 0;
    dispHundSeconds = 0;
    player1 = true;
    state = 'normal';

    score1 = 0; 
    score2 = 0;
}

function setTime() {

    ++totalHundSeconds;
    dispHundSeconds = (totalHundSeconds % 100);
    dispSeconds = parseInt(totalHundSeconds / 100);

    if(dispSeconds >= 60) //RLLY?
        dispSeconds -= 60;
    if(dispSeconds < 10)
        dispSeconds = ('0' + dispSeconds);

    if(dispHundSeconds == 100)
        dispHundSeconds = 0;
    if(dispHundSeconds < 10)
        aux_fuck.innerHTML = '0';
    else
        aux_fuck.innerHTML = '';

    hundseconds.innerHTML = dispHundSeconds;
    seconds.innerHTML = dispSeconds;
    minutes.innerHTML = parseInt(totalHundSeconds / 100 / 60);

    if(totalHundSeconds >= max_time)
        endGame();
}

function start() {
    clock = setInterval(setTime, 10);
    running = true;
}

function stop() {
    clearInterval(clock);
    checkTimer();
    running = false;
}

function checkTimer() {
    if(debug)
        console.log(dispHundSeconds + ' - ' + totalHundSeconds);
    
    if(state == 'normal') {
        if(dispHundSeconds == 0) {
            if(player1) {
                score1++;
                htmlscore1.innerHTML = score1;      
            } else {
                score2++;
                htmlscore2.innerHTML = score2;
            }
        }
        if(dispHundSeconds == 99 || dispHundSeconds == 1) {
            alert('penalty');
            state = 'penalty';
        }
    } else if(state = 'penalty') {
        if(dispHundSeconds % 2 == 0) {
            if(player1) {
                score1++;
                htmlscore1.innerHTML = score1;      
            } else {
                score2++;
                htmlscore2.innerHTML = score2;
            }
        } else {
            alert('You fat fuck, how could you miss?');
        }
        state = 'normal';
    } else if(state = 'foul') {

    }

    //RLLY?
    if(state == 'normal') {
        if(player1) {
            player1 = false;
            htmlscore1.style.color = '#000';
            htmlscore2.style.color = '#1400FF';        
        } else {
            player1 = true;
            htmlscore1.style.color = '#FF0000';
            htmlscore2.style.color = '#000';
        }
    }
}

function endGame() {
    clearInterval(clock);
    alert('STOP!');
}