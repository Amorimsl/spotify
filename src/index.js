const songName = document.getElementById("song-name");
const play = document.getElementById('play');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const actorName = document.getElementById('actor-name')
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const currentProgress = document.getElementById('current-progress');
const progressContent = document.getElementById('progress-content');
const likeHeart = document.getElementById('like');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');


const porsheSong = {
  songName: "Porshe",
  actorName: "vulgo FK",
  file: 'song_porshe',
  like: false

};

const fortunaSong = {
  songName: "fortuna",
  actorName: 'Carl Orff',
  file: 'song_two',
  like: false
};

const playlist = [porsheSong, fortunaSong];
let spreadPlaylist = [...playlist];
let isPlaying = false;
let wrapSong = false;
let repeatON = false;
let index = 0;

const playClick = () => {
  play.querySelector('.bi').classList.remove('bi-play-circle-fill');
  play.querySelector('.bi').classList.add('bi-pause-circle-fill');
  isPlaying = true;
}

const pauseClick = () => {
  play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
  play.querySelector('.bi').classList.add('bi-play-circle-fill');
  isPlaying = false;
}

const decidePlay = () => {
  if (isPlaying === false) {
    isPlaying = true;
    playClick();
    audio.play();
  }
  else {
    isPlaying = false;
    pauseClick();
    audio.pause();
  }
}
const initialSongs = () => {
  cover.src = `/img/${playlist[index].file}.jpg`;
  audio.src = `/song/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  actorName.innerText = playlist[index].actorName;
  likeHeartsRender();

}

const previousDecider = () => {
  if (index === 0) {
    index = playlist.length - 1;
  }
  else {
    index -= 1;
  }
  initialSongs();
  playClick();
  audio.play();
}

const nextDecider = () => {
  if (index === playlist.length - 1) {
    index = 0;
  }
  else {
    index += 1;
  }
  initialSongs();
  playClick();
  audio.play();
}
const updateProgress = () => {
  const barWidth = (audio.currentTime / audio.duration) * 100;
  currentProgress.style.setProperty('--progress', ` ${barWidth}%`)
}
const likeHeartsRender = () => {
  if (playlist[index].like === true) {
    likeHeart.style.setProperty('--col', 'green');
  }
  else {
    likeHeart.style.setProperty('--col', 'white');
  }
}
const buttonLikeHeart = () => {
  if (playlist[index].like === false) {
    playlist[index].like = true;

  }
  else {
    playlist[index].like = false;
  }
  likeHeartsRender();
}

const jump = (event) => {
  const width = progressContent.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * audio.duration;
  audio.currentTime = jumpToTime;
}

const wrapArray = (preWrapArray) => {
  const size = preWrapArray.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = preWrapArray[currentIndex];
    preWrapArray[currentIndex] = preWrapArray[randomIndex];
    preWrapArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}


const buttonWrapArray = () => {
  if (wrapSong === false) {
    wrapSong = true;
    wrapArray(spreadPlaylist);
    shuffleButton.classList.add('button-active');
  }
  else {
    wrapSong = false;
    spreadPlaylist = [...playlist];
    shuffleButton.classList.remove('button-active');
  }
}
const repeatButtonClick = () => {
  if (repeatON === false) {
    repeatON = true;
    repeatButton.classList.add('button-active');
  }
  else {
    repeatON = false;
    repeatButton.classList.remove('button-active');
  }
}
const nextOrRepeat = () => {
  if (repeatON === false) {
    nextDecider();
  }
  else {
    audio.play();
  }
}
initialSongs();

play.addEventListener('click', decidePlay);
previous.addEventListener('click', previousDecider);
next.addEventListener('click', nextDecider);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextOrRepeat);
progressContent.addEventListener('click', jump);
likeHeart.addEventListener('click', buttonLikeHeart);
shuffleButton.addEventListener('click', buttonWrapArray);
repeatButton.addEventListener('click', repeatButtonClick);