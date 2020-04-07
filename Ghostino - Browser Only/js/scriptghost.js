const input = document.getElementById("ghost-input");
const image = document.getElementById("imageInHands");
const bubble = document.getElementById("ghost-bubble");
const mouth = document.querySelector(".ghost__mouth");
const legs = document.querySelector(".ghost__legs");
const body = document.querySelector("body");
let audio = new Audio();

body.classList.add("animated", "fadeInDown");
// setTimeout(() => {
//   message("Ciao! Sono Rovid-19 e sono il tuo assistente");
// }, 2000);
// setInterval(() => {
//   randomBackground();
// }, 90000);
function showPhoto(name, messages = "Wait a sec..") {
  message(messages);
  setTimeout(() => {
    image.src = "css/img/" + name;
    image.style = "display:block;";

    inputGhost.style = "display:none;";

    legs.style = "display:none;";
  }, 2000);
}
function showARandomPhoto() {
  message("For sure...");
  setTimeout(() => {
    let src = "https://i.picsum.photos/id/" + randomNumber() + "/400/390.jpg";
    input.style = "display:none;";
    image.style = "display:block;";
    legs.style = "display:none;";
    fetch(src).then(response => {
      if (response.status == 404) {
        src = "https://i.picsum.photos/id/" + randomNumber() + "/400/390.jpg";
        image.src = src;
      } else {
        image.src = src;
      }
    });
  }, 2000);
}
function randomNumber() {
  let random = Math.random() * 1000;
  random = Math.round(random);
  return random;
}
function randomBackground() {
  let rand = Math.floor(Math.random() * 10);
  document.querySelector("body").style =
    "background-image: url('css/img/wallpaper" + rand + ".jpg');";
}
function hideImage() {
  image.style = "opacity:0;";
  image.style = "display:none;";
  input.style = "display:block;";
  legs.style = "display:block;";
  input.value = "";
  input.placeholder = "How can I help you?";
}
function deletePlaceHolder() {
  while (input.placeholder != "") {
    input.placeholder = input.placeholder.substring(1);
  }
}
function typeWriter(message, moves = 100) {
  let i = 0;

  var timer = setInterval(() => {
    if (i < message.length) {
      input.placeholder += message.charAt(i);
      i++;
      if (i >= message.length) {
        input.disabled = false;
      }
      if (i > 29) {
        moveMouth(moves);
        input.placeholder = input.placeholder.substring(1);
      }
    } else {
      clearInterval(timer);
    }
  }, 100);
}
function moveMouth(moves = 300) {
  // mouth chatter
  let j = 0;

  const mouthChatter = setInterval(() => {
    mouth.classList.toggle("ghost__mouth--open");
    if (j === 6) clearInterval(mouthChatter);
    j++;
  }, moves);
}
function message(message, moves = 300) {
  input.value = "";
  input.placeholder = "";
  //max chars in the placeholder are 27 characters
  input.disabled = true;
  typeWriter(message);
  input.blur();
  moveMouth(moves);
}
function normalMessage(message, moves = 300) {
  input.value = "";
  input.placeholder = message;
  // input.disabled = true;
  // typeWriter(message);
  input.blur();
  moveMouth(moves);
}

function showButtonsWithAnimation(
  leftBtnsAnimation,
  rightBtnsAnimation, topBtnsAnimation,
  speed = 100
) {
  setTimeout(() => {
    setTimeout(() => {
      openResultsBtn.style = "display:block;";
      openResultsBtn.classList.add("animated", leftBtnsAnimation);

      setTimeout(() => {
        openChatBtn.style = "display:block;";
        openChatBtn.classList.add("animated", leftBtnsAnimation);

        setTimeout(() => {
          openMusicPlayerBtn.style = "display:block;";
          openMusicPlayerBtn.classList.add("animated", leftBtnsAnimation);

          setTimeout(() => {
            openSearchBtn.style = "display:block";
            openSearchBtn.classList.add("animated", leftBtnsAnimation);
          }, speed);
        }, speed);
      }, speed);
    }, speed);

    setTimeout(() => {
      pauseBtn.style = "display:block;";
      pauseBtn.classList.add("animated", rightBtnsAnimation);
      setTimeout(() => {
        repeatBtn.style = "display:block;";
        repeatBtn.classList.add("animated", rightBtnsAnimation);

        setTimeout(() => {
          backBtn.style = "display:block;";
          backBtn.classList.add("animated", rightBtnsAnimation);

          setTimeout(() => {
            nextBtn.style = "display:block;";
            nextBtn.classList.add("animated", rightBtnsAnimation);
          }, speed);
        }, speed);
      }, speed);
    }, speed);

    setTimeout(() => {
      autoNextOnBtn.style = "display:block;";
      autoNextOnBtn.classList.add("animated", topBtnsAnimation);
      setTimeout(() => {
        repeatForeverOnBtn.style = "display:block;";
        repeatForeverOnBtn.classList.add("animated", topBtnsAnimation);
      }, 0);
    }, 0);

    searchIn.style = "display:block;";
    inputGhost.style = "display:none;";

    results.style = "display:none";
    musicPlayer.style = "display:none;";
    input.placeholder = "How can I help you?";
  }, 1500);
}

