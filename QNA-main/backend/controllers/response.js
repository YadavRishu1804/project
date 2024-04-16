// THIS FILE IS FOR THE GET ROUTE OF RESPONSE TO THE USER PROVIDED QUERY

// Import the express module
const express = require('express');

// Create a new router to handle the file route
const responseRouter = express.Router();

// Import the fs module
const fs = require('fs');

// Import the chromadb functions from the models file
const { getOrCreateNewChromaCollection, queryChromaCollection } = require('../models/chroma_collection');

// Import the openai client from the config file
const { openaiClient } = require('../config');

// Import the blobServiceClient from the config file
const { blobServiceClient } = require('../config');

responseRouter.get('/', async (req, res) => {

    try {

        // Read the query parameters
        const bot_name = req.query.bot_name;
        const prompt = req.query.prompt;
        const user_id = req.query.user_id.toLowerCase();

        // Get the chroma collection for the bot
        const chroma_bot_collection = await getOrCreateNewChromaCollection(user_id + "-" + bot_name);

        // Save the user prompt in the history
        const user_history = "user = " + prompt + " #####\n";

        // Query the collection
        const q = await queryChromaCollection(chroma_bot_collection, [prompt], 5);
        const results = q.documents[0]

        // Create the queries for the bot
        const queries = [];
        for (const result of results) {
            queries.push("Please extract the following: " + prompt + "  solely based on the text below. Use an unbiased and journalistic tone. If you're fully unsure of the answer, say you cannot find the answer. \n\n" + result);
        }
        queries.reverse();

        // Get the bot response
        const answer = await openaiClient.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: queries.map(pro => { return { role: "assistant", content: pro } }),
            temperature: 0.0,
        });
        const final_answer = answer.choices[0].message.content;

        if (final_answer) {

            // Save the system response in the history
            const system_history = "system = " + final_answer + " #####\n";
            
            // Get the previous history of the bot from azure
            const container_name = user_id;
            const container_client = blobServiceClient.getContainerClient(container_name);
            const blob_client = container_client.getBlockBlobClient(bot_name + "/history.txt");

            // If the history file exists, download the file and append the new history; else create a new history file
            if (await blob_client.exists()) {
                const text = await blob_client.downloadToFile("./temp_uploads/history.txt");
            }
            fs.appendFileSync("./temp_uploads/history.txt", user_history, (err) => { if (err) throw err; });
            fs.appendFileSync("./temp_uploads/history.txt", system_history, (err) => { if (err) throw err; });

            // Upload the updated history file to azure
            const uploadBlobResponse = await blob_client.uploadFile("./temp_uploads/" + "history.txt");
            console.log(`Uploaded block blob history.txt successfully`, uploadBlobResponse.requestId);

            // Clear the temp_uploads folder 
            fs.rmdirSync("./temp_uploads", { recursive: true });
            fs.mkdirSync("./temp_uploads");

            // Send the bot response
            res.status(200).send(final_answer);

        } 
        
        else {
            res.status(400).send("Failed to query the collection in ChromaDB");
        }

    }

    catch (error) {

        console.log(error);
        res.status(500).send(error.message);

    }

});

// Export the response router
module.exports = responseRouter;