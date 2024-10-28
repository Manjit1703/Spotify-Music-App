let audioElement = new Audio('1.mp3');
let gif = document.querySelector("#gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
  {songName: "salam-e-Ishq", filePath:"1.mp3" , coverPath:"1.jpg"},
  {songName: "kobe-tumi-", filePath:"2.mp3" , coverPath:"2.jpg"},
  {songName: "sanaam-re", filePath:"3.mp3" , coverPath:"3.jpg"},
  {songName: "bhula-dena-mujhe", filePath:"4.mp3" , coverPath:"4.jpg"},
  {songName: "thoda-thoda-pyaar", filePath:"5.mp3" , coverPath:"5.jpg"},
  {songName: "i-love-you", filePath:"6.mp3" , coverPath:"6.jpg"},
  {songName: "i-hate-you", filePath:"7.mp3" , coverPath:"7.jpg"}
]
// audioElement.play();
songItems.forEach((element,i)=>{
 
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar')


masterPlay.addEventListener('click',()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    document.getElementById(songIndex).classList.remove("fa-play-circle");
   document.getElementById(songIndex).classList.add("fa-pause-circle");
   
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
  }
  else{
    audioElement.pause();
    document.getElementById(songIndex).classList.remove("fa-pause-circle");
    document.getElementById(songIndex).classList.add("fa-play-circle");
    
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity=0;
  }
 
})

audioElement.addEventListener('timeupdate',()=>{
  
  //update seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
  myProgressBar.value=progress;

})

myProgressBar.addEventListener('change',()=>{
  audioElement.currentTime=(myProgressBar.value * audioElement.duration)/100;
})

const makeAllPlay = ()=>{
  Array.from(document.getElementsByClassName("play-icon")).forEach((element)=>{
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  })
}


Array.from(document.getElementsByClassName("play-icon")).forEach((element)=>{
 element.addEventListener("click",(e)=>{
  
  makeAllPlay();
  
   let Index = parseInt(e.target.id);
   if(!audioElement.paused){
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle")
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity=0;
  }else{
    masterSongName.innerText=songs[Index-1].songName;
    e.target.classList.remove("fa-play-circle");
    e.target.classList.add("fa-pause-circle");
    audioElement.src=`${Index}.mp3`;
    audioElement.play();
    gif.style.opacity=1;
    audioElement.currentTime=0;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle")
   
  }
  songIndex=Index;
 })
})

document.getElementById("next").addEventListener("click",()=>{
  if(songIndex>6){
    songIndex=1;
  }
  else{
    songIndex = songIndex+1;
  }
  audioElement.src=`${songIndex}.mp3`;
  masterSongName.innerText=songs[songIndex].songName;
  audioElement.play();
  gif.style.opacity=1;
  audioElement.currentTime=0;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle")
  makeAllPlay();
})

document.getElementById("prev").addEventListener("click",()=>{
  if(songIndex<1){
    songIndex=6;
  }
  else{
    songIndex = songIndex-1;
  }
  audioElement.src=`${songIndex}.mp3`;
  masterSongName.innerText=songs[songIndex].songName;
  audioElement.play();
  gif.style.opacity=1;
  audioElement.currentTime=0;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle")
  makeAllPlay();
})