// Alle javascript is gemaakt binnen de les of gegeven door Sanne! (ik begrijp het niet helemaal).
var openButton = document.querySelector("header > button");
openButton.addEventListener("click", openMenu);

function openMenu() {
  var deNav = document.querySelector("nav");
  deNav.classList.add("toonMenu");
}



var sluitButton = document.querySelector("nav button");
sluitButton.addEventListener("click", sluitMenu);

function sluitMenu() {
  var deNav = document.querySelector("nav");
  deNav.classList.remove("toonMenu");
}

window.addEventListener("keydown", handleKeydown);
function handleKeydown(event) {
  if (event.key == "Escape") {
    var deNav = document.querySelector("nav");
    deNav.classList.remove("toonMenu");
  }
}

let deMenuButtons = document.querySelectorAll("footer section > button");
let deMenuH3s = document.querySelectorAll("footer section > h3");

deMenuButtons.forEach(deMenuButton => {
  deMenuButton.addEventListener("click", toggleMenu);
});

deMenuH3s.forEach(deMenuH3 => {
  deMenuH3.addEventListener("click", toggleMenu);
});

function toggleMenu() {
  let deButtonWaaropGekliktIs = this;
  let deSectionWaarDeButtonInZit = deButtonWaaropGekliktIs.closest("section");
  deSectionWaarDeButtonInZit.classList.toggle("open");
}