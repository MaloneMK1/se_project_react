# WTWR

WTWR is a full-stack React app that recommends clothing based on the current
weather and lets registered users manage a personal wardrobe.

The app fetches weather data, shows the current date and location, filters a set of clothing cards by weather type, and opens modals for adding a new garment or previewing an item.

## Technologies

- React functional components
- React state, effects, context, and protected routes
- Vite
- OpenWeather API
- Express and MongoDB REST API integration
- JWT authentication stored in local storage
- CSS organized by component
- BEM-style class naming

## Features

- Weather request runs when the app mounts
- Current location appears in the header
- Weather card displays temperature in Fahrenheit
- Clothing cards load from the Express API
- Cards are filtered by weather type
- Registration, login, persistent sessions, and logout
- Protected profile page with the current user's clothing
- Profile editing
- Authenticated garment creation and deletion
- Persistent likes and dislikes
- Item preview modal opens when a clothing card is clicked

## Backend

The public backend repository is available at:

https://github.com/MaloneMK1/se_project_express

## Author

- Name: Eric Malone
- Email: Malone1913@gmail.com
- GitHub: https://github.com/MaloneMK1?tab=repositories
