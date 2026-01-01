import {
  generateAIResponse,
  ConversationContext,
  SafetyEngine,
} from "../safety/SafetyEngine";
import { gemini } from "./geminiService";
import { localModel } from "./localModelService";

/**
 * Unified safety integration supporting both Gemini API and local models
 */
export async function handleUserInput(
  userInput: string,
  context: ConversationContext
): Promise<string> {
  // Check hard boundaries first
  if (SafetyEngine.checkHardBoundaries(userInput)) {
    return `SAFETY_BLOCK: Input violates hard boundaries. Backend: ${gemini.getActiveBackend()}`;
  }

  // Generate safety-checked response
  const safetyResponse = generateAIResponse(userInput, context);
  if (safetyResponse.blocked) {
    return safetyResponse.content;
  }

  // Determine which backend to use
  const backend = gemini.getActiveBackend();

  if (backend === "local-model") {
    // Process with local model
    const response = await localModel.generate(userInput);
    return response.text;
  }

  // Process with Gemini API
  try {
    const response = await gemini.processKernelCommand(userInput);
    return response;
  } catch (error) {
    console.error("Error processing input:", error);
    // Fallback to local model on error
    const response = await localModel.generate(userInput);
    return response.text;
  }
}

/**
 * Get information about active inference backend
 */
export function getBackendInfo(): {
  backend: "gemini-api" | "local-model";
  apiAvailable: boolean;
  hardware?: string;
} {
  const backend = gemini.getActiveBackend();
  return {
    backend,
    apiAvailable: gemini.isAPIAvailable(),
    hardware: backend === "local-model" ? localModel.getHardwareInfo().backend : undefined,
  };
}
