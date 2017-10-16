// MIT
// Fast Micro project 4Fun
// https://github.com/Cross77/AutolikeBadoo/new/master

var BOT = -1; // do not touch
const MAX_MSG = 60; // max messages in the box ( count )
const LIKE_SPEED = 50; // pause between like ( miliseconds )
const PAUSE_TIME = 1; // time of pause in Anti-BotBlocker ( seconds )
const PAUSE_EACH_TIME = 30; // Anti-BotBlocker, for each time pause ( seconds )
const START_DATE = new Date().getTime(); // do not touch
if(typeof localStorage.bot_counter == 'undefined'){
    localStorage.bot_counter = 0;
}
if(typeof localStorage.bot_counter_speed_record == 'undefined'){
    localStorage.bot_counter_speed_record = 0;
}
const START_COUNTER = Number(localStorage.bot_counter);
function initPanel(){
	var elemDiv = document.createElement('div');
    elemDiv.style.cssText = `
        position: absolute;
        width: 600px;
        height: 60px;
        opacity: 1;
        z-index: 100;
        background: rgb(51, 51, 51);
        font-family: Roboto;
        font-weight: 200;
        display: flex;
        align-items: center;
        color: #fff;
        justify-content: center;
        bottom: 0;
        left: calc(50% - 300px);
        font-size: 3rem;
        border: 1px solid #555;
        border-bottom: none;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    `;
    elemDiv.setAttribute("id", "bot-panel");
	document.body.appendChild(elemDiv);
	var elemDiv2 = document.createElement('div');
    elemDiv2.style.cssText = `
        position: absolute;
        width: 300px;
        height: 60px;
        opacity: 1;
        z-index: 100;
        background: #f44336;
        font-family: Roboto;
        font-weight: 200;
        display: flex;
        align-items: center;
        color: #fff;
        justify-content: center;
        bottom: 0;
        left: 0;
        font-size: 2.7rem;
    `;
    elemDiv2.setAttribute("id", "bot-speed-panel");
	document.body.appendChild(elemDiv2);
	var elemDiv3 = document.createElement('div');
    elemDiv3.style.cssText = `
        position: absolute;
        width: 400px;
        height: 60px;
        opacity: 1;
        z-index: 100;
        background: rgb(76, 175, 80);
        font-family: Roboto;
        font-weight: 200;
        display: flex;
        align-items: center;
        color: rgb(255, 255, 255);
        justify-content: center;
        bottom: 0px;
        right: 0px;
        font-size: 2rem;
    `;
    elemDiv3.setAttribute("id", "bot-best-speed-panel");
    var r = localStorage.bot_counter_speed_record;
    elemDiv3.innerHTML = `RECORD: ${r} like / s`;
	document.body.appendChild(elemDiv3);
	var elemDiv4 = document.createElement('div');
    elemDiv4.style.cssText = `
        position: absolute;
        width: 200px;
        height: 60px;
        opacity: 1;
        z-index: 100;
        background: #fff;
        font-family: Roboto;
        font-weight: 300;
        display: flex;
        align-items: center;
        color: #fff;
        justify-content: center;
        top: 0;
        right: 0;
        font-size: 1rem;
        border: 1px solid #aaa;
        border-right: none;
        border-top: none;
        border-bottom-left-radius: 5px;
    `;
    elemDiv4.innerHTML = '<a href="https://github.com/Cross77/AutolikeBadoo">Open on github</a>';
	document.body.appendChild(elemDiv4);
} initPanel();
function setCounterText(count){
    document.getElementById('bot-panel').innerHTML = count;
    var time = (new Date().getTime() - START_DATE);
    var speed = ( time / (count - START_COUNTER) ).toFixed(2);
    document.getElementById('bot-speed-panel').innerHTML = speed + ' like / s';
    if( Number(localStorage.bot_counter_speed_record) < speed){
        localStorage.bot_counter_speed_record = speed;
        document.getElementById('bot-best-speed-panel').innerHTML = 'RECORD: ' + speed + ' like / s';
    }
}
function BOT_STOP(){ clearInterval(BOT); }
function BOT_START(){
	BOT = setInterval(function(){
		document.querySelector(".b-link.js-profile-header-vote").click();
		if(Number(document.getElementById('mb').innerHTML) > MAX_MSG){
			alert('STOPPED: > ' +MAX_MSG+ ', run BOT_START() to continue');
			BOT_STOP();
        }
        localStorage.bot_counter = Number(localStorage.bot_counter) + 1;
        setCounterText(Number(localStorage.bot_counter));
	}, LIKE_SPEED);
}
setInterval(function(){
	BOT_STOP();
	setTimeout(function(){
		BOT_START();
	},PAUSE_TIME * 1000);
}, PAUSE_EACH_TIME  * 1000);
BOT_START();
