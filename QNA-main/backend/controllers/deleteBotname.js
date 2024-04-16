// THIS FILE IS FOR THE DELETE ROUTE TO DELETE THE BOT OF THE GIVEN NAME

// Import the express module
const express = require('express');

// Create a new router to handle the file route
const deleteBotnameRouter = express.Router();

// Import the deleteCollectionOfName function from the chroma_collection model
const { deleteCollectionOfName } = require('../models/chroma_collection');

// Create a delete route to delete the bot name

deleteBotnameRouter.delete('/', async (req, res) => {

    try {

        // Read the query parameters
        const user_id = req.query.user_id.toLowerCase();
        const bot_name = req.query.bot_name;

        // Form a name for the bot
        const bot_name_to_delete = `${user_id}-${bot_name}`;

        // If some unusual error occurs, send a response with code 400
        if (bot_name_to_delete === undefined) {
            res.status(400).send("Bot name is undefined");
        }

        // Else delete the bot name and send a response with code 200
        else {
            await deleteCollectionOfName(bot_name_to_delete);
            res.status(200).send("Bot deleted successfully");
        }

    }

    catch (error) {

        console.log(error);
        res.status(500).send(error.message);

    }

});

// Export the router
module.exports = deleteBotnameRouter;