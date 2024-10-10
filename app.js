    // Dino Constructor
    function Dino(species, weight, height, diet) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
    }

    // Dino Compare Method 1: Compare Height
    Dino.prototype.compareHeight = function(human) {
        const relativeDiffHeight = this.calcRelativeDiff(this.height, human.height);
        if (this.height > human.height) {
            return `A(n) ${this.species} is ${relativeDiffHeight.toFixed(0)}% taller than ${human.name}.`;
        } else if (this.height < human.height) {
            return `A(n) ${this.species} is ${relativeDiffHeight.toFixed(0)}% shorter than ${human.name}.`;
        } else {
            return `A(n) ${this.species} has the same height as ${human.name}`
        }
        
    };

    // Dino Compare Method 2: Compare Weight
    Dino.prototype.compareWeight = function(human) {
        const relativeDiffWeight = this.calcRelativeDiff(human.weight, this.weight);
        if (this.weight > human.weight) {
            return `A(n) ${this.species} is ${relativeDiffWeight.toFixed(0)}% heavier than ${human.name}.`;
        } else if (this.weight < human.weight) {
            return `A(n) ${this.species} is ${relativeDiffWeight.toFixed(0)}% lighter than ${human.name}.`;
        } else {
            return `A(n) ${this.species} has the same height as ${human.name}`
        }
    };

    // Dino Compare Method 3: Compare Diet
    Dino.prototype.compareDiet = function(human) {
        return human.diet.toLowerCase() === this.diet.toLowerCase()
            ? `A(n) ${this.species} and ${human.name} are both ${this.diet}s.`
            : `A(n) ${this.species} is on a ${this.diet} diet while ${human.name} is on a ${human.diet} diet.`;
    };

    // Relative Difference Function
    Dino.prototype.calcRelativeDiff = function(dinosaurMeasurement, humanMeasurement) {
        const difference = Math.abs(dinosaurMeasurement - humanMeasurement);
        return (difference / dinosaurMeasurement) * 100; // Return the relative difference as a percentage
    };

    // Create Dino Objects
    function createDinoObjects(url) {
        var dinoData = []; // Initialize an empty array to hold Dino objects

        return fetch(url)  
            .then(function(response) {  // Grabbing the JSON
                return response.json();   // Parse the JSON response
            })
            .then(function(data) {
                data.Dinos.forEach(function(dino) { // Loop through each Dino in the data
                    dinoData.push(new Dino(dino.species.toLowerCase(), dino.weight, dino.height, dino.diet.toLowerCase())); // Create a new Dino object and add it to the array
                });
                return dinoData;
            });
    }

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
            let diet = document.getElementById('diet').value.toLowerCase();

            // Create the Human object and assign to the 'human' variable
            human = new Human(name, weight, height, diet);

            // Hide form after getting data
            document.getElementById('dino-compare').style.display = 'none';

            // Now generate the infographic
            generateTiles();
        });
    })();

function generateTiles() {
    createDinoObjects('dino.json').then(function(dinoData) {
        let grid = document.getElementById('grid');

        // Create tiles for Dinos and Human
        dinoData.forEach(function(dino) {
            let tile = document.createElement('div');
            tile.classList.add('grid-item');

            // Making a list of random facts
            let randomFacts = [
                dino.compareHeight(human),
                dino.compareWeight(human),
                dino.compareDiet(human)
            ]

            // Selecting a random fact for comparison
            let randomFact = randomFacts[Math.floor(Math.random() * randomFacts.length)]

            // Creating the tile
            tile.innerHTML = `
            <h3>${dino.species}</h3>
            <img src="images/${dino.species.toLowerCase()}.png" alt="${dino.species}">
            <p>${randomFact}</p>
            `;
            
            // Adding tile to the grid
            grid.appendChild(tile);
        });

        // Adding human tile in
        let humanTile = document.createElement('div');
        humanTile.classList.add('grid-item');
        humanTile.innerHTML = `
            <h3>${human.name}</h3>
            <img src="images/human.png" alt="Human">
        `;
        // Adding human to the grid
        grid.insertBefore(humanTile, grid.children[4]);
    });
}
