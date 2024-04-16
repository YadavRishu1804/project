// THIS FILE IS FOR THE GET ROUTE OF ANY FILE

// Import the express module
const express = require('express');

// Create a new router to handle the file route
const fileRouter = express.Router();

// Import the blobServiceClient from the config file
const { blobServiceClient } = require('../config');

// Create a get route to get the file from the container

fileRouter.get('/', async (req, res) => {

    try {

        // Read the query parameters
        const user_id = req.query.user_id.toLowerCase();
        const bot_name = req.query.bot_name;
        const file_name = req.query.file_name;

        // Get the blob of file on azure
        const container_name = user_id
        const container_client = blobServiceClient.getContainerClient(container_name);
        const blob_client = container_client.getBlockBlobClient(bot_name + "/" + file_name);

        // If the blob exists, send 200 code and download the file; else send a 400 status code
        if (await blob_client.exists()) {
            const downloadBlockBlobResponse = await blob_client.download(0);
            res.status(200).send(downloadBlockBlobResponse.readableStreamBody);
        } else {
            res.status(400).send("Failed to get the file from the container");
        }

    }

    catch (error) {

        console.log(error);
        res.status(500).send(error.message);

    }

});

// Export the file router
module.exports = fileRouter;