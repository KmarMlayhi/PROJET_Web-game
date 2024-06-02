class ChefElfe extends Elfe {
  constructor() {
    super(); // Appeler le constructeur de la classe Elfe
    this.setType("chef_elfe"); // Définir le type du guerrier sur "chef_elfe"

     // Doubler le coût d'entrainement du chef elfe par rapport à un elfe 
    this.setCoutEntrainement(this.getCoutEntrainement() * 2);

   // Doubler la force du chef elfe par rapport à un elfe 
    this.setForce(this.getForce() * 2);
  }
}