function timeMessage() {
  let timer = setInterval(() => {
    let date = new Date();
    let time =
      ("0" + (date.getHours() % 12)).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2) +
      ":" +
      ("0" + date.getSeconds()).slice(-2);
    normalMessage(time, 500);
  }, 1000);
}
input.onkeydown = e => {
  if (e.keyCode == 13) {
    let valueOfInput = input.value.toLowerCase();
    if (valueOfInput.includes("bello") && valueOfInput.includes("sei")) {
      message("Non quanto te!");
    } else if (valueOfInput.includes("come stai")) {
      message("Io sto bene! E tu?");
    } else if (valueOfInput == "ciao" || valueOfInput == "ciao rovid") {
      message("Ciao!");
    } else if (
      valueOfInput.includes("nel mio computer") &&
      (valueOfInput.includes("fai") || valueOfInput.includes("facendo"))
    ) {
      message("Sono qui per aiutarti..");
    } else if (
      valueOfInput.includes("mi sento") &&
      valueOfInput.includes("sola")
    ) {
      message("Da oggi non sei più sola..");
    } else if (
      valueOfInput.includes("tell") &&
      valueOfInput.includes("secret")
    ) {
      message("I can't live without you...");
    } else if (valueOfInput.includes("ti ha creato")) {
      message("Mi ha creato un Junior Developer che si chiama Sohayb..");
    } else if (valueOfInput.includes("fai tutto il giorno")) {
      message("Mangio i cookies che cancelli..lol");
      setTimeout(() => {
        message("Dai scherzo!");
      }, 5000);
      setTimeout(() => {
        message("Niente faccio, aspetto che mi chiami tu..");
      }, 7000);
    } else if (
      valueOfInput.includes("mi annoio") ||
      (valueOfInput.includes("ho") && valueOfInput.includes("paura"))
    ) {
      message("Ma nooo passerà in fretta!");
    } else if (
      (valueOfInput.includes("cambia") || valueOfInput.includes("change")) &&
      valueOfInput.includes("background") || valueOfInput.includes("sfondo")
    ) {
      message("Adesso..");
      randomBackground();
    } else if (
      valueOfInput.includes("cosa farai") &&
      valueOfInput.includes("tutto questo")
    ) {
      message("Ti abbraccio..");
    } else if (
      (valueOfInput.includes("show") || valueOfInput.includes("vedere")) &&
      (valueOfInput.includes("photo") ||
        valueOfInput.includes("image") ||
        valueOfInput.includes("pic") ||
        valueOfInput.includes("foto"))
    ) {
      showARandomPhoto();
    } else if (
      (valueOfInput.includes("show") || valueOfInput.includes("vedere")) &&
      (valueOfInput.includes("son") || valueOfInput.includes("figlio")) &&
      (valueOfInput.includes("tuo") || valueOfInput.includes("your"))
    ) {
      showPhoto("ghost.png");
    } else if (
      valueOfInput.includes("fuck you") ||
      valueOfInput.includes("fuck off") ||
      valueOfInput.includes("bitch")
    ) {
      showPhoto("middle2.png", "Fuck off..");
      setTimeout(() => {
        body.style =
          "background-image: url('css/img/middle3.jpg'); background-size: 150px;";
      }, 2000);
    } else if (
      valueOfInput.includes("cosa") &&
      valueOfInput.includes("sei fatto")
    ) {
      message("Io sono fatto da JavaScript, Electron, HTML, CSS, Bootstrap..");
    } else if (
      (valueOfInput.includes("play") || valueOfInput.includes("metti")) &&
      (valueOfInput.includes("music") || valueOfInput.includes("musica"))
    ) {
      message("Loading.......");
      showButtonsWithAnimation("heartBeat", "heartBeat","heartBeat", 250);
      // ghostBubble.style = "display:block;";
    } 
     else if (
      (valueOfInput.includes("play") || valueOfInput.includes("metti")) &&
      (valueOfInput.includes("youtube") || valueOfInput.includes("video"))
    ) {
      message("Loading.......");
      inputGhost.style="display:none";
      searchInput.style="display:block";
      openChatVideoBtn.style = "display:block";
    
      // openChatBtn.style="display:block";
    } else if (
      valueOfInput.includes("ci sentiamo") ||
      valueOfInput.includes("devo andare")
    ) {
      message("Ok! Ci sentiamo dopo");
      setTimeout(() => {
        message("Sono sempre qui per te..");
      }, 3000);
    } else {
      switch (input.value) {
        case "what is the time now?":
          timeMessage();
          input.style = "text-align: center;";
          break;
        case "do you know powercoders?":
          message("Do you mean Antony?");
          break;
        case "play Jimmy":
          audio.pause();
          audio.play();
          message("Playing Jimmy Sax - No Women No Cry...");
          break;
        case "hello":
          message("Hi!");
          break;
        case "hi":
          message("Hello!");
          break;
        case "hey":
          message("Hey!");
          break;
        case "what is your name?":
          message("My name is ROVID-19");
          break;
        case "wtf":
          message("Why are you swearing?");
          break;
        case "who is your owner?":
          message("Sohayb El BRENS!");
          break;
        case "stop the music":
          message("Mashy ya BRENS!");
          player.pause();
          break;
        case "how are you?":
          message("I am fine thanks!");
          break;
        case "offer me a place to go":
          message("Stay at Home, faggot!");
          break;
        case "what is your hobby?":
          message("Flying Haha!");
          break;
        case "what is my fav group?":
          message("Showercoders Haha...");
          break;
        case "how old are you?":
          message("Click my nose to know it!");
          break;
        case "but you have no nose":
          message("So mind your business!!");
          break;
        case "no!!":
          message("Ops, powercoders Italy?");
          break;
        case "get lost!!":
          message("Close me!");
          break;
        case "what do you hate the most?":
          message("CORONAVIRUS!!!");
          break;
        case "test":
          message("This is a very very very very very looooooong message!");
          break;
        case "tell me a joke":
          message("Ok!");
          tellAJoke();
          break;
        case "tell me a quote":
          message("Ok!");
          tellAQuote();
          break;
        //Dialoge Daria
        case "Ciao! Chi sei e che cosa ci fai nel mio computer?":
          message("Ciao! Sono Rovid-19 e sono il tuo assistente..");
          break;
        case "Ah! Che bello, mi sento così sola":
          message("Da oggi non sei più sola");
          break;
        case "tell me a quote":
          message("Ok!");
          break;
        case "tell me a quote":
          message("Ok!");
          break;
        case "tell me a quote":
          message("Ok!");
          break;
        case "tell me a quote":
          message("Ok!");
          break;
        case "tell me a quote":
          message("Ok!");
          tellAQuote();
          break;

        default:
          input.classList.add("animated", "heartBeat");
          setTimeout(() => {
            input.classList.remove("animated", "heartBeat");
          }, 1500);

          // message("I don't understand you!");
          break;
      }
    }
  }
};
function tellAQuote() {
  fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data => {
      let quote = `${data.content} —${data.author}`;
      message(quote);
    });
}
function tellAJoke() {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(response => response.json())
    .then(data => {
      let joke = `${data.setup} —${data.punchline}`;
      message(data.setup);
      setTimeout(() => {
        message(data.punchline);
      }, 6000);
      setTimeout(() => {
        message("Haha!");
      }, 11000);
    });
}
