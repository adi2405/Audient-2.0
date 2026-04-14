import { google } from "@ai-sdk/google";
import { Agent } from "@convex-dev/agent";

import { components } from "../../../_generated/api";

export const supportAgent = new Agent(components.agent, {
  name: "Customer Support Agent",
  languageModel: google.chat("gemini-2.5-flash"),
  instructions: "You are a professional customer support agent",
});
