//AVENIR AUDIO
const audioBox = document.querySelector(".audio-box");
const thematiques = {
  thematique_1: "Les rapports de domination",
  thematique_2: "Les postures sur le monde vivant",
  thematique_3: "Les générations",
  thematique_4: "Des espaces et paysages sensibles",
  thematique_5: "Le financier, la comptabilité",
  thematique_6: "L’inspiration par l’autre",
  thematique_7: "Les rapports d’échelle",
  thematique_8: "La force du rituel",
  thematique_9: "Le temps et nos imaginaires",
  thematique_10: "Le citoyen sonore",
  thematique_11: "Les circulations",
  thematique_12: "Des moyens de connexion au vivant",
  thematique_13: "Images de l'avenir"
};

function isAudioBoxShowed(bool) {
  if (!bool) {
    audioBox.style.display = "none";
    showAudioBox = false;
    audioLoad = document.getElementById("audio");
    if (audioLoad) {
      audioLoad.pause();
    }
    
    //remove inner html
  } else {
    audioBox.style.display = "block";
    showAudioBox = true;
  }
}

isAudioBoxShowed(false);

//function to get audio from avenir
async function getAudioAvenir(id) {
  let response = await fetch("/avenir/" + id);
  let data = await response.text();
  audioBox.innerHTML = data;
  isAudioBoxShowed(true)
}

async function getAudioParticipant(id, name) {
  //console.log("id of audio participant: " + id);
  let response = await fetch("/participant/" + id);
  let data = await response.json();
  let themeTitle = data[0].title;
  let title = thematiques[themeTitle];
  let src = data[0].src;
  audioBox.innerHTML = `<figure>
  <figcaption>Ecoutez ${name} : <span id="extrait-nb">1/${data.length}</span></figcaption>
  <div class="audio-control"><p id="audioThemeNumber">${title}</p> <p><i id="rew" class="arrow left"></i><span/> <i id="fwd" class="arrow right"></i></p></div>
  <audio id="audio"
      controls> 
      <source id="audio-src" src="./extraits_montes/${src}" type="audio/mp3">
          Your browser does not support the
          <code>audio</code> element.
  </audio>
  </figure>`;
  let fwdBtn = document.getElementById("fwd");
  let rewBtn = document.getElementById("rew");
  fwdBtn.addEventListener("click", function (e) {
    forward(data);
  });
  rewBtn.addEventListener("click", function (e) {
    backward(data);
  });
}

function forward(sources) {
  const audioElmt = document.getElementById("audio-src");
  let srcOfAudio = audioElmt.getAttribute("src");
  srcOfAudio = srcOfAudio.slice(18);
  let audioThemeNumber = document.getElementById("audioThemeNumber");
  const index = sources.map((e) => e.src).indexOf(srcOfAudio);
  let extrait = document.getElementById("extrait-nb");
  if (index != sources.length - 1) {
    audioElmt.setAttribute("src", "./extraits_montes/" + sources[index + 1].src);
    audioThemeNumber.innerHTML = thematiques[sources[index + 1].title];
    extrait.innerHTML = (index + 2) + '/' + sources.length;
  } else {
    audioElmt.setAttribute("src", "./extraits_montes/" + sources[0].src);
    audioThemeNumber.innerHTML = thematiques[sources[0].title];
    extrait.innerHTML =  '1/' + sources.length;
  }
  //refresh src
  let audioLoad = document.getElementById("audio");
  audioLoad.load();
}
function backward(sources) {
  const audioElmt = document.getElementById("audio-src");
  let srcOfAudio = audioElmt.getAttribute("src");
  srcOfAudio = srcOfAudio.slice(18);
  let audioThemeNumber = document.getElementById("audioThemeNumber");
  const index = sources.map((e) => e.src).indexOf(srcOfAudio);
  let extrait = document.getElementById("extrait-nb");

  if (index != 0) {
    audioElmt.setAttribute("src", "./extraits_montes/" + sources[index - 1].src);
    audioThemeNumber.innerHTML = thematiques[sources[index - 1].title];
    extrait.innerHTML = (index) + '/' + sources.length;
  } else {
    audioElmt.setAttribute("src", "./extraits_montes/" + sources[sources.length - 1].src);
    audioThemeNumber.innerHTML = thematiques[sources[sources.length - 1].title];
    extrait.innerHTML = (sources.length) + '/' + sources.length;
  }
  //refresh src
  let audioLoad = document.getElementById("audio");
  audioLoad.load();
}

//THEMES AUDIO
async function getAudioTheme(id, personId) {
  //console.log("id: " + id);
  //console.log("person Id: " + personId);
  let response = await fetch("/theme/" + id + "/" + personId);
  let data = await response.text();
  audioBox.innerHTML = data;
  isAudioBoxShowed(true)
}
