// THIS IS THE MAIN FILE OF THE BACKEND SERVER

// Import the app from the app.js file
const app = require('./app')

// Import the PORT from the config file
const { PORT } = require('./config')

// Start the server on the specified PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})