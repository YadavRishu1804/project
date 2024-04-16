// THIS FILE IS FOR SETTING UP THE FUNCTIONS OF CHROMA-DB

// Load the environment variables from the .env file
require('dotenv').config();

// Using the chromadb client initialized in config.js
const { ChromaDBclient } = require('../config');

// Using the OpenAIEmbeddingFunction from chromadb
const { OpenAIEmbeddingFunction } = require('chromadb');

// Function to get or create a new chroma collection
async function getOrCreateNewChromaCollection(name) {
    const chroma_bot_collection = await ChromaDBclient.getOrCreateCollection({
        name: name, embeddingFunction: new OpenAIEmbeddingFunction({
            openai_api_key: process.env.openAiAPIKEY,
            model_name: "text-embedding-3-large"
        })
    });
    return chroma_bot_collection;
}

// Function to add a document to a chroma collection
async function addDocumentToChromaCollection(collection, ids, metadatas, documents) {
    await collection.add({ ids: ids, metadatas: metadatas, documents: documents });
}

// Function to query a chroma collection
async function queryChromaCollection(collection, query, k) {
    const result = await collection.query({ queryTexts: query, nResults: k });
    return result;
}

// Fuction to list all the collections
async function listAllCollections() {
    const collections = await ChromaDBclient.listCollections();
    return collections;
}

// Function to delete a collection
async function deleteCollectionOfName(name) {
    await ChromaDBclient.deleteCollection({ name: name });
}

// Export the functions
module.exports = { getOrCreateNewChromaCollection, addDocumentToChromaCollection, 
    queryChromaCollection, listAllCollections, deleteCollectionOfName };