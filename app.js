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
    function createDinoObjects(url) {
        var dinoData = []; // Initialize an empty array to hold Dino objects

        fetch(url)  
            .then(function(response) {  // Grabbing the JSON
                return response.json();   // Parse the JSON response
            })
            .then(function(data) {
                data.Dinos.forEach(function(dino) { // Loop through each Dino in the data
                    dinoData.push(new Dino(dino.species, dino.weight, dino.height, dino.diet)); // Create a new Dino object and add it to the array
                });
            })

        return dinoData; // Return the dinoData array (this will be empty at this point)
    }

    // Call the function to create Dino objects
    dinoData = createDinoObjects('dino.json');

    // Create Human Object
    function Human(name, weight, height, diet) {
        this.species = 'Human';
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
    }

    // Use IIFE to get human data from form
    var human;
    (function getHumanData() {
        var btn = document.getElementById('btn');  // Get the button element
        btn.addEventListener('click', function() {
            let name = document.getElementById('name').value;
            let feet = parseFloat(document.getElementById('feet').value);  // Getting feet
            let inches = parseFloat(document.getElementById('inches').value); // Getting inches
            let height = (feet * 12) + inches;  // Convert height to inches
            let weight = parseFloat(document.getElementById('weight').value);  // Getting weight
            let diet = document.getElementById('diet').value;

            // Create the Human object and assign to the 'human' variable
            human = new Human(name, weight, height, diet);

            // Hide form after getting data
            document.getElementById('dino-compare').style.display = 'none';

            // Now generate the infographic
            generateTiles();
        });
    })();

function generateTiles() {
