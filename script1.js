var vid, playbtn, seekslider, curtimetext, durtimetext, mutebtn, volumeslider, rwdBtn, fwdBtn,fullscreenbtn;
function intializePlayer(){

	// Set object references
	vid = document.getElementById("my_video");
	playbtn = document.getElementById("playpausebtn");
	seekslider = document.getElementById("seekslider");
	curtimetext = document.getElementById("curtimetext");
	durtimetext = document.getElementById("durtimetext");
	mutebtn = document.getElementById("mutebtn");
	volumeslider = document.getElementById("volumeslider");
	fullscreenbtn = document.getElementById("fullscreenbtn");
	rwdBtn = document.querySelector(".rwd");
	fwdBtn = document.querySelector(".fwd");
	
	// Add event listeners
	playbtn.addEventListener("click",playPause,false);
	seekslider.addEventListener("change",vidSeek,false);
	vid.addEventListener("timeupdate",seektimeupdate,false);
	mutebtn.addEventListener("click",vidmute,false);
	volumeslider.addEventListener("change",setvolume,false);
	rwdBtn.addEventListener("click",rwdbtn1, false);
	fwdBtn.addEventListener("click",fwdbtn1, false);
	fullscreenbtn.addEventListener("click",togglefullscreen,false);
}

window.onload = intializePlayer;
function playPause(){
	if(vid.paused){
		vid.play();
		playpausebtn.firstChild.classList.remove('fa-play');
		playpausebtn.firstChild.classList.add('fa-pause');	
	} else {
		vid.pause();
		playpausebtn.firstChild.classList.remove('fa-pause');
		playpausebtn.firstChild.classList.add('fa-play');
		
	}
}

   function rwdbtn1() {
	vid.currentTime -= 3;
  };
  
  function fwdbtn1() {
	vid.currentTime += 3;
	if(vid.currentTime >= vid.duration || vid.paused) {
	  vid.pause();
	  vid.currentTime = 0;
	}
  };
function vidSeek(){
	var seekto = vid.duration * (seekslider.value / 100);
	vid.currentTime = seekto;
}
function seektimeupdate(){
	var nt = vid.currentTime * (100 / vid.duration);
	seekslider.value = nt;
	var curmins = Math.floor(vid.currentTime / 60);
	var cursecs = Math.floor(vid.currentTime - curmins * 60);
	var durmins = Math.floor(vid.duration / 60);
	var dursecs = Math.floor(vid.duration - durmins * 60);
	if(cursecs < 10){ cursecs = "0"+cursecs; }
	if(dursecs < 10){ dursecs = "0"+dursecs; }
	if(curmins < 10){ curmins = "0"+curmins; }
	if(durmins < 10){ durmins = "0"+durmins; }
	curtimetext.innerHTML = curmins+":"+cursecs;
	durtimetext.innerHTML = durmins+":"+dursecs;
}
function vidmute(){
	if(vid.muted){
		vid.muted = false;
		mutebtn.firstChild.classList.remove = ('fa-volume-up');
		mutebtn.firstChild.classList.add = ('fa-volume-mute');
	} else {
		vid.muted = true;
		mutebtn.firstChild.classList.remove = ('fa-volume-mute');
		mutebtn.firstChild.classList.add = ('fa-volume-up');
	}
}
function setvolume(){
	vid.volume = volumeslider.value / 100;
}

function togglefullscreen(){
	if(vid.requestFullScreen){
		vid.requestFullScreen();
	} else if(vid.webkitRequestFullScreen){
		vid.webkitRequestFullScreen();
	} else if(vid.mozRequestFullScreen){
		vid.mozRequestFullScreen();
	}
}
