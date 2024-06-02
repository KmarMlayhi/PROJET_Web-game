class Chateau {
    constructor(team) {
        this.warriors = []; // Liste des worriors/guerriers selectionés 
        this.team = team;
        this.resources = 3; // Intialisation des ressources 
        this.worriorinfield = []; // Liste des worriors/guerriers entrainés 
    }

    // Méthode pour enregistrer les worriors/guerriers selectionnés 
    EnregistrerGuerriers() {
        let selects;
        // Déterminer quelle equipe de guerriers est selectionnées 
        if (this.team === 'blue') {
            selects = document.querySelectorAll('.blue-warrior');
        } else if (this.team === 'red') {
            selects = document.querySelectorAll('.red-warrior');
        } else {
            console.error('Unrecognized team');
            return;
        }

        // Parcourir les éléments sélectionnés et créer les objets guerriers correspondants, et les mettre dans la liste : this.warriors
        selects.forEach(select => {
            let warrior;
            switch (select.value) {
                case 'Nain':
                    warrior = new Nain();
                    this.warriors.push(warrior);
                    break;
                case 'Elfe':
                    warrior = new Elfe();
                    this.warriors.push(warrior);
                    break;
                case 'Chef Nain':
                    warrior = new ChefNain();
                    this.warriors.push(warrior);
                    break;
                case 'Chef Elfe':
                    warrior = new ChefElfe();
                    this.warriors.push(warrior);
                    break;
                default:
                    console.error('Unrecognized warrior type');
                    return;
            }
        });
    }

    // Méthode pour entraîner les guerriers de la liste d'attente et les afficher
    sortirListAttente() {
        let i = 0; // Initialiser un index pour la boucle
        let container;
        let teamDiv;

        // Sélectionner le conteneur approprié et la div de l'équipe en fonction de l'équipe
        if (this.team === "blue") {
            container = document.getElementById("container-1"); // Sélectionner le conteneur spécifique
            teamDiv = container.querySelector('div[name="blue"]'); // Sélectionner la div existante avec le nom "blue"
        } else if (this.team === "red") {
            container = document.getElementById("container-5"); // Sélectionner le conteneur spécifique
            teamDiv = container.querySelector('div[name="red"]'); // Sélectionner la div existante avec le nom "red"
        }

        // Parcourir les guerriers et les entraîner si les ressources sont suffisantes
        while (i < this.warriors.length) {
            const warrior = this.warriors[i];
            const cost = warrior.coutEntrainement; // Récupérer le Coût d'entraînement du guerrier

            if (cost <= this.resources) {
                this.resources -= cost; // Déduire le coût des ressources
                this.worriorinfield.push(warrior); // Ajouter le guerrier entrainé à la liste des guerriers entrainés: this.worriorinfield
                this.warriors.splice(i, 1); // Retirer le guerrier de la liste d'attente 

                // Créer un nouvel élément pour représenter le guerrier entraîné
                const warriorDiv = document.createElement("div");
                warriorDiv.className = "warrior";

                // Créer un élément img et définir son attribut src
                const warriorImg = document.createElement("img");
                warriorImg.className = 'worrior-field';
                warriorImg.src = `../${this.team}/${warrior.type}.png`; // Update the image path as needed
                warriorImg.alt = `Warrior ${warrior.type}`;

                // Ajouter l'image à la div du guerrier
                warriorDiv.appendChild(warriorImg);

                // Ajouter l'index du guerrier en tant qu'attribut de données à la div du guerrier
                warriorDiv.setAttribute('data-index', this.worriorinfield.length - 1);

                // Ajouter le nouvel élément à la div de l'équipe
                teamDiv.appendChild(warriorDiv);
            } else {
                i++; // Passer à l'élément suivant seulement s'il n'y a pas suffisamment de ressources
            }
        }
    }

    // Méthode pour incrémenter les ressources 
    incrementerRessource() {
        this.resources++;
    }

    // Méthode pour obtenir les ressources actuelles
    getRessources() {
        return this.resources;
    }
}
