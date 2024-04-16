// THIS FILE IS FOR THE POST ROUTE OF FILES AND BOT NAME TO GENERATE A BOT

// Import the express module
const express = require('express');

// Create a new router to handle the file route
const analyzeRouter = express.Router();

// Import the fs module
const fs = require('fs');

// Import the chromadb functions from the models file
const { getOrCreateNewChromaCollection, addDocumentToChromaCollection } = require('../models/chroma_collection');

// Import the blobServiceClient from the config file
const { documentAnalysisClient, blobServiceClient } = require('../config');

// Import the middleware for file upload
const upload = require('../middleware');

// Create a post route to analyze the files and create a collection in ChromaDB

analyzeRouter.post('/', upload.any('file_streams'), async (req, res) => {

    try {

        // Read the body of the request
        const user_id = req.body.user_id.toLowerCase();
        const bot_name = req.body.bot_name;
        const file_names = req.body.file_names;
        console.log(user_id, bot_name, file_names);

        // Create a container in azure for the user if it doesn't exist already  
        const container_name = user_id;
        const container_client = blobServiceClient.getContainerClient(container_name);
        const createContainerResponse = await container_client.createIfNotExists();
        console.log(`Create container ${container_name} successfully`, createContainerResponse.requestId);

        // Store the files of the user in the azure container according to the botname
        for (let i = 0; i < file_names.length; i++) {
            const blob_client = container_client.getBlockBlobClient(bot_name + "/" + file_names[i]);
            const uploadBlobResponse = await blob_client.uploadFile("./temp_uploads/" + file_names[i]);
            console.log(`Uploaded block blob ${file_names[i]} successfully`, uploadBlobResponse.requestId);
        }

        // Get the random text data from the file for detailed analysis
        let doc_info = []
        for (let i = 0; i < file_names.length; i++) {
            const stream = fs.createReadStream("./temp_uploads/" + file_names[i]);
            const poller = await documentAnalysisClient.beginAnalyzeDocument("prebuilt-read", stream);
            doc_info.push(await poller.pollUntilDone());
        }

        // Get useful Chunks from the random text processed above
        const chunks = [];
        for (let index = 0; index < doc_info.length; index++) {
            const doc = doc_info[index];
            for (const page of doc.pages) {
                const dict = {};
                let temp = page.lines;
                if (page.lines === undefined) {
                    temp = page.words;
                }
                const pageContent = temp.map(line => line.content).join(" ");
                dict.document_number = String(index);
                dict.content = String(pageContent);
                dict.page_number = String(page.pageNumber);
                dict.type = "raw_content";
                chunks.push(dict);
            }
            if (doc.tables !== undefined) {
                for (const table of doc.tables) {
                    const dict = {};
                    dict.document_number = String(index);
                    dict.page_number = String(table.boundingRegions[0].pageNumber);
                    const colHeaders = [];
                    const cells = table.cells;
                    for (const cell of cells) {
                        if (cell.kind === "columnHeader" && cell.columnSpan === 1) {
                            for (let i = 0; i < cell.columnSpan; i++) {
                                colHeaders.push(cell.content);
                            }
                        }
                    }
                    const dataRows = Array.from({ length: table.rowCount }, () => []);
                    for (const cell of cells) {
                        if (cell.kind === "content") {
                            for (let i = 0; i < cell.columnSpan; i++) {
                                dataRows[cell.rowIndex].push(cell.content);
                            }
                        }
                    }
                    const filteredDataRows = dataRows.filter(row => row.length > 0);
                    const markdownTable = filteredDataRows.map(row => row.join(" | ")).join("\n");
                    dict.content = markdownTable;
                    dict.type = "table_content";
                    chunks.push(dict);
                }
            }
        }

        // Create a new chromadb collection for the bot
        const chroma_bot_collection = await getOrCreateNewChromaCollection(user_id + "-" + bot_name);

        // Create embeddings for the chunks and add the documents to the collection
        let id = 1;
        for (const item of chunks) {
            const content = item.content || '';
            const documentNumber = item.document_number || '';
            const pageNumber = item.page_number || '';
            const typeOfContent = item.type || '';
            const contentMetadata = {
                document_number: documentNumber,
                page_number: pageNumber,
                type: typeOfContent
            };
            await addDocumentToChromaCollection(chroma_bot_collection, [id.toString()], [contentMetadata], [content]);
            id++;
        }

        // If the collection is created successfully, send a 200 status code; else send a 400 status code

        if (chroma_bot_collection !== undefined) {

            // Clear the temp_uploads folder
            fs.rmdirSync("./temp_uploads", { recursive: true });
            fs.mkdirSync("./temp_uploads");

            res.status(200).send("Successfully analyzed the documents and created a collection in ChromaDB");

        } 
        
        else {
            res.status(400).send("Failed to create a collection in ChromaDB");
        }

    }

    catch (error) {

        console.log(error);
        res.status(500).send(error.message);

    }

});

// Export the analyze router
module.exports = analyzeRouter;