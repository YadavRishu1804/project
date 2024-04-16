// THIS IS THE SECONDARY FILE OF THE BACKEND SERVER

// Import the express module to define the app
const express = require('express');

// Import the routers from the controllers
const fileRouter = require('./controllers/file');
const historyRouter = require('./controllers/history');
const responseRouter = require('./controllers/response');
const analyzeRouter = require('./controllers/analyze');
const botnameRouter = require('./controllers/botname');
const deleteBotnameRouter = require('./controllers/deleteBotname');
const allBotnamesRouter = require('./controllers/allBotnames');

// Import the middlewares to ensure the app can handle the requests
const bodyParser = require('body-parser');
const cors = require('cors');

// Define the app
const app = express();

// Use the middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Use the routers
app.use('/api/analyze', analyzeRouter)
app.use('/api/response', responseRouter)
app.use('/api/getFile', fileRouter)
app.use('/api/getHistory', historyRouter)
app.use('/api/botname', botnameRouter)
app.use('/api/deleteBotname', deleteBotnameRouter)
app.use('/api/allBotnames', allBotnamesRouter)

// Export the app
module.exports = app;