document.addEventListener("DOMContentLoaded", function () {
  var startButton = document.getElementById("startButton"); // Bouton de démarrage pour initier le jeu
  var startTourButton = document.getElementById("startTourButton"); // Bouton pour démarrer les tours de jeu
  var audio = document.getElementById("soundtrack"); // Background soundtrack
  var plateau = document.querySelector(".plateau"); // Élément du plateau de jeu
  var blueButton = document.getElementById("BlueButton"); // Bouton pour l'équipe bleue
  var redButton = document.getElementById("RedButton"); // Bouton pour l'équipe rouge
  var trainBlueButton = document.getElementById("trainButton"); // Bouton pour entraîner les guerriers bleus
  var trainRedButton = document.getElementById("red-trainButton"); // Bouton pour entraîner les guerriers rouges
  const soundButton = document.getElementById('CutSound'); // Bouton pour activer/désactiver le soundtrack
  var automatic = document.getElementById("Moveworriors_auto"); // Bouton pour automatiser le mouvement des guerriers

  // Écouteur d'événements pour démarrer le tour automatique
  automatic.addEventListener('click', () => {
    function startTour() {
      verifierCombat(); // Vérifier les combats entre les guerriers
      AvancerGuerrier (); // Déplacer les guerriers sur le plateau
      chateauBleu.sortirListAttente(); // Entraîner les guerriers bleus
      chateauRouge.sortirListAttente(); // Entraîner les guerriers rouges
      afficherListeAttente(); // Afficher la liste d'attente des guerriers
      let color = ganger(); // // Vérifier s'il y a un gagnant 
      if (color !== "black") {
        alert(`${color} win`); //Annoncer le gagnant 
        clearInterval(tourInterval); // Arrêter l'intervalle s'il y a un gagnant 
      }
    }
   // Définir l'intervalle pour s'exécuter toutes les 2 secondes (2000 millisecondes)
    const tourInterval = setInterval(startTour, 2000);
  });

  // Écouteur d'événements pour activer/désactiver le son 
  soundButton.addEventListener('click', function () {
    soundtrack.muted = !soundtrack.muted;
  });

  // Fonction pour démarrer le jeu
  function startGame() {
    audio.play(); // Lancer le son
    startButton.style.display = "none"; // Masquer le bouton de démarrage
    startTourButton.style.display = "block"; // Afficher le bouton de démarrage des tours
    plateau.style.display = "block"; // Afficher le plateau de jeu
    blueButton.style.display = "block"; // Afficher le bouton de l'équipe bleue
    redButton.style.display = "block"; // Afficher le bouton de l'équipe rouge
    trainBlueButton.style.display = "block"; // Afficher le bouton d'entraînement de l'équipe bleue
    trainRedButton.style.display = "block"; // Afficher le bouton d'entraînement de l'équipe rouge
    automatic.style.display = "block"; // Afficher le bouton de déplacement automatique
  }

  // Écouteur d'événements pourle bouton de démarrage
  startButton.addEventListener("click", startGame);
});

//*********************************************************** */
// Fonction pour afficher la fenêtre modale (menu de l'équipe bleue)
function afficherMenu() {
  var modal = document.getElementById("menu");
  modal.style.display = "block"; // Afficher le menu de l'équipe bleue
}

// Fonction pour fermer la fenêtre modale (menu de l'équipe bleue)
function fermerMenu() {
  var modal = document.getElementById("menu");
  modal.style.display = "none"; // Masquer le menu de l'équipe bleue
}

// Fonction pour afficher la fenêtre modale (menu de l'équipe rouge)
function afficherRedMenu() {
  var modal = document.getElementById("red-menu");
  modal.style.display = "block"; // Afficher le menu de l'équipe rouge
}

// Fonction pour fermer la fenêtre modale (menu de l'équipe rouge)
function fermeRedMenu() {
  var modal = document.getElementById("red-menu");
  modal.style.display = "none"; // Masquer le menu de l'équipe rouge
}
/********************************************************/

// Associer la fonction d'affichage à l'événement de chargement de la fenêtre
window.onload = function () {
   // Associer le bouton de l'équipe bleue avec la fonction d'affichage
  document.getElementById("BlueButton").onclick = afficherMenu; // Bouton pour ouvrir la liste de choix de l'équipe bleue
  document.querySelector(".close").onclick = fermerMenu; // Fermer la liste de choix bleue
    // Fonction pour entrainner l'équipe bleue
  document.getElementById("trainButton").onclick = fermerMenu; // Bouton d'entrainement pour la liste bleue

  /*************************************************/
  // Associer le bouton de l'équipe rouge avec la fonction d'affichage
  document.getElementById("RedButton").onclick = afficherRedMenu; // Bouton pour ouvrir la liste de choix de l'équipe rouge
  document.querySelector(".red-close").onclick = fermeRedMenu; // Fermer la liste de choix rouge
  // Fonction pour entrainner l'équipe rouge
  document.getElementById("red-trainButton").onclick = fermeRedMenu; // Bouton d'entrainement pour la liste rouge

  /****************************************************/
}
