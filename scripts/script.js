// JavaScript Document
// Alle javascript is gemaakt binnen de les of gegeven door Sanne! (ik begrijp het niet helemaal).
function createCaroCarrousel(carrouselID) {
	let carrousel = document.querySelector("#" + carrouselID);
	let carrouselElementsContainer = carrousel.querySelector(":scope > ul");
	let carrouselElements = carrouselElementsContainer.querySelectorAll("li");
	let bolletjes = carrousel.querySelectorAll(":scope > nav a");
	let linkButtons = carrousel.querySelectorAll(":scope > a");


	/* DE BOLLETJES */

	function iniBolletjes() {
		for (bolletje of bolletjes) {
			bolletje.addEventListener("click", function (e) {

				e.preventDefault();

				let newElement = carrousel.querySelector(this.hash);

				scrollToElement(newElement);
			});
		}
	}


	/* SWIPEN */

	function iniSwipen() {
		let touchstartX = 0;
		let touchendX = 0;
		let touchstartY = 0;
		let touchendY = 0;

		carrousel.addEventListener('touchstart', function (e) {
			touchstartX = e.changedTouches[0].screenX;
			touchstartY = e.changedTouches[0].screenY;
		}, false);

		carrousel.addEventListener('touchend', function (e) {
			touchendX = e.changedTouches[0].screenX;
			touchendY = e.changedTouches[0].screenY;
			handleGesture();
		}, false);

		function handleGesture() {
			let deltaX = touchendX - touchstartX;
			let deltaY = touchendY - touchstartY;

			if (Math.abs(deltaX) > (Math.abs(deltaY) * 5)) {
				if (deltaX > 30) {
					goToElement("previous");
				} else if (deltaX < -30) {
					goToElement("next");
				}
			}
		}
	}


	/* START POSITIE */

	function iniStartPosition() {
		carrouselElements[0].classList.add("current");
		bolletjes[0].classList.add("current");
		carrouselElementsContainer.scrollLeft = 0;
	}


	/* ALGEMENE FUNCTIES */

	// naar volgende/vorige element //
	function goToElement(direction) {

		let currentElement = carrousel.querySelector(":scope > ul > .current");

		let newElement;
		if (direction == "previous") {
			newElement = currentElement.previousElementSibling;
			if (!newElement) {
				newElement = carrousel.querySelector(":scope > ul > li:last-of-type");
			}
		} else {
			newElement = currentElement.nextElementSibling;
			if (!newElement) {
				newElement = carrousel.querySelector(":scope > ul > li:first-of-type");
			}
		}

		scrollToElement(newElement);
	}


	function scrollToElement(newElement) {
		let carouselElementsContainer = newElement.closest("ul");

		let newElementOffset = newElement.offsetLeft;

		carouselElementsContainer.scrollTo({
			left: newElementOffset
		});

		updateCurrentElement(newElement);

		updateBolletjes(newElement);
	}


	function updateCurrentElement(newElement) {
		let currentElement = carrousel.querySelector(":scope > ul > .current");
		currentElement.classList.remove("current");

		newElement.classList.add("current");
	}

	//   update bolletjes
	function updateBolletjes(newElement) {
		let currentBolletje = carrousel.querySelector(":scope > nav .current");
		currentBolletje.classList.remove("current");
		let newBolletje = carrousel.querySelector("a[href='#" + newElement.id + "']");
		newBolletje.classList.add("current");
	}


	iniBolletjes();
	iniSwipen();
	iniStartPosition();
}


/* DE CARROUSEL CREËREN */

(function () {
	createCaroCarrousel("bolletjesAndSwipen");
})();




/* menu openen de MENU button */

var openButton = document.querySelector("header > button");
openButton.addEventListener("click", openMenu);

function openMenu() {
	var deNav = document.querySelector("nav");
	deNav.classList.add("toonMenu");
}




/* menu sluiten met de sluit button */

var sluitButton = document.querySelector("nav button");

sluitButton.addEventListener("click", sluitMenu);

function sluitMenu() {
	var deNav = document.querySelector("nav");
	deNav.classList.remove("toonMenu");
}




/* bonus: menu sluiten met escape */
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