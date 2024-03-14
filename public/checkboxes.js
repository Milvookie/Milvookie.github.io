//CHECKBOX

const checkboxes = document.querySelectorAll(".legende div");
let label = document.querySelectorAll(".legende div span"); //node list
let isAllCheck = true
checkedAllCheckboxes(true);


function checkedAllCheckboxes(bool) {
  let label = document.querySelectorAll(".legende div span");
  if (bool) {
    label.forEach((element) => element.classList.add("checkmark-active"));
  } else {
    label.forEach((element) => element.classList.remove("checkmark-active"));
  }
  isAllCheck = bool
}

function checkedSingleCheckbox(bool, checkbox) {
  let attribute = checkbox.parentElement;
  let childSpan = attribute.childNodes[1];
  if (bool) {
    childSpan.classList.add("checkmark-active");
  }
}

checkboxes.forEach((element) =>
  element.addEventListener("click", function (e) {
    e.preventDefault()
    let elementInput = element.children[1]
    if (showAudioBox) {
      isAudioBoxShowed(false);
    }
    //add class to checkmark
    if (elementInput.id == "all") {
      d3.selectAll("svg > g > *").remove();
      if (isAllCheck) {
        checkedAllCheckboxes(false);
      } else {
        checkedAllCheckboxes(true);
        //getD3Graph()
        createGraph()
      }
    } else if (elementInput.id == "avenir") {
      d3.selectAll("svg > g > *").remove()
      checkedAllCheckboxes(false);
      checkedSingleCheckbox(true, elementInput);
      //getD3Graph()
      createGraph()
    } else {
      checkedAllCheckboxes(false);
      checkedSingleCheckbox(true, elementInput);
      //
      let themeId = parseInt(elementInput.id, 10) + 1;
      //console.log("fetch id: " + themeId);
      if (themeId == 13 || themeId == "13") {
        console.log("avenir");
        d3.selectAll("svg > g > *").remove();
        showAllGraph = false;
        showAvenir = true;
                //getD3Graph()
                createGraph()
      } else {
        d3.selectAll("svg > g > *").remove();
        fetch("/theme/" + themeId + "/participants")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("checkboxes file");
          console.log(data);
          //showAllGraph = false;
          //getModifiedD3Graph(data, themeId);
          createGraph(data);
        });
      }

    }
  })
);
