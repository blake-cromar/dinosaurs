function Dino(species, weight, height, diet) {
    /**
     * Initialize a Dino object.
     *
     * Parameters
     * ----------
     * species : str
     *     The species of the dinosaur.
     * weight : float
     *     The weight of the dinosaur in pounds.
     * height : float
     *     The height of the dinosaur in inches.
     * diet : str
     *     The diet of the dinosaur (e.g., carnivore, herbivore).
     */
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
}

function formatComparisonMessage(dino, human, comparisonResult, unit, attribute) {
    /**
     * Format a comparison message between a dinosaur and a human.
     *
     * Parameters
     * ----------
     * dino : Dino
     *     The Dino object to compare.
     * human : Human
     *     The Human object to compare against.
     * comparisonResult : float
     *     The result of the comparison (difference between weights or heights).
     * unit : str
     *     The unit of measurement (e.g., 'pounds' or 'feet').
     * attribute : str
     *     The attribute being compared ('weight' or 'height').
     *
     * Returns
     * -------
     * str
     *     A formatted comparison message.
     */
    // Collecting pre-data for code readability
    const speciesName = formatSpeciesName(dino.species);
    
    // Creating Output
    if (attribute === 'weight') { // Weight statements
        return comparisonResult === 0
            ? `${speciesName} weighs almost the same as ${human.name}.`
            : `${speciesName} is about ${Math.abs(comparisonResult)} ${unit} ${comparisonResult > 0 ? 'heavier' : 'lighter'} than ${human.name}.`;
    } else if (attribute === 'height') { // Height statements
        const heightDiffFeet = Math.round(comparisonResult / 12); // Convert inches to feet here
        if (heightDiffFeet === 1) { // Accounting for when height difference in feet is only 1.
            unit = 'foot';
        }
        return comparisonResult === 0
            ? `${speciesName} is almost the same ${attribute} as ${human.name}.`
            : `${speciesName} is about ${Math.abs(heightDiffFeet)} ${unit} ${comparisonResult > 0 ? 'taller' : 'shorter'} than ${human.name}.`;
    }
}

Dino.prototype.compareHeight = function(human) {
    /**
     * Compare the height of the dinosaur with a human.
     *
     * Parameters
     * ----------
     * human : Human
     *     The Human object to compare against.
     *
     * Returns
     * -------
     * str
     *     A formatted comparison message regarding height.
     */
    const heightDiffInches = calcDiff(this.height, human.height);
    return formatComparisonMessage(this, human, heightDiffInches, 'feet', 'height');
};

Dino.prototype.compareWeight = function(human) {
    /**
     * Compare the weight of the dinosaur with a human.
     *
     * Parameters
     * ----------
     * human : Human
     *     The Human object to compare against.
     *
     * Returns
     * -------
     * str
     *     A formatted comparison message regarding weight.
     */
    const weightDiff = calcDiff(this.weight, human.weight);
    return formatComparisonMessage(this, human, weightDiff.toFixed(0), 'pounds', 'weight');
};

Dino.prototype.compareDiet = function(human) {
    /**
     * Compare the diet of the dinosaur with a human.
     *
     * Parameters
     * ----------
     * human : Human
     *     The Human object to compare against.
     *
     * Returns
     * -------
     * str
     *     A formatted comparison message regarding diet.
     */
    const speciesName = formatSpeciesName(this.species);
    const humanDietArticle = determineArticle(human.diet);
    const dinoDietArticle = determineArticle(this.diet);
    return human.diet === this.diet
        ? `${speciesName} and ${human.name} are both ${this.diet}s.`
        : `${speciesName} is on ${dinoDietArticle} ${this.diet.toLowerCase()} diet while ${human.name} is on ${humanDietArticle} ${human.diet.toLowerCase()} diet.`;
};

// Helper function to calculate mathematical difference
function calcDiff(measurementOne, measurementTwo) {
    /**
     * Calculate the difference between two measurements.
     *
     * Parameters
     * ----------
     * measurementOne : float
     *     The first measurement.
     * measurementTwo : float
     *     The second measurement.
     *
     * Returns
     * -------
     * float
     *     The difference between the two measurements.
     */
    return measurementOne - measurementTwo;
};

// Helper functions to determine article and format species name
function determineArticle(word) {
    /**
     * Determine the article ('a' or 'an') for a given word.
     *
     * Parameters
     * ----------
     * word : str
     *     The word to determine the article for.
     *
     * Returns
     * -------
     * str
     *     'a' or 'an' based on the initial letter of the word.
     */
    return ['a', 'e', 'i', 'o', 'u'].includes(word[0].toLowerCase()) ? 'an' : 'a';
}

function capitalizeWord(word) {
    /**
     * Capitalize the first letter of a word and lowercase the rest.
     *
     * Parameters
     * ----------
     * word : str
     *     The word to capitalize.
     *
     * Returns
     * -------
     * str
     *     The capitalized word.
     */
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

function formatSpeciesName(species) {
    /**
     * Format the species name with the appropriate article.
     *
     * Parameters
     * ----------
     * species : str
     *     The species name to format.
     *
     * Returns
     * -------
     * str
     *     The formatted species name with the correct article.
     */
    const lowercasedSpecies = species.toLowerCase();
    const properArticle = capitalizeWord(determineArticle(lowercasedSpecies));
    return `${properArticle} ${lowercasedSpecies}`;
}

function createDinoObjects(url) {
    /**
     * Create an array of Dino objects from a given URL.
     *
     * Parameters
     * ----------
     * url : str
     *     The URL to fetch the dinosaur data from.
     *
     * Returns
     * -------
     * Promise
     *     A promise that resolves to an array of Dino objects.
     */
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

function Human(name, weight, height, diet) {
    /**
     * Initialize a Human object.
     *
     * Parameters
     * ----------
     * name : str
     *     The name of the human.
     * weight : float
     *     The weight of the human in pounds.
     * height : float
     *     The height of the human in inches.
     * diet : str
     *     The diet of the human (e.g., omnivore).
     */
    this.species = 'Human';
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
}

function initDinoComparison() {
    /**
     * Initialize the dinosaur comparison application.
     *
     * This function sets up event listeners and generates tiles for the comparison.
     */
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

    function clearGrid() {
        /**
         * This function clears the grid
         */
        const grid = document.getElementById('grid');
        grid.innerHTML = ''; // clear the grid
    }

    function generateTiles() {
        /**
         * Generate tiles for each dinosaur and the human.
         */
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

    function createTile(dino) {
        /**
         * Create a tile for a dinosaur.
         *
         * Parameters
         * ----------
         * dino : Dino
         *     The Dino object to create a tile for.
         *
         * Returns
         * -------
         * HTMLElement
         *     The tile element for the dinosaur.
         */
        const tile = document.createElement('div');
        tile.classList.add('grid-item');

        // Determining the random fact
        let randomFact = null;
        if (dino.species === 'Pigeon') { // Pigeon always has the same fact
            randomFact = 'All birds are Dinosaurs.';
        } else { // All other dinosaurs get a random fact
            const randomFacts = [
                dino.compareHeight(human),
                dino.compareWeight(human),
                dino.compareDiet(human)
            ];
            randomFact = randomFacts[Math.floor(Math.random() * randomFacts.length)];
        }

        // Creating the html 
        tile.innerHTML = `
            <h3>${dino.species}</h3>
            <img src="images/${dino.species}.png" alt="${dino.species}">
            <p>${randomFact}</p>
        `;
        return tile;
    }

    function createHumanTile() {
        /**
         * Create a tile for the human.
         *
         * Returns
         * -------
         * HTMLElement
         *     The tile element for the human.
         */
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
