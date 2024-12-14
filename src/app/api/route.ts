
import { NextRequest, NextResponse } from "next/server";
import { graph } from "./graph";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { input } = body;
    const configurable= { configurable:{
        thread_id:"thread_test",
    }}

    const response=await graph.invoke({
        messages:[
            {
            role:"user",
            content:input
            }   
        ]    
    },configurable)

    // for await (const value of response) {
    //     console.log("---STEP---");
    //     console.log(value);
    //     console.log("---END STEP---");
    //   }
    //console.log(response)
    //console.log(graph)

    console.log(response.messages[response.messages.length-1].content)
    return NextResponse.json(response.messages[response.messages.length-1].content);

}    

     




    