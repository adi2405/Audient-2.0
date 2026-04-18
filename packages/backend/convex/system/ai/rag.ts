import { RAG } from "@convex-dev/rag";
import { google } from "@ai-sdk/google";

import { components } from "../../_generated/api";

const rag = new RAG(components.rag, {
  textEmbeddingModel: google.embeddingModel("gemini-embedding-001"),
  embeddingDimension: 3072,
});

export default rag;
