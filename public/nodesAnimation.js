function animateNode(index) {
  let nodeToanimate = document.querySelector(`g[index="${index}"] circle`);
  nodeToanimate.classList.add("blink");
}

function animateAllNodes() {
  let circle = document.getElementsByTagName("circle");
  for (let item of circle) {
    item.classList.add("blink");
    setTimeout(() => {
      stopNodeAnimation();
    }, 4000);
  }
}

function stopNodeAnimation() {
  let circle = document.getElementsByTagName("circle");
  for (let item of circle) {
    item.classList.remove("blink");
  }
}
