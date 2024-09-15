const song = document.querySelector(".music");

const play = document.querySelector(".play");

const outline = document.querySelector(".moving-outline circle");

const video = document.querySelector(".video-container video");

const sounds = document.querySelectorAll(".sound button");

const time = document.querySelectorAll(".time");

const timeDisplay = document.querySelector(".time-display");

let unrealDuration = 900;

const myApp = function () {
  const outlineLength = outline.getTotalLength();

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  sounds.forEach(function (sound) {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      playAll(song);
    });
  });

  play.addEventListener("click", function () {
    playAll(song);
  });

  time.forEach(function (option) {
    option.addEventListener("click", function () {
      unrealDuration = this.getAttribute("data-time");

      timeDisplay.textContent = `${Math.floor(
        unrealDuration / 60
      )}:${Math.floor(unrealDuration % 60)}`;
    });
  });

  function playAll(song) {
    if (song.paused) {
      song.play();
      play.src = "./svg/pause.svg";
      video.play();
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  }

  song.ontimeupdate = function () {
    let currentTime = song.currentTime;

    let elapsed = unrealDuration - currentTime;

    let seconds = Math.floor(elapsed % 60);

    let minutes = Math.floor(elapsed / 60);
    // Animate
    let progress =
      outlineLength - (currentTime / unrealDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= unrealDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};
myApp();
