let searchResults;
let autoNextInterval;
let player = document.getElementById("music-player");
let searchform = document.getElementById("search-form");
let ghostBubble = document.getElementById("ghost-bubble");
let repeatForeverInterval;
//INPS AND BARS
let results = document.getElementById("results");
let inputGhost = document.getElementById("ghost-input");
let searchIn = document.getElementById("search_field");
let musicPlayer = document.querySelector(".player");

//BTNS
let openSearchBtn = document.querySelector("#openSearchBtn");
let openMusicPlayerBtn = document.querySelector("#openMusicPlayerBtn");
let openChatBtn = document.querySelector("#openChatBtn");
let openResultsBtn = document.querySelector("#openResultsBtn");

let repeatBtn = document.querySelector("#repeatBtn");
let repeatForeverOnBtn = document.querySelector("#repeatForeverOnBtn");
let repeatForeverOffBtn = document.querySelector("#repeatForeverOffBtn");

let backBtn = document.querySelector("#backBtn");
let nextBtn = document.querySelector("#nextBtn");
let playBtn = document.querySelector("#playBtn");
let pauseBtn = document.querySelector("#pauseBtn");

//Important variables
let titleList = [];
let srcList = [];
let songEnded = false;
let currentSongSrc = "";
let currentIndex = 0;

//Client key
const CLIENT_ID = "?client_id=8538a1744a7fdaa59981232897501e04";

//ON ENTER SEARCH BAR
searchIn.onkeydown = e => {
  if (e.keyCode == 13) {
    goSearch();
    searchIn.value = "";
    searchIn.style = "display:none";
    legs.style = "display:none";
    results.style = "display:flex";

    openSearchBtn.style = "display:block";
    openSearchBtn.classList.add("animated", "heartBeat");
  }
};
//SEARCHING FUNCTION
function goSearch() {
  let searchQuery = searchIn.value;
  fetch(
    "https://api.soundcloud.com/tracks?client_id=8538a1744a7fdaa59981232897501e04&q=" +
      searchQuery
  ).then(function(response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    } else {
      response.json().then(function(data) {
        for (let i = 0; i < data.length; i++) {
          //  console.log("show each title:", data[i].title);
          titleList[i] = data[i].title;
          srcList[i] = data[i].stream_url + CLIENT_ID;
          // console.log('titleList'+i+":"+titleList[i]);

          let markup = `
          <div class="artist_container">
          <div class="avatar_container">
          <img title="${data[i].title}\n${data[i].user.username}" class="${data[i].stream_url}?client_id=8538a1744a7fdaa59981232897501e04" src=${data[i].user.avatar_url}>
          </div>
                </div>
                `;
          document.getElementById("results").innerHTML += markup;
        }
      });
    }
  });
  // setTimeout(() => {
  //   console.log(srcList);
  //   console.log(titleList);
  // }, 3000);
  document.getElementById("results").innerHTML = ""; //this clears the page for the next search
}
//WHEN CLICKING ON THE RESULT
document.getElementById("results").addEventListener("click", function(e) {
  if (e.target && e.target.nodeName == "IMG") {
    let url = e.target.className;

    //?client_id=8538a1744a7fdaa59981232897501e04

    player.removeAttribute("src");
    player.setAttribute("src", url);
    player.play();
    currentSongSrc = url;
    currentIndex = srcList.indexOf(currentSongSrc);
    indexOfPreviousSong = srcList.indexOf(currentSongSrc) - 1;

    let playerSource = player.src;
    // console.log(playerSource);
    ghostBubble.innerHTML = e.target.title;


    openMusicPlayerBtn.style = "display:none;";
    openResultsBtn.style = "display:block;";

    inputGhost.style = "display:none;";
    searchIn.style = "display:none;";
    results.style = "display:none";
    musicPlayer.style = "display:block;";

    legs.style = "display:block;";
  }
});

//CHECKING IF THE SONG HAS ENDED
var checkIfEnded = setInterval(() => {
  if (player.currentTime == player.duration) {
    songEnded = true;
    // console.log("SONG ENDED!");
    ghostBubble.innerText = "...";
    // playNext();
  }
  if (repeatForeverInterval) {
  }
}, 500);

//FUNCTIONS FOR SOME BTNS
function playNext() {
  if (!isNaN(player.duration)) {
    if (srcList[0] != undefined) {
      let j = srcList.length;

      console.log(currentIndex);
      if (currentIndex == j - 1) {
        currentIndex = 0;
        player.removeAttribute("src");
        player.setAttribute("src", srcList[currentIndex]);
        player.play();


        ghostBubble.innerHTML=titleList[currentIndex % j];
        // console.log(titleList[currentIndex % j]);
      } else {
        currentIndex++;
        player.removeAttribute("src");
        player.setAttribute("src", srcList[currentIndex]);
        player.play();

        ghostBubble.innerHTML=titleList[currentIndex % j];
        // console.log(titleList[currentIndex % j]);
      }
    }
  }
}
function playBack() {
  if (!isNaN(player.duration)) {
    if (srcList[0] != undefined) {
      let j = srcList.length;

      // console.log(currentIndex);
      if (currentIndex == 0) {
        currentIndex = j - 1;

        player.removeAttribute("src");
        player.setAttribute("src", srcList[currentIndex]);
        player.play();

        ghostBubble.innerHTML=titleList[currentIndex % j];
        // console.log(titleList[currentIndex % j]);
      } else {
        currentIndex--;
        player.removeAttribute("src");
        player.setAttribute("src", srcList[currentIndex]);
        player.play();
        ghostBubble.innerHTML=titleList[currentIndex % j];
      }
    }
  }
}

