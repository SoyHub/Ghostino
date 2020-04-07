//fd4e76fc67798bfa742089ed619084a6
//SoundCloud
//AIzaSyC2-Zj6CkpXnLZdPV2_Qss2H14KunCDUJc
//Google key
var YT_BASE_URL = "https://www.googleapis.com/youtube/v3/search/";
var YT_API_KEY = "AIzaSyC2-Zj6CkpXnLZdPV2_Qss2H14KunCDUJc";
const searchInput = document.getElementById("search-entry");
const videoList = document.getElementById("search-results");
const videoPlayer = document.getElementById("videoFrame");
const loading = document.getElementById("loading");
const youtubeSearchBtn = document.getElementById("youtubeSearchBtn");
const openVideoPlayerBtn = document.getElementById("openVideoPlayerBtn");

function makeQueryObject(searchTerm, task) {
  var query = {
    part: "snippet",
    key: YT_API_KEY,
    q: searchTerm,
    maxResults: 25,
    type: "video",
  };

  return query;
}

function getDataFromApi(query, callback) {
  $.getJSON(YT_BASE_URL, query, callback);
}
//OnClick result imgs
function displayYouTubeSearchData(data) {
  var currentImage = "";
  var colNumber = 0;
  if (data.items.length !== 0) {
    // $('#no-results').attr('hidden', true);
    // $('#search-results').removeAttr('hidden');
    data.items.forEach(function (item, index) {
      currentImage =
        '<img src="' +
        item.snippet.thumbnails.high.url +
        '" title="' +
        item.snippet.title +
        '"></span>';
      document.getElementById("search-results").innerHTML += `
            <div class="artist_container">
            <div class="avatar_container">
            ${currentImage}
            </div>
            </div>

            `;
    });
    document
      .querySelector("#search-results")
      .addEventListener("click", function (e) {
        let src = e.target.src;
        src = extractVideoCode(src);

        document.getElementById("videoFrame").src = src;
        videoList.style = "display:none";
        hideAllYoutubeBtns();
        loading.style = "display:block";
        setTimeout(() => {
          showAllYoutubeBtns();
          openVideoPlayerBtn.style = "display:none";
          videoPlayer.style = "display:block";
          legs.style = "display:none";
          loading.style = "opacity:0";
        }, 6000);
      });
  }
}

function extractVideoCode(src) {
  src = src.split("/", 5);
  src = src[4];
  src =
    "https://www.youtube.com/embed/" +
    src +
    "?controls=0&autoplay=1&enablejsapi=1&html5=1&origin=http://localhost:5500";
  // console.log(src);
  return src;
}

//OnEnter SEARCH BAR
searchInput.onkeydown = (e) => {
  if (e.keyCode == 13) {
    // console.log(searchInput.value);
    getDataFromApi(
      makeQueryObject(searchInput.value, "submit"),
      displayYouTubeSearchData
    );
    document.getElementById("search-results").innerHTML = "";

    youtubeSearchBtn.style = "display:block";

    searchInput.style = "display:none";
    videoList.style = "display:flex";
    videoPlayer.style = "display:none";
    searchInput.value = "";
    legs.style = "display:none";
  }
};
let openVideoResultsBtn = document.getElementById("openVideoResultsBtn");
let openChatVideoBtn = document.getElementById("openChatVideoBtn");
//BTNS
youtubeSearchBtn.addEventListener("click", showYoutubeSearch);
openVideoPlayerBtn.addEventListener("click", showVideoPLayer);
openVideoResultsBtn.addEventListener("click", showVideoList);
openChatVideoBtn.addEventListener("click", showChat);
function showVideoPLayer() {
  openVideoPlayerBtn.style = "display:none";

  youtubeSearchBtn.classList.add("animated", "heartBeat");
  youtubeSearchBtn.style = "display:block";
  searchInput.style = "display:none";
  videoPlayer.style = "display:block";
  videoList.style = "display:none";

  legs.style = "display:none;";
}
function showYoutubeSearch() {
  youtubeSearchBtn.style = "display:none";
  youtubeSearchBtn.classList.add("animated", "heartBeat");

  openVideoResultsBtn.style = "display:block";
  // openVideoPlayerBtn.style = "display:none";
  searchInput.style = "display:block";
  videoPlayer.style = "display:none";
  videoList.style = "display:none";

  legs.style = "display:block;";
}
function showVideoList() {
  openVideoResultsBtn.style = "display:none";
  // openVideoResultsBtn.classList.add("animated", "heartBeat");

  openVideoPlayerBtn.style = "display:block";

  searchInput.style = "display:none";
  videoPlayer.style = "display:none";
  videoList.style = "display:flex";

  legs.style = "display:none;";
}
function showChat() {
  youtubeSearchBtn.style = "display:none";
  openVideoPlayerBtn.style = "display:none";
  openVideoResultsBtn.style = "display:none";
  openChatVideoBtn.style = "display:none";

  // openChatVideoBtn.classList.add("animated", "heartBeat");

  // openVideoPlayerBtn.style = "display:block";
  videoFrame.src = "";
  inputGhost.placeholder = "How can I help you?";
  inputGhost.style = "display:block";
  searchInput.style = "display:none";
  videoPlayer.style = "display:none";
  videoList.style = "display:none";

  legs.style = "display:block;";
}
function showAllYoutubeBtns() {
  youtubeSearchBtn.style = "display:block";
  openVideoPlayerBtn.style = "display:block";
  openVideoResultsBtn.style = "display:block";
  openChatVideoBtn.style = "display:block";
}
function hideAllYoutubeBtns(){
  youtubeSearchBtn.style = "display:none";
  openVideoPlayerBtn.style = "display:none";
  openVideoResultsBtn.style = "display:none";
  openChatVideoBtn.style = "display:none";
}