import { createRetrieverTool } from "langchain/tools/retriever";
import { vectorStoreRetriever } from "./retriever";
import { ChatOpenAI } from "@langchain/openai";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { order_tool } from "./Ordered";
import { StateAnnotation } from "./stateAnnotation";

const apiKey=process.env.OPENAI_API_KEY

const retriever_tool=createRetrieverTool(vectorStoreRetriever,{
    name:"Menu",
    description:"Retrieves available menu items based on user queries.",

})

export const tools=[retriever_tool,order_tool]
export const toolNode = new ToolNode<typeof StateAnnotation.State>(tools);


const initial_support_model=new ChatOpenAI({
    model:"gpt-4o",
    temperature:0.7,
    apiKey
    }).bindTools(tools)

export const init_support=async (state:typeof StateAnnotation.State)=>{
    const query_prompt=`
        You are a frontline waiter at a boba tea restaurant.
            - Respond concisely to basic questions.
            - Use the Menu for accurate recommendations or details when asked.
            - If the customer places an order, use the "Ordered" tool to process it by passing all details related to the item, including its name, quantity, price , ensuring it matches an item listed in the menu. 
        `
    const init_response = await initial_support_model.invoke([
        {role:"system",content:query_prompt},
        ...state.messages,
    ])

    // console.log("response",init_response)
    // console.log("...state.messages",...state.messages)
    // console.log("state",state)
    // console.log("state.messages",state.messages)

   return {messages:[init_response]}
}
