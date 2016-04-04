$(document).ready(function(){
  var rotation; var increment; var timer; var alltimers = [];
  var transform_styles = ['-webkit-transform', '-ms-transform', 'transform'];
  var gradient_styles = ['-webkit-radial-gradient', 'radial-gradient'];

  var worktime = {time: 25, state: "work", col: "rgb(122, 200, 22)"}
  var breaktime = {time: 5, state: "break", col: "rgb(4, 191, 191)"}
  var current = worktime;
  var time = current.time*60;
  var audio = document.createElement('audio');
  audio.setAttribute('src', 'ding/ding.mp3');


function setTime(){
  current.time = Math.floor(rotation/4);
  if (current.time < 1) { current.time = 1; }
  time = Math.round(current.time*60);
}
function setTimer(){
  $('.timer').html(("0" + Math.floor(time/60)).slice(-2)+':'+ ("0" + time%60).slice(-2));
}

function minusSec(){
  if (time <= 0) {
    endTimer();
  } else { 
    time-=1;
    rotation-=increment;
    fill(rotation);
    setTimer();
  }
}
function countDown(){
  if (!timer){
    timer = setInterval(minusSec, 1000);
    alltimers.push(timer);
  }
}
function ClearAllIntervals() {
  clearInterval(timer);
  timer = false;
}
function transitionToCounter(state){
  activateState(state);
  rotation = 360;
  increment = rotation/time;
  animateCircle(rotation);
  hideBall();
}
function transitionToSetting(){
  highlightState(current.state)
  rotation = 360/90 * current.time;
  TweenLite.set(ball, {rotation: rotation});
  animateCircle(rotation);
  showBall();
}
function setState(state){
  current = state;
  setColor(current.col);
  pauseTimer(); 
  transitionToSetting();
  setTime();
  setTimer();
  $('.timer').one("click", startTimer);
}
function startTimer(){
  highlightState(current.state)
  transitionToCounter(current.state)
  setTimer();
  countDown();
  $('.timer').one("click", pauseTimer);
}
function pauseTimer(){
  ClearAllIntervals();
  $('.timer').one("click", resumeTimer); 
}
function resumeTimer(){

  setTimer();
  countDown();
  $('.timer').one("click", pauseTimer); 
}
function endTimer(){
  ClearAllIntervals();
  audio.play();
  if (current === worktime){
    current = breaktime;
  } else {
    current = worktime;
  }
  time = current.time*60;
  setColor(current.col);
  transitionToCounter(current.state);
  setTimer();
  countDown();
  $(this).one("click", pauseTimer);
}
function onRotateball() {
  rotation = dragball.rotation;
  highlightState(current.state);
  fill(rotation);
  setTime();
  setTimer();
}
  

  $('.timer').one("click", startTimer);
  $('#work').click(function(){
    setState(worktime);
  })
  $('#break').click(function(){
    setState(breaktime);
  })

});