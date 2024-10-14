# Dinographic: Dino Comparison Application

## Overview

Dinographic is a web-based application that compares various dinosaur species with the user. The application generates a comparison between a human and several dinosaur species based on height, weight, and diet, offering randomized facts each time the user interacts with it or refreshes the page.

## Features

- Interactive Form: Users input their name, height, weight, and diet into a form.
- Dino Comparison: The app compares the human data with multiple dinosaurs and generates random facts about the height, weight, and diet differences.
- Randomized Facts: Each time the page is refreshed, the facts displayed for each dinosaur are randomized.
- Mobile Responsive: The application is responsive and works across various screen sizes.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- JSON (to store dinosaur data)

## Project Structure

- `index.html`: Main HTML file that contains the structure of the app and the form for user input.
- `app.css`: Stylesheet for the application, including layout, grid system, and responsive design.
- `app.js`: JavaScript file that contains the core logic for generating dinosaur comparisons and managing user interactions.

## How It Works

1. **User Input**: The user fills out the form with their name, height, weight, and diet.
2. **Data Comparison**: The app compares the user's input to the data of several dinosaurs (fetched from a JSON file).
3. **Random Fact Generation**: For each dinosaur, a random fact is chosen between height, weight, and diet comparison.
4. **Dynamic Tiles**: The comparisons are displayed dynamically on tiles in a responsive grid format.
5. **Randomized on Refresh**: Each time the page is reloaded, the dinosaur facts are re-randomized.

## How to Use:
1. **Clone the Repository**:
```bash
git clone [repository URL]
```
2. **Open** `index.html`: Open the `index.html` file in your browser.
3. **Enter Your Information**: Input your name, height (in feet and inches), weight (in pounds), and select your diet from the form.
4. **Compare**: Click the "Compare Me!" button to see how you compare with various dinosaurs.
5. **Refresh for More Facts**: Reload the page to randomize the facts again.

## File Breakdown

`index.html` <br>
- Contains the structure of the webpage, including a header, form, grid, and footer.
- Links the external CSS and JavaScript files.

`app.css`<br>
- Defines the styles for the grid layout, form, and tiles.
- Uses a gradient background and Google Fonts for a visually appealing design.
- Adds responsiveness to ensure proper layout across different screen sizes.

`app.js`<br>
- Handles the logic for creating and displaying dinosaur comparison tiles.
- Randomly selects facts for each dinosaur.
- Fetches dinosaur data from a JSON file.
- Contains helper functions for generating tiles, clearing the grid, and formatting species names.

## External Resources

- **Google Fonts**: Fonts used include Frijole, Open Sans, and Oswald.
- **Normalize.css**: Used for cross-browser style normalization.
- **Images**: Dino images are referenced from the `/images/` folder.

## License

This project is free to use and distribute. Feel free to fork or contribute to it.

<hr>

This ReadMe should give users and developers a clear understanding of how to use and work with your Dino Comparison project. Let me know if you'd like any adjustments!