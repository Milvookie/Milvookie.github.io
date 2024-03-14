//DOM ELEMENTS
const buttonNom = document.querySelector("#buttonName");
const buttonThemes = document.querySelector("#buttonThemes");
const buttonAvenir = document.querySelector("#buttonAvenir");
const searchNom = document.querySelector(".wrap-searchbar");
const searchThemes = document.querySelector(".container-themes");
const searchAvenir = document.querySelector(".search-avenir");

//remove button-active class
let buttons = document.querySelectorAll(".choix");
buttons.forEach((element) => element.classList.remove("button-active"));

//EVENTS
buttonNom.addEventListener("click", function (e) {
  displayName();
  isAudioBoxShowed(false);
  if (showAllGraph) {
  } else {
    d3.selectAll("svg > g > *").remove();
    showAllGraph = true;
    getD3Graph();
  }
});

buttonThemes.addEventListener("click", function (e) {
  displayThemes();
  isAudioBoxShowed(false);
  checkedAllCheckboxes(true);
  stopNodeAnimation();
  document.getElementById("form-result").innerHTML = "";
});

buttonAvenir.addEventListener("click", function (e) {
  stopNodeAnimation();
  displayAvenir();
  isAudioBoxShowed(false);
  document.getElementById("form-result").innerHTML = "";
  if (showAllGraph) {
    d3.selectAll("svg > g > *").remove();
    getD3Graph();
  } else {
    d3.selectAll("svg > g > *").remove();
    showAllGraph = true;
    getD3Graph();
  }
});

//FUNCTIONS
function buttonIsActive(button, bool) {
  if (bool) {
    button.classList.add("button-active");
  } else {
    button.classList.remove("button-active");
  }
}

function displayName() {
  //searchNom -> set display to block
  if (!showNom) {
    showNom = true;
    searchNom.style.display = "block";
    buttonIsActive(buttonNom, true);
  } else {
    showNom = false;
    searchNom.style.display = "none";
    buttonIsActive(buttonNom, false);
    document.getElementById("form-result").innerHTML = "";
  }
  //if showthemes or showavenir is true, set to false
  if (showThemes || showAvenir) {
    showThemes = false;
    searchThemes.style.display = "none";
    buttonIsActive(buttonThemes, false);
    showAvenir = false;
    searchAvenir.style.display = "none";
    buttonIsActive(buttonAvenir, false);
  }
}

function displayThemes() {
  if (!showThemes) {
    showThemes = true;
    searchThemes.style.display = "block";
    buttonIsActive(buttonThemes, true);
  } else {
    showThemes = false;
    searchThemes.style.display = "none";
    buttonIsActive(buttonThemes, false);
  }
  if (showNom || showAvenir) {
    showNom = false;
    searchNom.style.display = "none";
    buttonIsActive(buttonNom, false);
    showAvenir = false;
    searchAvenir.style.display = "none";
    buttonIsActive(buttonAvenir, false);
  }
}

function displayAvenir() {
  if (!showAvenir) {
    showAvenir = true;
    searchAvenir.style.display = "block";
    buttonIsActive(buttonAvenir, true);
    animateAllNodes();
  } else {
    showAvenir = false;
    searchAvenir.style.display = "none";
    buttonIsActive(buttonAvenir, false);
  }
  if (showThemes || showNom) {
    showThemes = false;
    searchThemes.style.display = "none";
    buttonIsActive(buttonThemes, false);
    showNom = false;
    searchNom.style.display = "none";
    buttonIsActive(buttonNom, false);
  }
}
