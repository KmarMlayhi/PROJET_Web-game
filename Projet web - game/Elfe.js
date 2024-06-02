class Elfe extends Guerrier {
  constructor() {
    super(); // Appeler le constructeur de la classe Guerrier
    this.setType("elfe"); // Définir le type du guerrier sur "elfe"
    this.setCoutEntrainement(this.getCoutEntrainement() * 2); // Doubler le coût d'entrainement de l'elfe par rapport au guerrier de base
    // this.setDegats(this.getDegats() * 2);  // En option, doubler les dégâts généraux de l'elfe par rapport au guerrier de base
    this.setForce(this.getForce() * 2);  // Doubler la force de l'elfe par rapport au guerrier de base
  }
}
