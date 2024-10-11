    // Dino Constructor
    function Dino(species, weight, height, diet) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
    }

// Common function to format comparison messages
function formatComparisonMessage(dino, human, comparisonResult, unit, attribute) {
    // Collecting pre-data for code readability
    const speciesName = formatSpeciesName(dino.species);
    
    // Creating Output
    if (attribute === 'weight') { // Weight statements
        return comparisonResult === 0
            ? `${speciesName} weighs almost the same as ${human.name}.`
            : `${speciesName} is about ${Math.abs(comparisonResult)} ${unit} ${comparisonResult > 0 ? 'heavier' : 'lighter'} than ${human.name}.`;
    } else if (attribute === 'height') { // Height statements
        const heightDiffFeet = Math.round(comparisonResult / 12); // Convert inches to feet here
        return comparisonResult === 0
            ? `${speciesName} is almost the same ${attribute} as ${human.name}.`
            : `${speciesName} is about ${Math.abs(heightDiffFeet)} ${unit} ${comparisonResult > 0 ? 'taller' : 'shorter'} than ${human.name}.`;
    }
}

    // Compare Height
    Dino.prototype.compareHeight = function(human) {
    const heightDiffInches = calcDiff(this.height, human.height);
    return formatComparisonMessage(this, human, heightDiffInches, 'feet', 'height');
    };

    // Compare Weight 
    Dino.prototype.compareWeight = function(human) {
    const weightDiff = calcDiff(this.weight, human.weight);
    return formatComparisonMessage(this, human, weightDiff.toFixed(0), 'pounds', 'weight');
    };

    // Compare Diet 
    Dino.prototype.compareDiet = function(human) {
    const speciesName = formatSpeciesName(this.species);
    const humanDietArticle = determineArticle(human.diet);
    const dinoDietArticle = determineArticle(this.diet);
        return human.diet === this.diet
        ? `${speciesName} and ${human.name} are both ${this.diet}s.`
        : `${speciesName} is on ${dinoDietArticle} ${this.diet.toLowerCase()} diet while ${human.name} is on ${humanDietArticle} ${human.diet.toLowerCase()} diet.`;
    };

// Helper function to calculate mathematical difference
function calcDiff(measurementOne, measurementTwo) {
    return measurementOne - measurementTwo;
};

// Helper functions to determine article and format species name
function determineArticle(word) {
    return ['a', 'e', 'i', 'o', 'u'].includes(word[0].toLowerCase()) ? 'an' : 'a';
}

function capitalizeWord(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function formatSpeciesName(species) {
    const lowercasedSpecies = species.toLowerCase();
    const properArticle = capitalizeWord(determineArticle(lowercasedSpecies));
    return `${properArticle} ${lowercasedSpecies}`;
}

    // Create Dino Objects
    function createDinoObjects(url) {
        return fetch(url)  
        .then(function(response) {
            return response.json();
            })
            .then(function(data) {
            return data.Dinos.map(function(dino) {
                return new Dino(dino.species, dino.weight, dino.height, dino.diet);
                });
            });
    }

// Human Constructor
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
