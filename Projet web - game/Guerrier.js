class Guerrier {
    constructor() {
         // Initialiser les propriétés par défaut du guerrier
         this.force = 10; // La force du guerrier
         this.coutEntrainement = 1; // Le coût d'entrainement du guerrier
         this.degatsSpecifiques = 1; // Modificateur de dégâts spécifiques
         this.degats = 1; // Dégâts généraux
         this.pointsDeVie = 100; // Les points de vie du guerrier
    }

    // Getter and setter pour le type du guerrier
    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }

    // Getter et setter pour la force du guerrier
    getForce() {
        return this.force;
    }

    setForce(force) {
        this.force = force;
    }

    // Getter et setter pour les points de vie du guerrier
    getPv() {
        return this.pointsDeVie;
    }

    setPv(pv) {
        this.pointsDeVie = pv;
    }

    // Getter et setter pour le coût d'entrainement du guerrier
    getCoutEntrainement() {
        return this.coutEntrainement;
    }

    setCoutEntrainement(coutEntrainement) {
        this.coutEntrainement = coutEntrainement;
    }

    // Getter et setter pour les dégâts spécifiques du guerrier 
    getDegatsSpecifiques() {
        return this.degatsSpecifiques;
    }

    setDegatsSpecifiques(degatsSpecifiques) {
        this.degatsSpecifiques = degatsSpecifiques;
    }

    // Getter et setter pour les dégâts généraux du guerrier
    getDegats() {
        return this.degats;
    }

    setDegats(degats) {
        this.degats = degats;
    }

    // Méthode pour que le guerrier attaque un autre guerrier
    attaquer(guerrier) {
        let somme = LanceDeFinal(this.force); // Calculer les dégâts en lançant un dé basé sur la force du guerrier
        guerrier.subirDegats(somme); } // Appliquer les dégâts calculés au guerrier cible

   // Méthode pour que le guerrier reçoit des dégâts
    subirDegats(nbrDegats) {
        this.pointsDeVie -= Math.floor(nbrDegats / this.degatsSpecifiques); // Réduire les points de vie en fonction des dégâts reçus
    }
    // Méthode pour vérifier si le guerrier est mort (points de vie inférieurs ou égaux à 0)
    estMort() {
        return this.pointsDeVie <= 0;
    }
}
