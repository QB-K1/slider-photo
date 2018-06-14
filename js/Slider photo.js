'use strict';   // Mode strict du JavaScript

//---------------------------------------------------------------------------------------
//---------------------Fonction pour afficher ou cacher toolbar---------------------------------
//---------------------------------------------------------------------------------------


//le contenu de la variable "hide" va chercher les éléments de la classe 'hide' dans le HTML
var hide = document.querySelector('.hide');

function hideNav() {
	// ajoute et retire à chaque itération la classe "hide" (définie dans le CSS) à l'élément de classe "hide", donc se retire lui-même
	hide.classList.toggle('hide');
}

//voir lancement events en bas


//---------------------------------------------------------------------------------------
//--------------------------Code pour actions des boutons---------------------------------
//---------------------------------------------------------------------------------------


//---------------------Création tableau avec images et descriptions---------------------------------


// Création d'un tableau d'objets qui correspondent aux images et leurs descriptions
var state = [{src:"images/1.jpg", legend:"image1"}, {src:"images/2.jpg", legend:"image2"}, {src:"images/3.jpg", legend:"image3"}, {src:"images/4.jpg", legend:"image4"}, {src:"images/5.jpg", legend:"image5"}, {src:"images/6.jpg", legend:"image6"}];

// Création d'une propriété index pour l'objet tableau qui est initialisée à 0
state.index = 0;

// Création d'une propriété timer pour l'objet tableau qui est nulle de base
state.timer = null; // sert à regarder si diapo allumée ou éteinte



//----------------------Fonction refresh pour recharger image---------------------------------


// Création de fonction refresh pour recharger une nouvelle image quand une action est lancée
function refresh() {
	// Variable qui sélectionne les éléments img enfant de la class slider (images)
	var img = document.querySelector('#slider img');

	// Variable qui sélectionne les éléments figcaption enfant de la class slider (légendes des images)
	var legend = document.querySelector('#slider figcaption');

	// fonction précodée variable.src pour changer source de la variable à la main, ici change par source correspondant à l'index en cours
	img.src=state[state.index].src;

	// fonction précodée variable.src pour changer contenu texte de la variable à la main, ici change par légende d'images correspondant à l'index en cours
	legend.textContent=state[state.index].legend;
}




//----------------------Fonction next pour image suivante---------------------------------


// Création de fonction next pour action sur bouton image suivante
function next() {
	state.index++; // incrémente index
	if (state.index>= state.length) { // cas où index atteint fin du tableau
		state.index=0; // reset index pour repartir sur le début du tableau
	}
	refresh(); // lance fonction refresh pour changer source de l'image qui s'affichera
}

//voir lancement events en bas



//----------------------Fonction previous pour image suivante---------------------------------


// Création de fonction previous pour action sur bouton image précédente
function previous() {
	state.index--; // décrémente index
	if (state.index< 0) { // cas où index est négatif, donc si dépasse début du tableau 
		state.index= state.length-1; // reset index pour repartir sur la longueur du tableau -1 pour aller en sens inverse
	}
	refresh(); // lance fonction refresh pour changer source de l'image qui s'affichera
}

//voir lancement events en bas



//----------------------Fonction pour sortir une image random---------------------------------


function random() {

	var indexRandom; //déclare index random qui correspond à valeur qui va sortir en local dans la fonction random
	
	//change valeur de l'index du tableau des images pour sortir nombre random entre 0 et max tableau
	do {
    	indexRandom = getRandomInteger(0, state.length-1);
    } while(indexRandom == state.index); // tant que index actuel est différent de index choisi ici, pour éviter que ressorte même image d'affile

    state.index = indexRandom; // index slider prends valeur de index que fonction random nous a sorti car lui passe pour l'afficher avec refresh

	refresh(); // lance fonction refresh pour changer source de l'image qui s'affichera
}

//voir lancement events en bas



