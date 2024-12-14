import { StateAnnotation } from "./stateAnnotation";
export function shouldRetrieve(state: typeof StateAnnotation.State): string {
    const { messages } = state;
    //console.log("---DECIDE TO RETRIEVE---");
    const lastMessage = messages[messages.length - 1];
    //console.log("last_message in should_retrieve",lastMessage)
  
    if ("tool_calls" in lastMessage && Array.isArray(lastMessage.tool_calls) && lastMessage.tool_calls.length ) {
      //console.log("---DECISION: RETRIEVE---");
      return "toolNode";
    }
    return "Response";
  }