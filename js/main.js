const content = document.querySelector(".content"),
  musicImg = content.querySelector(".imageArea img"),
  musicName = content.querySelector(".songDetails .name"),
  musicArtist = content.querySelector(".songDetails .artist"),
  mainAudio = content.querySelector("#mainAudio"),
  playPause = content.querySelector("#playPause"),
  playBtn = content.querySelector(".playBtn"),
  prevBtn = content.querySelector("#prevSong"),
  nextBtn = content.querySelector("#nextSong"),
  playList = content.querySelector(".playList");
repeatBtn = content.querySelector("#repeatPlayList");
(progressArea = content.querySelector(".progressArea")),
  (musicCurrentTime = content.querySelector(".currentTime")),
  (musicMaxDuration = content.querySelector(".maxDuration")),
  (progressBar = content.querySelector(".progressBar"));

let musicIndex = 0;
let isPlaying = false;
window.addEventListener("load", () => {
  loadMusic(musicIndex);
  // playMusic();
});
const loadMusic = (indexNum) => {
  musicName.innerHTML = allMusic[indexNum].name;
  musicArtist.innerHTML = allMusic[indexNum].artist;
  musicImg.src = allMusic[indexNum].image;
  mainAudio.src = allMusic[indexNum].src;
};

const playMusic = () => {
  isPlaying = true;
  playBtn.querySelector("span").innerHTML = "pause";
  mainAudio.play();
};
const pauseMusic = () => {
  isPlaying = false;
  playBtn.querySelector("span").innerHTML = "play_arrow";
  mainAudio.pause();
};

playBtn.addEventListener("click", (e) => {
  console.log(e.target);
  isPlaying ? pauseMusic() : playMusic();
});
// =====next music Func=====
const nextMusic = (e) => {
  musicIndex++;
  if (musicIndex > allMusic.length - 1) {
    musicIndex = 0;
  } else {
    musicIndex = musicIndex;
    console.log(musicIndex);
  }
  loadMusic(musicIndex);
  playMusic();
};
nextBtn.addEventListener("click", nextMusic);
// =====prev music Func=======
const prevMusic = (e) => {
  musicIndex--;
  if (musicIndex < 0) {
    musicIndex = allMusic.length - 1;
  } else {
    musicIndex = musicIndex;
    console.log(musicIndex);
  }
  loadMusic(musicIndex);
  playMusic();
};
prevBtn.addEventListener("click", prevMusic);
// =====loop Music Func=======
repeatBtn.addEventListener("click", (e) => {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      repeatBtn.setAttribute("title", "Music looped");
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      repeatBtn.setAttribute("title", "shuffle Musics");
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      repeatBtn.setAttribute("title", "PlayList Looped");
      break;
  }
});
mainAudio.addEventListener("ended", (e) => {
  let getText = repeatBtn.innerText;
  switch (getText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randM = Math.floor(Math.random() * allMusic.length);
      do {
        randM = Math.floor(Math.random() * allMusic.length);
      } while (musicIndex == randM);
      {
        musicIndex = randM;
        loadMusic(musicIndex);
        playMusic();
        break;
      }
  }
});
// ============time update======
mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  // console.log("duration="+duration)
  // console.log("currentTime="+currentTime)
  // console.log("progressWidth="+progressWidth)
  mainAudio.addEventListener("loadeddata", (e) => {
    const interval = setInterval((e) => {
      const spendTime = mainAudio.currentTime;
      musicCurrentTime.innerHTML = formatTime(spendTime);
    }, 1000);
    const durationTime = mainAudio.duration;
    musicMaxDuration.innerHTML = formatTime(durationTime);
    mainAudio.addEventListener("ended", () => {
      clearInterval(interval);
    });
  });
});
progressArea.addEventListener("click",(e)=>{
    let progressWidth=progressArea.clientWidth;
    let clickedOffsetX=e.offsetX;
    console.log(progressWidth)
    console.log(clickedOffsetX)
    let songDuration=mainAudio.duration;
    mainAudio.currentTime=(clickedOffsetX / progressWidth)*songDuration;
    playMusic();

})
const formatTime = (time) => {
  if (time && !isNaN(time)) {
    const min =
      Math.floor(time / 60) < 10
        ? "0" + Math.floor(time / 60)
        : Math.floor(time / 60);
    const sec = Math.floor(time % 60)< 10
        ? "0" + Math.floor(time % 60)
        : Math.floor(time % 60);
    return `${min}:${sec}`;
  }
  return "00:00";
};
