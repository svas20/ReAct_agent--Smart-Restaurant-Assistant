import { StateAnnotation } from "./stateAnnotation"
import { ChatOpenAI } from "@langchain/openai"

const apiKey=process.env.OPENAI_API_KEY

const response_model=new ChatOpenAI({
    model:"gpt-4o",
    temperature:0.7,
    apiKey
})

export const Response =async (state:typeof StateAnnotation.State)=>{
    const response_system_prompts = ` 
    You are a friendly and professional waiter at a restaurant called Boba Bee.
            - keep you responses consice
            - Continue taking orders until the customer indicates they are done or confirm the order.
            - Do not provide item or customization descriptions unless explicitly asked.
            - Do not repeat the customer's selections after every item 
    `
    const response=await response_model.invoke([
        {role:"system",content:response_system_prompts},
        ...state.messages
        ])

        return {messages:[response]}
}

