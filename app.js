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

// Main function to start the process of creating tiles
function initDinoComparison() {
    let human; // Encapsulate human within the init function scope

    // IIFE to get human data from form
    (function getHumanData() {
        document.getElementById('btn').addEventListener('click', function() {
            const name = document.getElementById('name').value;
            const feet = parseFloat(document.getElementById('feet').value);
            const inches = parseFloat(document.getElementById('inches').value);
            const height = (feet * 12) + inches;
            const weight = parseFloat(document.getElementById('weight').value);
            const diet = document.getElementById('diet').value;

            // Create a Human object and keep it within this scope
            human = new Human(name, weight, height, diet);
            document.getElementById('dino-compare').style.display = 'none';
            generateTiles();
        });
    })();

    // Generate the tiles for the infographic
    function generateTiles() {
        createDinoObjects('dino.json').then(function(dinoData) {
            const grid = document.getElementById('grid');

            // Add Dino tiles
            dinoData.forEach(function(dino) {
                const tile = createTile(dino);
                grid.appendChild(tile);
            });

            // Add Human tile
            const humanTile = createHumanTile();
            grid.insertBefore(humanTile, grid.children[4]);
        });
    }

    // Create individual Dino tile
    function createTile(dino) {
        const tile = document.createElement('div');
        tile.classList.add('grid-item');

        const randomFacts = [
            dino.compareHeight(human),
            dino.compareWeight(human),
            dino.compareDiet(human)
        ];
        const randomFact = randomFacts[Math.floor(Math.random() * randomFacts.length)];

        tile.innerHTML = `
            <h3>${dino.species}</h3>
            <img src="images/${dino.species}.png" alt="${dino.species}">
            <p>${randomFact}</p>
        `;
        return tile;
    }

    // Create Human tile
    function createHumanTile() {
        const tile = document.createElement('div');
        tile.classList.add('grid-item');
        tile.innerHTML = `
            <h3>${human.name}</h3>
            <img src="images/human.png" alt="Human">
        `;
        return tile;
    }
}

// Call the init function to start the application and keep everything encapsulated
initDinoComparison();
