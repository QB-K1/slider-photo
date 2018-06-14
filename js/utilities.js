'use strict';   // Mode strict du JavaScript


//---------------------Fonction pour envoyer chiffre entier random---------------------------------

function getRandomInteger(min, max)
{
    /*arrondi au chiffre entier du dessous le random et le multiplie par un nombre
     qui va donner un résultat compris entre min et max*/
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



//---Fonction pour lancement event générique au lieu de les rappeler à chaque fois--------------------------------


function installEventHandler(selector, type, eventHandler) {
	var domObject; //variable qui correspond à l'objet sur lequel les events s'appliquent
    
   	domObject = document.querySelector(selector); //event pour sélectionner un élément en fonction de son type
  
	domObject.addEventListener(type, eventHandler); //listener classique 
}



//----------------Fonction pour récupérer un keyCode en console log---------------------------------


function getKeyCode (event) {

	// fonction précodée event.keyCode va donner touche pressée
	console.log(event.keyCode); // ici la retourne en console.log

}
