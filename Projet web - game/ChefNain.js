class ChefNain extends Nain {
  constructor() {
    super(); // Appeler le constructeur de la classe Nain
    this.setType("chef_nain"); // Définir le type du guerrier sur "chef_nain"

   // Tripler le coût d'entrainement du chef nain par rapport à un nain régulier
    this.setCoutEntrainement(this.getCoutEntrainement() * 3);

      // Doubler les dégâts spécifiques du chef nain par rapport à un nain régulier
    this.setDegatsSpecifiques(this.getDegatsSpecifiques() * 2);
  }
}