//BTNS FUNCTIONS
nextBtn.addEventListener("click", playNext);
backBtn.addEventListener("click", playBack);


openChatBtn.addEventListener("click", () => {
  openSearchBtn.style = "display:block";
  openSearchBtn.classList.add("animated", "heartBeat");

  openChatBtn.style = "display:none;";

  // openMusicPlayerBtn.style="display:block;"
  // openResultsBtn.style="display:block;"
  image.style = "display:none;";
  inputGhost.style = "display:block;";
  searchIn.style = "display:none;";
  results.style = "display:none";
  musicPlayer.style = "display:none;";
  searchInput.style="display:none";
  videoPlayer.style="display:none";
  videoList.style="display:none";

  legs.style = "display:block;";
});
openSearchBtn.addEventListener("click", () => {
  openSearchBtn.style = "display:none";
  openChatBtn.style = "display:block;";
  openChatBtn.classList.add("animated", "heartBeat");
  openMusicPlayerBtn.style = "display:block;";

  image.style = "display:none;";
  inputGhost.style = "display:none;";
  searchIn.style = "display:block;";
  results.style = "display:none";
  musicPlayer.style = "display:none;";

  legs.style = "display:block;";
});
openMusicPlayerBtn.addEventListener("click", () => {
  openSearchBtn.style = "display:block";
  openSearchBtn.classList.add("animated", "heartBeat");

  openChatBtn.style = "display:block;";
  openChatBtn.classList.add("animated", "heartBeat");

  openMusicPlayerBtn.style = "display:none;";
  openResultsBtn.style = "display:block;";
  openResultsBtn.classList.add("animated", "heartBeat");

  image.style = "display:none;";
  inputGhost.style = "display:none;";
  searchIn.style = "display:none;";
  results.style = "display:none";
  musicPlayer.style = "display:block;";

  legs.style = "display:block;";
});
openResultsBtn.addEventListener("click", () => {
  openResultsBtn.style = "display:none;";
  openSearchBtn.style = "display:block";
  openSearchBtn.classList.add("animated", "heartBeat");

  image.style = "display:none;";
  openChatBtn.style = "display:block;";
  openChatBtn.classList.add("animated", "heartBeat");
  openMusicPlayerBtn.style = "display:block;";
  openMusicPlayerBtn.classList.add("animated", "heartBeat");

  results.style = "display:flex";
  inputGhost.style = "display:none;";
  searchIn.style = "display:none;";
  musicPlayer.style = "display:none;";

  legs.style = "display:none;";
});
repeatForeverOnBtn.addEventListener("click", () => {
  autoNextOnBtn.disabled = true;

  repeatForeverOffBtn.style = "display:block;";
  repeatForeverOnBtn.style = "display:none;";
  repeatBtn.style = "display:none;";

  repeatForeverInterval = setInterval(() => {
    if (songEnded) {
      player.play();
    }
  }, 500);
});
repeatForeverOffBtn.addEventListener("click", () => {
  autoNextOnBtn.disabled = false;
  repeatForeverOffBtn.style = "display:none;";
  repeatForeverOnBtn.style = "display:block;";
  repeatBtn.style = "display:block;";
  clearInterval(repeatForeverInterval);
});
autoNextOnBtn.addEventListener("click", () => {
  repeatForeverOnBtn.disabled = true;
  autoNextOffBtn.style = "display:block;";
  autoNextOnBtn.style = "display:none;";
  autoNextInterval = setInterval(() => {
    if (songEnded) {
      songEnded = false;
      playNext();
    }
  }, 1000);
});
autoNextOffBtn.addEventListener("click", () => {
  repeatForeverOnBtn.disabled = false;
  autoNextOffBtn.style = "display:none;";
  autoNextOnBtn.style = "display:block;";
  clearInterval(autoNextInterval);
});
repeatBtn.addEventListener("click", () => {
  if (songEnded) {
    songEnded = false;
    player.play();
  }
});
playBtn.addEventListener("click", () => {
  if (!isNaN(player.duration)) {
    playBtn.style = "display:none;";
    pauseBtn.style = "display:block;";
    player.play();
  }
});
pauseBtn.addEventListener("click", () => {
  if (!isNaN(player.duration)) {
    playBtn.style = "display:block;";
    pauseBtn.style = "display:none;";
    player.pause();
  }
});