let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let songInfo = document.getElementById("songInfo");
let myProgressBar = document.getElementById("myProgressBar");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let currentTimeDisplay = document.getElementById("currentTime");
let totalTime = document.getElementById("totalTime");


let songs = [
    { songName: "Brown Rang-Yo Yo Honey Singh", filePath: "songs/1.mp3", coverPath: "cover/1.jpg", duration: "02:59" },
    { songName: "Jingle Bell- Honey Singh, H. Dilliwala", filePath: "songs/2.mp3", coverPath: "cover/2.jpg", duration: "03:16" },
    { songName: "Blue Eyes-Yo Yo Honey Singh", filePath: "songs/3.mp3", coverPath: "cover/3.jpg", duration: "03:41" },
    { songName: "Bring Me Back-Yo Yo Honey Singh", filePath: "songs/4.mp3", coverPath: "cover/4.jpg", duration: "03:12" },
    { songName: "Dope Shope- Honey Singh, Deep Money", filePath: "songs/5.mp3", coverPath: "cover/5.jpg", duration: "03:08" },
    { songName: "Satan-Yo Yo Honey Singh", filePath: "songs/6.mp3", coverPath: "cover/6.jpg", duration: "04:52" },
    { songName: "Get Up Jawani- Honey Singh, BaadShah", filePath: "songs/7.mp3", coverPath: "cover/7.jpg", duration: "03:33" },
    { songName: "Ahaatein-Agnee", filePath: "songs/8.mp3", coverPath: "cover/8.jpg", duration: "03:37" },
    { songName: "Jehri Ve-Jasmine Sandlas, Gippy Grewal", filePath: "songs/9.mp3", coverPath: "cover/9.jpg", duration: "03:43" },
    { songName: "Laado-MC Square", filePath: "songs/10.mp3", coverPath: "cover/10.jpg", duration: "02:38" },
    { songName: "Check It Out-Parmish Verma ft.Paradox", filePath: "songs/11.mp3", coverPath: "cover/11.jpg", duration: "03:15" }
]
songItems.forEach((element, i) => {
    element.id = `songItem${i}`;
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//Play/pause song//
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle")
        masterPlay.classList.add("fa-pause-circle")

    }
    
    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle")
        masterPlay.classList.add("fa-play-circle")
    }
})

//Listen to Events//
const playnext = () => {
    songIndex += 1;
    if (songIndex >= songs.length) {
        // If you've reached the end of the playlist, loop back to the first song
        songIndex = 0;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    songInfo.innerText = songs[songIndex].songName;
    totalTime.innerText = songs[songIndex].duration;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
    if (progress === 100) {
        playnext();
    }
})
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;

})

// const makeAllPlays = () => {
//     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
//         element.classList.remove("fa-play-circle");
//         element.classList.add("fa-pause-circle");
//     })
// }

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        songInfo.innerText = songs[songIndex].songName;
        totalTime.innerText = songs[songIndex].duration;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('forwardbutton').addEventListener('click', () => {
    if (songIndex >= (songs.length - 1)) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    songInfo.innerText = songs[songIndex].songName;
    totalTime.innerText = songs[songIndex].duration;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
document.getElementById('backbutton').addEventListener('click', () => {
    if (songIndex === 0) {
        // If you're already at the first song, go to the last song
        songIndex = songs.length - 1;
    } else if (audioElement.currentTime > 2) {
        // If you're not at the first song and you've played more than 2 seconds, restart the current song
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        // Go to the previous song
        songIndex -= 1;
    }

    audioElement.src = `songs/${songIndex + 1}.mp3`;
    songInfo.innerText = songs[songIndex].songName;
    totalTime.innerText = songs[songIndex].duration;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});


function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    // Update the time display
    currentTimeDisplay.innerText = formatTime(audioElement.currentTime);
});

songItems.forEach((element) => {
    element.addEventListener('click', (e) => {
        // makeAllPlays();
        const songItemIndex = parseInt(e.currentTarget.id.replace("songItem", ""));
        songIndex = songItemIndex;
        const song = songs[songItemIndex];
        audioElement.src = song.filePath;
        songInfo.innerText = song.songName;
        totalTime.innerText = song.duration;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});
