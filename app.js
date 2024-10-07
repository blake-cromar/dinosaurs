    // Dino Constructor
    function Dino(species, weight, height, diet) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
    }

    // Dino Compare Method 1: Compare Height
    Dino.prototype.compareHeight = function(human) {
        const relativeDiffHeight = this.calcRelativeDiff(human.height, this.height);
        return `${human.name} is ${relativeDiffHeight.toFixed(2)}% different in height than a(n) ${this.species}.`;
    };

    // Dino Compare Method 2: Compare Weight
    Dino.prototype.compareWeight = function(human) {
        const relativeDiffWeight = this.calcRelativeDiff(human.weight, this.weight);
        return `${human.name} is ${relativeDiffWeight.toFixed(2)}% different in weight than a(n) ${this.species}.`;
    };

    // Dino Compare Method 3: Compare Diet
    Dino.prototype.compareDiet = function(human) {
        return human.diet.toLowerCase() === this.diet.toLowerCase()
            ? `${human.name} has the same diet as a(n) ${this.species}.`
            : `${human.name} has a different diet than a(n) ${this.species}.`;
    };

    // Relative Difference Function
    Dino.prototype.calcRelativeDiff = function(humanMeasurement, dinoMeasurement) {
        const difference = Math.abs(humanMeasurement - dinoMeasurement);
        const average = (humanMeasurement + dinoMeasurement) / 2;

        return (difference / average) * 100; // Return the relative difference as a percentage
    };

    // Create Dino Objects


    // Create Human Object

    // Use IIFE to get human data from form





    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
