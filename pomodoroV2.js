$(document).ready(function() {
  // -------------------------------------------------------------------------
// var hideMenu=true;
// $('#menu').hide();

// $('#two').click(function(){    
//     if(hideMenu==true){
//     $('#menu').show();hideMenu=false;}
//     else{$('#menu').hide(); hideMenu=true;}
// })

$("#two").click(function(){
    $("#menu").toggle("slow");
})



// ----------------------------------------------------------------------------
  var audio = document.createElement('audio');
  audio.setAttribute('src', 'http://res.cloudinary.com/lin84/video/upload/v1454790830/202917_sean-townsend_tawny-owl-male_mp3cut.net_msluws.mp3');


// ----------------------------------------------------------------------------
var sessionT=1500;
var breakT=300;
var t=sessionT;
var pause=true;
var breakTime=false;
var startTicking;
var stopTicking;
// var clock=document.getElementById("clockdiv");
var clockS=document.getElementById("clockdivSec");
var clockM=document.getElementById("clockdivMin");


var session=document.getElementById("sessionLength");
var breakClock=document.getElementById('breakLength');
var run=document.getElementById('inbelly');
run.innerHTML='SESSION';
session.innerHTML=('0'+sessionT/60).slice(-2);
breakClock.innerHTML=('0'+breakT/60).slice(-2);

// clock.innerHTML=('0'+Math.floor(t/   60)).slice(-2)+":"+('0'+t%60).slice(-2);
clockM.innerHTML=('0'+Math.floor(t/60)).slice(-2);
clockS.innerHTML=('0'+t%60).slice(-2);

function countdown (){   
    if(t=>0){
        t-=1;
        clockM.innerHTML=('0'+Math.floor(t/60)).slice(-2);
		clockS.innerHTML=('0'+t%60).slice(-2);

    }
    if (t<0 && breakTime==false){
        console.log("break");
        t=breakT; 
        t-=1;
		clockM.innerHTML=('0'+Math.floor(t/60)).slice(-2);
		clockS.innerHTML=('0'+t%60).slice(-2);
        breakTime=true;
        run.innerHTML='BREAK';
        audio.play();

    }
    else if (t<0 && breakTime==true){
        t=sessionT;
        t-=1;
		clockM.innerHTML=('0'+Math.floor(t/60)).slice(-2);
		clockS.innerHTML=('0'+t%60).slice(-2);
        breakTime=false;
        run.innerHTML='SESSION';
        audio.play();

    }
}
$('#owl').click(function(){
    if(pause==true){startCount();}
    else{stopCount();}    
})


function startCount(){
    startTicking=setInterval(countdown,1000);
    startTicking;
    pause=false;
    }

function stopCount(){
    stopTicking=clearInterval(startTicking);
    stopTicking;
    pause=true;
}



$("#sessionMinus").click(function(){
    if(t>60){
        sessionT-=60;
        t=sessionT;
        run.innerHTML='SESSION';
    } else{        
        sessionT=60;
        t=sessionT;
        run.innerHTML='SESSION';}
})

$("#sessionPlus").click(function(){    
        sessionT+=60;
        t=sessionT;
        run.innerHTML='SESSION';
})

$("#breakMinus").click(function(){
    if(t>60){
        breakT-=60;
        t=breakT;
        breakTime=true;
        run.innerHTML='BREAK';
    } else{
        breakT=60;
        t=breakT;
        breakTime=true;
        run.innerHTML='BREAK';
    }
})

$("#breakPlus").click(function(){    
        breakT+=60;
        t=breakT;
        breakTime=true;
        run.innerHTML='BREAK';
})

$('button').click(function(){
    session.innerHTML=('0'+sessionT/60).slice(-2);
    breakClock.innerHTML=('0'+breakT/60).slice(-2);
    clockM.innerHTML=('0'+Math.floor(t/60)).slice(-2);
	clockS.innerHTML=('0'+t%60).slice(-2);
    stopCount();
})
// -------------------------------------------------------------------
});
