
import { init_support } from "./init_support";
import { StateGraph } from "@langchain/langgraph";
import { START,END } from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import { toolNode } from "./init_support";
import { shouldRetrieve } from "./should_retrieve";
import { Response } from "./Response";
import { StateAnnotation } from "./stateAnnotation";
import fs from 'fs/promises';
import path from 'path';



//console.log("StateAnnotation",StateAnnotation)

const workflow=new StateGraph(StateAnnotation)
.addNode("init_support",init_support)
.addNode("toolNode",toolNode)
// .addNode("Query",Query)
.addNode("Response",Response)
.addEdge("__start__","init_support")


// workflow.addConditionalEdges("init_support",shouldRetrieve,{
//     toolNode:"toolNode",
//     __end__:"__end__"
//     })
    .addConditionalEdges("init_support",shouldRetrieve,{
        Response:"Response",
        toolNode:"toolNode"
    })
    // .addConditionalEdges("Response",shouldRetrieve,{
    //     toolNode:"toolNode",
    //     __end__:"__end__"
    // })
    //.addEdge("Query","__end__")
      .addEdge("toolNode","init_support")
    .addEdge("Response","__end__")
const check_pointer=new MemorySaver()



export const graph = workflow.compile({checkpointer:check_pointer});


// const messages = (await graph.getState(configurable)).values.messages;
//         console.dir(
//           messages.map((msg:any) => ({
//             id: msg.id,
//             type: msg._getType(),
//             content: msg.content,
//             tool_calls:
//             msg.tool_calls,
//           })),
//           { depth: null }
//         );


const representation = graph.getGraph();
const image = await representation.drawMermaidPng();
const arrayBuffer = await image.arrayBuffer();

// Convert ArrayBuffer to Buffer
const buffer = Buffer.from(new Uint8Array(arrayBuffer));

// Save the image to the file system
const outputPath = path.join(process.cwd(), 'output.png');
await fs.writeFile(outputPath, buffer);

console.log(`Graph saved as PNG at: ${outputPath}`);