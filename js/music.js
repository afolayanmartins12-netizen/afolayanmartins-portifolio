const wrapper = document.getElementById("main-wrapper");
const musicImg = document.getElementById("track-art");
const musicName = document.getElementById("track-name");
const musicArtist = document.getElementById("track-artist");
const mainAudio = document.getElementById("main-audio");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressArea = document.getElementById("progress-area");
const progressBar = document.getElementById("progress-bar");
const musicListDiv = document.getElementById("music-list");
const showListBtn = document.getElementById("show-list");
const closeListBtn = document.getElementById("close-list");
const shuffleBtn = document.getElementById("shuffle");

let musicIndex = 0;
let isShuffle = false;
let musicList = [
    {
    img: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=500",
    name: "Sailing Away",
    artist: "Rafael",
    duration: "0:22",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/sailing-away.mp3"
    },
    {
    img: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=500",
    name: "Electronic",
    artist: "Rafael",
    duration: "0:15",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/electronic.mp3",
    },
    {
    img: "https://images.unsplash.com/photo-1499415479124-43c32433a620?w=500",
    name: "Camper Cat",
    artist: "Rafael",
    duration: "0:21",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/camper-cat.mp3",
    },
    {
    img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500",
    title: "In the Zone",
    name: "Rafael",
    duration: "0:11",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/in-the-zone.mp3",
    }
];

// Load song info
function loadMusic(index) {
    musicName.innerText = musicList[index].name;
    musicArtist.innerText = musicList[index].artist;
    musicImg.src = musicList[index].img;
    mainAudio.src = musicList[index].src;
}

// Fixed Play/Pause Logic
function togglePlay() {
    if (mainAudio.paused) {
        mainAudio.play();
        wrapper.classList.add("playing");
        playPauseBtn.querySelector("i").className = "ri-pause-fill";
    } else {
        mainAudio.pause();
        wrapper.classList.remove("playing");
        playPauseBtn.querySelector("i").className = "ri-play-fill";
    }
}

playPauseBtn.addEventListener("click", togglePlay);

// Next Song
nextBtn.addEventListener("click", () => {
    if (isShuffle) {
        musicIndex = Math.floor(Math.random() * musicList.length);
    } else {
        musicIndex = (musicIndex + 1) % musicList.length;
    }
    loadMusic(musicIndex);
    mainAudio.play();
    playPauseBtn.querySelector("i").className = "ri-pause-fill";
});

// Previous Song
prevBtn.addEventListener("click", () => {
    musicIndex = (musicIndex - 1 + musicList.length) % musicList.length;
    loadMusic(musicIndex);
    mainAudio.play();
    playPauseBtn.querySelector("i").className = "ri-pause-fill";
});

// Shuffle Toggle
shuffleBtn.addEventListener("click", () => {
    isShuffle = !isShuffle;
    shuffleBtn.classList.toggle("active");
});

// Progress Bar & Timer
mainAudio.addEventListener("timeupdate", (e) => {
    const { currentTime, duration } = e.target;
    if (duration) {
        let progressWidth = (currentTime / duration) * 100;
        progressBar.style.width = `${progressWidth}%`;
        
        document.getElementById("current-time").innerText = formatTime(currentTime);
        document.getElementById("max-duration").innerText = formatTime(duration);
    }
});

function formatTime(time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// Click on progress bar to skip
progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * mainAudio.duration;
    mainAudio.play();
    playPauseBtn.querySelector("i").className = "ri-pause-fill";
});

// PLAYLIST SELECTION: This builds the clickable list
function renderPlaylist() {
    const ul = document.getElementById("playlist-container");
    ul.innerHTML = ""; 
    musicList.forEach((song, i) => {
        let li = `<li onclick="selectFromList(${i})">
                    <div class="row">
                        <strong>${song.name}</strong>
                        <p style="margin:0; opacity:0.6; font-size:0.8rem;">${song.artist}</p>
                    </div>
                  </li>`;
        ul.insertAdjacentHTML("beforeend", li);
    });
}

// Function called when you click a song in the list
window.selectFromList = (index) => {
    musicIndex = index;
    loadMusic(musicIndex);
    togglePlay();
    musicListDiv.classList.remove("show"); // Close the list after selecting
};

// Open/Close Playlist Panel
showListBtn.addEventListener("click", () => musicListDiv.classList.add("show"));
closeListBtn.addEventListener("click", () => musicListDiv.classList.remove("show"));

// Initial setup
loadMusic(musicIndex);
renderPlaylist();