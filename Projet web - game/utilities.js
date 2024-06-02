// Fonction pour stimuler le lancement du dé
function LancerDe() {
  const valeur = 3; // La plage du lancer de dés (0, 1 ou 2)
  return Math.floor(Math.random() * valeur);
}

// Fonction pour lancer le dé selon un nombre donné de fois et additionner les résultats
function LanceDeFinal(nombre) {
  let Somme = 0;
  while (nombre !== 0) {
    Somme += LancerDe() + 1; // Ajouter 1 au résultat pour obtenir une plage de 1, 2 ou 3
    nombre--;
  }
  return Somme; // Retourner la somme totale des lancers de dés
}

// Fonction pour déplacer les guerriers sur le champ de bataille
function AvancerGuerrier () {
  // Déplacer les guerriers rouges vers l'avant
  for (let i = 1; i < 6; i++) {
    let currentContainer = document.getElementById(`container-${i}`);
    let nextContainer = document.getElementById(`container-${i - 1}`);
    let redWarriors = currentContainer.querySelectorAll(".carré.bleu [name='red'] .warrior");
    let blueWarriors = currentContainer.querySelectorAll(".carré.bleu [name='blue'] .warrior");

     // Déplacer les guerriers rouges vers le conteneur suivant s'il n'y a pas de guerriers bleus
    if (redWarriors.length > 0 && blueWarriors.length === 0) {
      redWarriors.forEach(warrior => {
        nextContainer.querySelector("[name='red']").appendChild(warrior);
      });
    }
  }

 // Déplacer les guerriers bleus vers l'arrière
  for (let i = 5; i >= 1; i--) {
    let currentContainer = document.getElementById(`container-${i}`);
    let nextContainer = document.getElementById(`container-${i + 1}`);
    let redWarriors = currentContainer.querySelectorAll(".carré.bleu [name='red'] .warrior");
    let blueWarriors = currentContainer.querySelectorAll(".carré.bleu [name='blue'] .warrior");

    // Déplacer les guerriers bleus vers le conteneur suivant s'il n'y a pas de guerriers rouge
    if (blueWarriors.length > 0 && redWarriors.length === 0) {
      blueWarriors.forEach(warrior => {
        nextContainer.querySelector("[name='blue']").appendChild(warrior);
      });
    }
  }
}

// Fonction pour afficher un message pendant une courte durée
function afficherMessage(message) {
  const messageDiv = document.getElementById('fight-message');
  messageDiv.style.display = 'block';
  messageDiv.textContent = message; // Définir le texte du message
  return new Promise(resolve => setTimeout(resolve, 1000)); // Afficher pendant 1 seconde
}

