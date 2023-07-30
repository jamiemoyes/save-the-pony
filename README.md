# Save the Pony

## About

Help save the pony! The aim of this game is to help the pony escape the maze without being caught by the monster who protects the maze - the Domokun!

## Getting Started

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/jamiemoyes/save-the-pony.git
   ```

2. Install dependencies:

   ```bash
   npm i
   ```

3. Run the app:

   ```bash
   npm run pony
   ```

4. Open app: Either click the link in terminal or open [localhost:5173](http://localhost:5173/)

### Project Structure

- 📂 `src`
  - 📂 `assets` - Fonts & Icons used
  - 📂 `components`
    - 📂 `ControlButton` - button used to control game state
    - 📂 `CreateGameForm` - form to allow user to configure game settings
    - 📂 `Game` - container to display all game related components i.e the maze, the controls and the game over screen
    - 📂 `GameBoard` - displays the maze along with the characters
    - 📂 `GameOver` - screen to display win/lose content at end of game
    - 📂 `GamePad` - controls to move the pony around the maze
  - 📂 `hooks` - all my hooks are for handling react-query API calls
    - `useCreateGamePony` - sets up a new game and retrieves the mazeId for the created game
    - `useGetGameState` - retrieves the state of a game of a certain state, returns new board details and location of characters
    - `useSendDirection` - mutation which sends a direction to move the pony, returns a game state containing if the game is over and if the move was accepted
  - 📂 `mocks` - contains mock server setup and mock responses for testing
  - 📂 `shared`
    - 📂 `types` - contains shared types used throughout the repo
    - `apiUrls` - central source of api urls that can be used throughout repo

## Project Information

General information about the Save the Pony app and repository.

### Tech Stack

Here are some of the key frameworks used to create this app:

- React
- Typescript
- CSS Modules
- Vitest
- React Testing Library
- Mock Service Worker

### Features

- Responsive - uses a component-based design to natively support across all devices
- Accessibility - each page passes WCAG-2.1 accessibility standard (verified with Axe dev tool)
- Form validation - native HTML validation is used for fast client side validation, and any errors returned from the backend are displayed on the form.
- Experimental View Transitions API - Makes use of new viewTransitions API where supported to allow animated transition between form screen and maze screen.

### Potential Improvements

- Allow for a soft reset so that the user can recreate a game with the settings they previously set up
- Add a timer to gamify the app more
- Add local leaderboard - Add a leaderboard of times, could be stored in localstorage to prevent need to implement any authentication
- Add co-ordinate system to describe where the items are - to assist with accessibility

### Testing

Vitest is used as the test framework to provide super fast results. To run, do the following steps:

1. To run all tests:

   ```bash
   npm run test
   ```

2. To run coverage across components

   ```bash
   npm run coverage
   ```

### Notes

Existing bug in backend - if you make an invalid move as the domokun is approaching you it doesnt count as a loss and you can carry on the game.
