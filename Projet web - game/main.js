// Créer deux instances de la classe Chateau pour les équipes bleue et rouge
var chateauBleu = new Chateau('blue');
var chateauRouge = new Chateau('red');

// Fonction pour gérer l'événement de clic sur le bouton d'entraienemnt selon l'équipe spécifiée
function handleTrainButtonClick(team) {
  return () => {
    let chateau = team === 'blue' ? chateauBleu : chateauRouge;
    chateau.EnregistrerGuerriers(team); // Enregistrer les guerrier de l'équipe spécifiée 
    afficherListeAttente(); // Mettre à jour l'affichage de la liste d'attente
  };
}

// Écouteur d'événement pour DOMContentLoaded afin de configurer les gestionnaires d'événements de boutons initiaux
document.addEventListener("DOMContentLoaded", function () {
  const trainButtonBlue = document.getElementById('trainButton');
  if (trainButtonBlue) {
    trainButtonBlue.addEventListener('click', handleTrainButtonClick('blue'));  // Écouteur d'événement pour le bouton d'entrainement des  bleu
  }
  const trainButtonRed = document.getElementById('red-trainButton');
  if (trainButtonRed) {
    trainButtonRed.addEventListener('click', handleTrainButtonClick('red')); // Écouteur d'événement pour le bouton d'entrainement des rouge
  }
});

// Another event listener for DOMContentLoaded to handle the start tour button
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startTourButton').addEventListener('click', () => {
    verifierCombat(); // Vérifier les combats entre les guerriers
    AvancerGuerrier (); // Déplacer les unités sur le champ de bataille
    chateauBleu.sortirListAttente(); // Entrainner les guerriers bleus
    chateauRouge.sortirListAttente(); // Entrainner les guerriers rouges
    afficherListeAttente(); // Mettre à jour l'affichage de la liste d'attente
    let color = ganger(); // Verifier le gagnant 
    if (color !== "black") {
      let message = `${color} win`;
      let alertBox = document.createElement("div"); // Créer un élément div pour afficher le message du gagnant
      alertBox.textContent = message;
      alertBox.style.padding = "40px";
      alertBox.style.color = color === "blue" ? "blue" : "red";
      alertBox.style.background = "linear-gradient(to bottom right, rgba(209, 34, 34, 0.6), rgba(1, 31, 66, 0.6))";
      alertBox.style.color = "#fff";
      alertBox.style.border = "none";
      alertBox.style.borderRadius = "5px";
      alertBox.style.fontFamily = "'Poetsen One', sans-serif";
      alertBox.style.fontSize = "30px"; // Augmentation de la taille de la police à 30px
      alertBox.style.border = "1px solid black";
      alertBox.style.position = "fixed";
      alertBox.style.top = "10%";
      alertBox.style.left = "50%";
      alertBox.style.transform = "translate(-50%, -50%)";
      alertBox.style.zIndex = "9999";
      document.body.appendChild(alertBox); // Ajouter la boîte d'alerte au corps de la page
    }
  });
});
