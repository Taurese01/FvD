// JavaScript Document
console.log("hi");

function createCaroCarrousel(carrouselID) {
	let carrousel = document.querySelector("#"+carrouselID);
  let carrouselElementsContainer = carrousel.querySelector(":scope > ul");
	let carrouselElements = carrouselElementsContainer.querySelectorAll("li");
  let bolletjes = carrousel.querySelectorAll(":scope > nav a");
  let linkButtons = carrousel.querySelectorAll(":scope > a");
	
  
  /****************/
	/* DE BOLLETJES */
	/****************/
  
  // de bolletjes activeren
  function iniBolletjes() {
    for (bolletje of bolletjes) {
			// elk bolletje laten luisteren naar kliks
      bolletje.addEventListener("click", function(e){
				// als er geklikt wordt
        
				// de default-actie (de link volgen) niet uitvoeren
				e.preventDefault();

				// het nieuwe element opzoeken
				let newElement = carrousel.querySelector(this.hash);
        
        // dan naar het element met ID scrollen
        scrollToElement(newElement);
      });
    }
	}
  
  
  /**********/
	/* SWIPEN */
	/**********/
  
  // werkt op touch devices (is te simuleren in de inspector)
	function iniSwipen() {
		let touchstartX = 0;
		let touchendX = 0;
    let touchstartY = 0;
		let touchendY = 0;
    
    // het begin van de swipe
		carrousel.addEventListener('touchstart', function(e) {
      // vastleggen waar de swipe is begonnen
			touchstartX = e.changedTouches[0].screenX;
			touchstartY = e.changedTouches[0].screenY;
		}, false);
    
    // het einde van de swipe
		carrousel.addEventListener('touchend', function(e) {
      // vastleggen waar de swipe is geeindigd
			touchendX = e.changedTouches[0].screenX;
			touchendY = e.changedTouches[0].screenY;
      // dan berekenen of en in welke richting
			handleGesture();
		}, false); 
    
    // berekenen of en in welke richting
		function handleGesture() {
      // de afgelegde afstand in X- en Y-richting bepalen
			let deltaX = touchendX - touchstartX;
			let deltaY = touchendY - touchstartY;
      
      // er is geswiped als de deltaX 5x zo groot is als deltaY
      // dat betekent een redelijk horizontale swipe
			if ( Math.abs(deltaX) > (Math.abs(deltaY) * 5) ) {
        // dan moet de afgelegde afstand ook nog groter zijn dan 30px
        // als de afstand positoef is dan is van links naar rechts geswiped
				if (deltaX > 30) {
					goToElement("previous");
				}
        // als de afstand negatief is dan is van rechts naar links geswiped
				else if (deltaX < -30) {
					goToElement("next");
				}
			}
		}
	}
  
  
  /*****************/
	/* START POSITIE */
	/*****************/
  
	// het eerste element en bolletje actief maaken
  function iniStartPosition() {
    // eerste element current maken
    carrouselElements[0].classList.add("current");
    // eerste bolletje current maken
		bolletjes[0].classList.add("current");
		// aan het begin van de container starten
    carrouselElementsContainer.scrollLeft = 0;
  }
  
  
  /*********************/
	/* ALGEMENE FUNCTIES */
	/*********************/
  
  //////////////////////////////////
  // naar volgende/vorige element //
  function goToElement(direction) {
    
		// het huidige current element opzoeken
		let currentElement = carrousel.querySelector(":scope > ul > .current");

		let newElement;
		if (direction == "previous") {
			// het nieuwe element is het vorige broertje/zusje
			newElement = currentElement.previousElementSibling;
			// checken of nieuwe element bestaat - anders naar laatste
			if (!newElement) {
				newElement = carrousel.querySelector(":scope > ul > li:last-of-type");
			}
		} else {
			// het nieuwe element is het volgende broertje/zusje
			newElement = currentElement.nextElementSibling;
			// checken of nieuwe element bestaat - anders naar eerste
			if (!newElement) {
				newElement = carrousel.querySelector(":scope > ul > li:first-of-type");
			}
		}
    
		// naar het nieuwe element scrollen
		scrollToElement(newElement);
  }
  
  
  ///////////////////////////
  // scroll to new element //
  function scrollToElement(newElement) {
    // carousel container opzoeken
    let carouselElementsContainer = newElement.closest("ul");

		// de linker offset van het nieuwe element bepalen 
		let newElementOffset = newElement.offsetLeft;
		
		// de carousel naar de berekende positie scrollen
		carouselElementsContainer.scrollTo({
			left: newElementOffset
		});
    
    // nieuwe element current element maken
    updateCurrentElement(newElement);

    // de bolletjes updaten
    updateBolletjes(newElement);
  }
  
  
  ////////////////////////////
	// update current element //
	function updateCurrentElement(newElement) {
		// het huidige current element opzoeken
		let currentElement = carrousel.querySelector(":scope > ul > .current");
		// de class current verwijderen
		currentElement.classList.remove("current");

		// aan nieuwe element de class current toevoegen
		newElement.classList.add("current");
	}

  
  //////////////////////
  // update bolletjes //
  function updateBolletjes(newElement){
		// het huidige current bolletje opzoeken
		let currentBolletje = carrousel.querySelector(":scope > nav .current");
		// de class current verwijderen
		currentBolletje.classList.remove("current");
		
		// het nieuwe bolletje opzoeken
    let newBolletje = carrousel.querySelector("a[href='#"+newElement.id+"']");
		// de class current toevoegen
		newBolletje.classList.add("current");
  }

  
	// de bolletjes activeren
  iniBolletjes();	
  // swipen activeren 
  iniSwipen();	
  // de carrousel bij het begin starten
  iniStartPosition();
}


/************************/
/* DE CARROUSEL CREËREN */
/************************/

// nadat de pagina geladen is, de carrousels activeren
(function() {
  // hier de id gebruiken van de section in de html
  createCaroCarrousel("bolletjesAndSwipen");
  //je kunt hier ook meerdere carrousellen activeren
})();