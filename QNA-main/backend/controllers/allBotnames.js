// THIS FILE IS FOR THE GET ROUTE TO LIST ALL THE BOT NAMES OF THE USER

// Import the express module
const express = require('express');

// Create a new router to handle the file route
const allBotnamesRouter = express.Router();

// Import the ListAllCollections function from the chroma_collection model
const { listAllCollections } = require('../models/chroma_collection');

// Create a get route to list all the bot names of the user

allBotnamesRouter.get('/', async (req, res) => {

    try {

        // Read the query parameters
        const user_id = req.query.user_id.toLowerCase();

        // Get all the collections already present
        const collections = await listAllCollections();

        // If the collections are not undefined, send a response with the bot names

        if (collections !== undefined) {

            // Filter the collections to get the bot names of the user
            const botnames = collections.filter(collection => collection.name.startsWith(user_id)).map(collection => collection.name.split('-')[1]);

            // Send the bot names as a response
            res.status(200).send(botnames);

        }

        // If the collections are undefined, send a response with code 404

        else {
            res.status(404).send("No collections found");
        }

    }

    catch (error) {

        console.log(error);
        res.status(500).send(error.message);

    }

});

// Export the router
module.exports = allBotnamesRouter;