// Fonction pour vérifier s'il y a un combat entre les guerriers bleus et rouges
async function verifierCombat() {
  let blueIndices = [];
  let redIndices = [];

  for (let i = 1; i <= 5; i++) {
    let container = document.getElementById(`container-${i}`);
    let blueDiv = container.querySelector("[name='blue']");
    let redDiv = container.querySelector("[name='red']");

     // Vérifier si les guerriers bleus et rouges sont présents
    if (blueDiv.children.length > 0 && redDiv.children.length > 0) {
      chateauBleu.incrementerRessource(); // Increment resources for blue team
      chateauRouge.incrementerRessource(); // Increment resources for red team

      // Collecter les indices des guerriers bleus
      blueDiv.querySelectorAll(".warrior").forEach(warrior => {
        blueIndices.push(warrior.getAttribute("data-index"));
      });

      // Collecter les indices des guerriers rouges
      redDiv.querySelectorAll(".warrior").forEach(warrior => {
        redIndices.push(warrior.getAttribute("data-index"));
      });

      // Les guerriers bleus attaquent les guerriers rouges
      for (let i = 0; i < blueIndices.length; i++) {
        if (redIndices.length !== 0) {
          let guerrierrecu = chateauRouge.worriorinfield[redIndices[0]];
          let guerrierfrape = chateauBleu.worriorinfield[blueIndices[i]];
          guerrierfrape.attaquer(guerrierrecu); // Le guerrier bleu attaque le guerrier rouge
          console.log(guerrierrecu.pointsDeVie); // Afficher sur le console les points de vie restants du guerrier rouge
          await afficherMessage(`${guerrierfrape.type} attacks ${guerrierrecu.type}`); // Afficher le message d'attaque
          if (guerrierrecu.estMort()) { // Si le guerrier rouge est mort
            let redWarrior = redDiv.querySelector(`.warrior[data-index="${redIndices[0]}"]`);
            if (redWarrior) {
              redWarrior.remove(); // Retirer le guerrier mort du champ de bataille
            }
            redIndices.shift(); // Retirer l'indice du guerrier mort
          }
        }
      }

      // Red warriors attack blue warriors
      for (let i = 0; i < redIndices.length; i++) {
        if (blueIndices.length !== 0) {
          let guerrierrecu = chateauBleu.worriorinfield[blueIndices[0]];
          let guerrierfrape = chateauRouge.worriorinfield[redIndices[i]];
          guerrierfrape.attaquer(guerrierrecu); // Le guerrier rouge attaque le guerrier bleu
          await afficherMessage(`${guerrierfrape.type} attacks ${guerrierrecu.type}`); // Afficher le message d'attaque
          if (guerrierrecu.estMort()) {// Si le guerrier bleu est mort
            let blueWarrior = blueDiv.querySelector(`.warrior[data-index="${blueIndices[0]}"]`);
            if (blueWarrior) {
              blueWarrior.remove(); // Retirer le guerrier mort du champ de bataille
            }
            blueIndices.shift(); // Retirer l'indice du guerrier mort
          }
        }
      }
      await afficherMessage(` FIGHT END `); // Afficher le message de fin du bataille
    }
  }
}

// Fonction pour afficher la liste d'attente des guerriers
function afficherListeAttente() {
  var waitB = document.getElementById('listB');
  var waitR = document.getElementById('listR');
  if (chateauBleu.warriors.length >= 0) {
    let warriorsList = '<p id="listeBleu" style="color:white; font-family: \'Poetsen One\'; font-size: 30px;"> Queue for Blue :</p><ul id="bleuwaitinglist" style="color:white; font-family: \'Poetsen One\'; font-size: 20px;">';

    chateauBleu.warriors.forEach(warrior => {
      warriorsList += `<li> ${warrior.constructor.name}</li>`;
    });
    warriorsList += '</ul>';
    waitB.innerHTML = warriorsList; // Afficher la liste d'attente des guerriers bleus
  }
  if (chateauRouge.warriors.length >= 0) {
    let warriorsList = '<p id="listeRouge" style="color:white; font-family: \'Poetsen One\'; font-size: 30px;"> Queue for Red :</p><ul id="redwaitinglist" style="color:white; font-family: \'Poetsen One\'; font-size: 20px;">';

    chateauRouge.warriors.forEach(warrior => {
      warriorsList += `<li> ${warrior.constructor.name}</li>`;
    });
    warriorsList += '</ul>';
    waitR.innerHTML = warriorsList; // Afficher la liste d'attente des guerriers rouges
  }
}

// Fonction pour détermniner le gagnant 
function ganger() {
  let color = "black"; // Couleur par défaut indiquant qu'il n'y a pas encore de gagnant
  let containerbl = document.getElementById(`container-5`);
  let blueDiv = containerbl.querySelector("[name='blue']");
  let redDiv = containerbl.querySelector("[name='red']");
  let containerble = document.getElementById(`container-1`);
  let blueDiv1 = containerble.querySelector("[name='blue']");
  let redDiv1 = containerble.querySelector("[name='red']");
  if (blueDiv.children.length > 0 && redDiv.children.length == 0) {
    color = "blue"; // L'équipe bleu gagne
  }
  if (blueDiv1.children.length == 0 && redDiv1.children.length > 0) {
    color = "red"; // L'équipe rouge gagne
  }
  return color; //Retourner la couleur de l'equipe gagnante
}
