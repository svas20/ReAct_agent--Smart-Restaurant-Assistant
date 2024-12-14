// state_annotation.ts
import { MessagesAnnotation } from "@langchain/langgraph";
import { Annotation } from "@langchain/langgraph";

export const StateAnnotation = Annotation.Root({
  ...MessagesAnnotation.spec,
});
