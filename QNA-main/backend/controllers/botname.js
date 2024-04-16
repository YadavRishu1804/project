// THIS FILE IS FOR THE GET ROUTE TO CHECK IF THE BOT NAME EXISTS ALREADY

// Import the express module
const express = require('express');

// Create a new router to handle the file route
const botnameRouter = express.Router();

// Import the ListAllCollections function from the chroma_collection model
const { listAllCollections } = require('../models/chroma_collection');

// Create a get route to check if the bot name exists

botnameRouter.get('/', async (req, res) => {

    try {

        // Read the query parameters
        const user_id = req.query.user_id.toLowerCase();
        const bot_name = req.query.bot_name;

        // Get all the collections already present
        const collections = await listAllCollections();

        // If the collections are not undefined, check if the bot name exists already

        if (collections !== undefined) {

            // If the bot name exists, send a response with bot_name_exists as true else false

            if (collections.map(collection => collection.name).includes(`${user_id}-${bot_name}`)) {
                res.status(201).send({ bot_name_exists: true });
            }
            else {
                res.status(200).send({ bot_name_exists: false });
            }

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
module.exports = botnameRouter;