//----------------------Fonction pour lecture en diaporama---------------------------------


function play() {
	// déclare variable icon qui va correspondre aux éléments HTML i enfant de l'id slider-toggle
	var icon = document.querySelector('#slider-toggle i');

	// va leur donner ou enlever la class 'fa-play' et la class 'fa-pause' ce qui correspond à leur mettre soit le SVG bouton play soit bouton pause
	icon.classList.toggle('fa-play');
    icon.classList.toggle('fa-pause');

    if(state.timer == null) { //si propriété timer du tableau est null (diapo éteinte)
    	// stocke dans propriété state.timer de l'objet tableau l'instruction de lancer la fonction next toutes les 2 secondes
        state.timer = window.setInterval(next, 2000);
    
    } else {
        window.clearInterval(state.timer); // sinon annule le délai lancé dans state.timer
        state.timer = null; // et remet valeur de state.timer sur null 
    }
}



//------------------Fonction pour associer fonctions aux keyCodes---------------------------------------------


function keyCodes(event) { 
	switch (event.keyCode) {
		case 32:  // si presse touche espace
    		play(); // lance fonction diapo 
		break;
    	case 82:  // si presse touche r
			random(); // lance fonction random 
    	break;
    	case 39:  // si presse touche flèche droite
			next(); // lance fonction diapo suivante
    	break;
    	case 37:  // si presse touche flèche gaucher
			previous(); // lance fonction diapo  précédente
    	break;
		default: // si rien n'a matché 
			console.log(event.keyCode); // affiche touche pressée en console.log
		break;
	}
}

// event listener sur toute la page (window) qui surveille event 'keyup' (relâcher une touche) et lance fonction keyCodes
window.addEventListener('keyup', keyCodes);



//--------------------------Lancement fonction principale---------------------------------------------

refresh();


//------------------------------Lancement des events---------------------------------------------

installEventHandler('#toolbar-toggle', 'click', hideNav);
// equivalent de 
	// var toolbarToggle = document.getElementById('toolbar-toggle'); --- le contenu de la variable "toolbarToggle" va chercher les éléments dont l'id 'toolbar-toggle' dans le HTML
	// toolbarToggle.addEventListener('click', hideNav);  --- quand clique sur élément correspondant à toolbarToggle appelle fonction "cache" sur élément contenu dans variable toolbarToggle


installEventHandler('#slider-next', 'click', next);
// equivalent de 
	// var nextButton = document.getElementById('slider-next'); --- le contenu de la variable "nextButton" va chercher les éléments dont l'id 'slider-next' dans le HTML
	// nextButton.addEventListener('click', next); --- quand clique sur élément correspondant à nextButton appelle fonction "next" sur élément contenu dans variable nextButton


installEventHandler('#slider-previous', 'click', previous);
// equivalent de 
	// var prevButton = document.getElementById('slider-previous'); --- le contenu de la variable "prevButton" va chercher les éléments dont l'id 'slider-previous' dans le HTML
	// prevButton.addEventListener('click', previous); --- quand clique sur élément correspondant à prevButton appelle fonction "previous" sur élément contenu dans variable prevButton


installEventHandler('#slider-random', 'click', random);
// equivalent de 
	// var randomButton = document.getElementById('slider-random'); --- le contenu de la variable "randomButton" va chercher les éléments dont l'id 'slider-random' dans le HTML
	// randomButton.addEventListener('click', random); --- quand clique sur élément correspondant à randomButton appelle fonction "random" sur élément contenu dans variable randomButton

installEventHandler('#slider-toggle', 'click', play);
// equivalent de 
	// var playButton = document.getElementById('slider-toggle'); --- le contenu de la variable "playButton" va chercher les éléments dont l'id 'slider-toggle' dans le HTML
	// playButton.addEventListener('click', play); --- quand clique sur élément correspondant à playButton appelle fonction "play" sur élément contenu dans variable playButton
