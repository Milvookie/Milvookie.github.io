
//getD3Graph();
//DOM ELEMENT
const searchSection = document.querySelector(".section-resultats");
const circles = document.querySelectorAll("circle");
main.addEventListener("click", function (e) {
  if (showpopup) {
    closepopup();
  }
  //audioLoad = document.getElementById("audio")
  if (e.target.nodeName == "svg" || e.target.className == "section-resultats") {
    isAudioBoxShowed(false);
  } else {
    //
  }
});

//POP UP
function blurBody(bool) {
  let blurHeader = document.getElementById('nav');
  let blurSearchContainer = document.getElementsByClassName('search-container');
  let blurSvg = document.getElementsByClassName('graph-edilim');
  if(bool) {
    blurHeader.classList.add('blur-filter');
    blurSearchContainer.item(0).classList.add('blur-filter');
    blurSvg.item(0).classList.add('blur-filter');
  } else {
    blurHeader.classList.remove('blur-filter');
    blurSearchContainer.item(0).classList.remove('blur-filter');
    blurSvg.item(0).classList.remove('blur-filter');
  }
  
}



let showpopup = false;
let popup = document.getElementById("pop-up");

let close_popup = document.getElementById("close-popup");
close_popup.addEventListener("click", closepopup());

function openpopup() {
  setTimeout(function () {
    popup.style.display = "block";
    popup.className = "scale-in-center";
    showpopup = true;
    blurBody(true);
  }, 1500);
}

openpopup();

function closepopup() {
  popup.className = "scale-out-center";
  showpopup = false;
  popup.style.display = "none";
  blurBody(false);
}


// BOUTONS PARTICIPANTS - THEMES - AVENIR
let showNom = false;
let showThemes = true;
let showAvenir = false;
let showAudioBox = false;

//Is graph display
let showAllGraph = true;

createGraph()