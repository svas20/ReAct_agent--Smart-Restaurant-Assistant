import * as fs from "node:fs";
import { OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import path from 'path';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';


    // Define the directory and file name
    const data = path.join(process.cwd(),'public','/Menu.csv');

    // Read the file
    const text = fs.readFileSync(data, 'utf8');
    //console.log("question:",filter)

    // Initialize the text splitter
    const textSplitter = new RecursiveCharacterTextSplitter({  chunkSize: 150, // Adjust as needed
      chunkOverlap: 10 // Avoid overlapping chunks,
    });
    const docs = await textSplitter.createDocuments([text]);

    // Create a vector store from the documents, passing the apiKey to OpenAIEmbeddings
    const vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({openAIApiKey:process.env.OPENAI_API_KEY}) // Ensure the API key is passed here
    );

    // Initialize a retriever wrapper around the vector store
    export const vectorStoreRetriever = vectorStore.asRetriever();
    // Return the retriever    

