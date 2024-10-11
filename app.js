    // Dino Constructor
    function Dino(species, weight, height, diet) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
    }

    // Compare Height
    Dino.prototype.compareHeight = function(human) {
        const actualDiffHeight = this.calcAbsDiff(this.height, human.height);
        const feetDiff = Math.round(actualDiffHeight / 12);
        const lowercasedSpecies = this.species.toLowerCase(); // Lowercase species name
        const properArticle = capitalizeWord(determineArticle(lowercasedSpecies));

        if (feetDiff === 0) {
            return `${properArticle} ${lowercasedSpecies} is almost the same height as ${human.name}.`
        } else if (this.height > human.height) {
            return `${properArticle} ${lowercasedSpecies} is about ${feetDiff} feet taller than ${human.name}.`;
        } else if (this.height < human.height) {
            return `${properArticle} ${lowercasedSpecies} is about ${feetDiff} feet shorter than ${human.name}.`;
        } else {
            return `${properArticle} ${lowercasedSpecies} has the same height as ${human.name}.`;
        }
    };

    // Compare Weight 
    Dino.prototype.compareWeight = function(human) {
        const actualDiffWeight = this.calcAbsDiff(this.weight, human.weight);
        const lowercasedSpecies = this.species.toLowerCase(); // Lowercase species name
        const properArticle = capitalizeWord(determineArticle(lowercasedSpecies));

        if (actualDiffWeight <= 1) {
            return `${properArticle} ${lowercasedSpecies} is almost the same weight as ${human.name}.`;
        } else if (this.weight > human.weight) {
            return `${properArticle} ${lowercasedSpecies} is ${actualDiffWeight.toFixed(0)} pounds heavier than ${human.name}.`;
        } else if (this.weight < human.weight) {
            return `${properArticle} ${lowercasedSpecies} is ${actualDiffWeight.toFixed(0)} pounds lighter than ${human.name}.`;
        } else {
            return `${properArticle} ${lowercasedSpecies} has the same weight as ${human.name}.`;
        }
    };

    // Compare Diet 
    Dino.prototype.compareDiet = function(human) {
        const lowercasedSpecies = this.species.toLowerCase(); // Lowercase species name
        const properArticle = capitalizeWord(determineArticle(lowercasedSpecies));
        return human.diet === this.diet
            ? `${properArticle} ${lowercasedSpecies} and ${human.name} are both ${this.diet}s.`
            : `${properArticle} ${lowercasedSpecies} is on a ${this.diet.toLowerCase()} diet while ${human.name} is on a ${human.diet.toLowerCase()} diet.`;
    };

        // Actual Difference Function
        Dino.prototype.calcAbsDiff = function(dinosaurMeasurement, humanMeasurement) {
            return Math.abs(dinosaurMeasurement - humanMeasurement);  // Return the absolute difference
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
                    dinoData.push(new Dino(dino.species, dino.weight, dino.height, dino.diet)); // Create a new Dino object and add it to the array
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
            <img src="images/${dino.species}.png" alt="${dino.species}">
            <p>${randomFact}</p>
            `;
            
            // Adding tile to the grid
            grid.appendChild(tile);
        });

        // Adding human tile
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

function determineArticle(word) {
    const firstLetter = word[0].toLowerCase(); // Convert to lowercase to handle uppercase letters
    const vowels = ['a', 'e', 'i', 'o', 'u']; // Array of vowels
    
    if (vowels.includes(firstLetter)) {
        return 'an'; // Use "an" if the first letter is a vowel
    } else {
        return 'a';  // Use "a" for consonants
    }
}

function capitalizeWord(word) {
    // Grabbing the first letter and capitalizing it
    const firstLetterCapital = word[0].toUpperCase();

    // Combining the capitalized first letter with the rest of the word
    const restOfWord = word.slice(1).toLowerCase();

    // Returning the capitalized word
    return firstLetterCapital + restOfWord;
}
