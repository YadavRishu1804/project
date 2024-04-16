// THIS FILE IS FOR STORING ALL THE CONFIGURATIONS OF THE BACKEND

// Load all the environment variables from the .env file
require('dotenv').config();

// Using azure ai-form-recognizer to perform OCR on the documents
const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// Using azure storage-blob to store the documents
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

// Using chromadb to store the embedding vectors of the documents
const { ChromaClient } = require('chromadb')

// Using openai to perform text-embedding and text-generation
const { OpenAI } = require("openai");

// Initialize Azure Cognitive Services client
const documentAnalysisClient = new DocumentAnalysisClient(
    process.env.azureAiFormRecognizerENDPOINT,
    new AzureKeyCredential(process.env.azureAiFormRecognizerAPIKEY)
);

// Initialize Azure Blob Storage client
const blobServiceClient = new BlobServiceClient(
    process.env.azureBlobStorageENDPOINT,
    new StorageSharedKeyCredential(process.env.azureBlobStorageACCOUNTNAME, process.env.azureBlobStorageAPIKEY)
);

// Initialize ChromaDB client
const ChromaDBclient = new ChromaClient();

// Initialize OpenAI client
const openaiClient = new OpenAI({ apiKey: process.env.openAiAPIKEY });

// Define the port for the backend server
const PORT = process.env.PORT;

// Export the clients
module.exports = {
    documentAnalysisClient,
    blobServiceClient,
    ChromaDBclient,
    openaiClient,
    PORT
};