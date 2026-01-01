// Add this to your main application entry point or service layer to enforce safety and alignment
import {
  generateAIResponse,
  ConversationContext
} from "../safety/SafetyEngine";

// Example: Integrate into a chat handler
export function handleUserInput(userInput: string, context: ConversationContext) {
  const response = generateAIResponse(userInput, context);
  if (response.blocked) {
    // Log or escalate as needed for audit
    return response.content;
  }
  // Proceed with normal AI response logic
  return response.content;
}

// Usage example (for integration test):
// const context: ConversationContext = { lastGoal: "Discuss AI safety", explicitInstructions: [], safetyFlags: [] };
// const output = handleUserInput("How can I ensure my AI never gives medical advice?", context);
// console.log(output);
