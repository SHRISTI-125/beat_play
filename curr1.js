const songs=[
    {
        artistName: "Emeline",
        songName:"Cindrella is Dead Now",
        img:"images/cindrella.png",
        music:"Songs/cindrella.mp3"
    },
    {
        artistName: "Sanam, Simran Sehgal",
        songName:"Ye Raatein Ye Mausam",
        img:"images/moon.png",
        music:"Songs/ye raatein ye mausam.mp3"
    },
    {
        artistName: "Vidhin Boda",
        songName:"Joker bgm",
        img:"images/joker.png",
        music:"Songs/joker.mp3"
    },
    {
        artistName: "Arijit Singh",
        songName:"Khairiyat Puchho",
        img:"images/music.png",
        music:"Songs/Khairiyat Chhichhore 128 Kbps.mp3"
    },
    {
        artistName: "Tones and I",
        songName:"Dance Monkey",
        img:"images/dance_monkey.png",
        music:"Songs/Dance-Monkey.mp3"
    },
    {
        artistName: "Majrooh Sultanpuri, Lata Mangeshkar",
        songName:"Bhoor Bhaye Panchhi Dhun Ye Sunaye",
        img:"images/bhoor.png",
        music:"Songs/bhoor_bhaye.mp3"
    }
]


const musicTrack = document.querySelector("#music_track");
const trackArtist = document.querySelector("#track_artist");
const trackTitle = document.querySelector("#track_title");
const currentMins = document.querySelector("#current_time_mins");
const currentSecs = document.querySelector("#current_time_secs");
const trackmins = document.querySelector("#track_mins");
const tracksecs = document.querySelector("#track_secs");
const prevBtn = document.querySelector("#prev");
const playPause = document.querySelector("#play_pause");
const nextBtn = document.querySelector("#next");
const trackRange = document.querySelector("#range");
const vol = document.querySelector("#vol");
const currentTrack = document.createElement("audio");
const container = document.querySelector("#container");

let isPlaying = false;
let trackIndex = 0;

loadTrack(trackIndex);
setInterval(fulltime, 1000);


function loadTrack(trackIndex){
    currentTrack.src = songs[trackIndex].music;
    currentTrack.load();

    musicTrack.src= songs[trackIndex].img;
    trackArtist.textContent = songs[trackIndex].artistName;
    trackTitle.textContent = songs[trackIndex].songName;
    container.style.backgroundImage = "url("+songs[trackIndex].img+")";
    volume();
};
function next(){
    if(trackIndex >= songs.length-1){
        trackIndex=0;
    }else{
        trackIndex++;
    }
    loadTrack(trackIndex);
    play();
};
function prev(){
    if(trackIndex <= 0 ){
        trackIndex = songs.length-1;
    }else{
        trackIndex--;
    }
    loadTrack(trackIndex);
    play();
};
function play_pause(){
    isPlaying ? pause() : play();
};
function play(){
    isPlaying= true;
    currentTrack.play();
    playPause.classList.remove("bi-play-circle");
    playPause.classList.add("bi-pause-circle");
};
function pause(){
    isPlaying= false;
    currentTrack.pause();
    playPause.classList.remove("bi-pause-circle");
    playPause.classList.add("bi-play-circle");
};
function fulltime(){
    const mins = String(Math.floor((currentTrack.duration)/60)).padStart(2,"0");
    const secs = String(Math.floor(currentTrack.duration-(mins*60))).padStart(2,"0");

    const currMins = String(Math.floor((currentTrack.currentTime)/60)).padStart(2,"0");
    const currSecs = String(Math.abs(Math.floor((currMins*60)-currentTrack.currentTime))).padStart(2,"0");

    trackmins.textContent = mins;
    tracksecs.textContent = secs;
    currentMins.textContent = currMins;
    currentSecs.textContent =currSecs;

    trackRange.value = currentTrack.currentTime;
    trackRange.max = currentTrack.duration;


    if(currentTrack.ended){
        next();
    };
};
function volume(){
    currentTrack.volume = vol.value/11;
};
function seek(){
    currentTrack.currentTime = trackRange.value;
};
