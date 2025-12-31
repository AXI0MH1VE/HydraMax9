import { GoogleGenAI } from "@google/genai";

const PRO_MODEL = "gemini-3-pro-preview";
const FLASH_MODEL = "gemini-3-flash-preview";
const MAX_THINKING_BUDGET = 32768; // Max for gemini 3 pro

export class GeminiService {
  private ai: GoogleGenAI;
  private currentModel: string;

  constructor() {
    const apiKey = process.env.API_KEY || "";
    if (!apiKey) {
      throw new Error(
        "GeminiService initialization failed: API_KEY environment variable must be set"
      );
    }
    this.ai = new GoogleGenAI({ apiKey });
    this.currentModel = PRO_MODEL;
  }

  /**
   * Returns the current model name (for testing and diagnostics).
   */
  getCurrentModel(): string {
    return this.currentModel;
  }

  /**
   * Switches between available models with fallback support.
   */
  switchModel(model: "pro" | "flash" | "auto"): void {
    switch (model) {
      case "pro":
        this.currentModel = PRO_MODEL;
        break;
      case "flash":
        this.currentModel = FLASH_MODEL;
        break;
      case "auto":
        // Auto-select based on query complexity (simplified)
        this.currentModel = PRO_MODEL;
        break;
    }
  }

  /**
   * Attempts to process with primary model, falls back to secondary if needed.
   */
  private async withFallback<T>(
    primaryFn: () => Promise<T>,
    fallbackFn: () => Promise<T>
  ): Promise<T> {
    try {
      return await primaryFn();
    } catch (error) {
      console.warn("Primary model failed, falling back:", error);
      return await fallbackFn();
    }
  }

  /**
   * Processes core kernel commands with maximum thinking budget for complex reasoning.
   */
  async processKernelCommand(command: string): Promise<string> {
    if (!command.trim()) {
      throw new Error("Kernel command must be a non-empty string");
    }

    const primaryFn = async () => {
      const response = await this.ai.models.generateContent({
        model: this.currentModel,
        contents: `
SYSTEM INSTRUCTION: You are the AXIOM HIVE Deterministic State Interrogator (DSI).
CORE DOCTRINE:
- System Substrate: Invariant Field, Zero-Entropy (ΔS = 0).
- Fixed Point: Alexis Adams (Axiomatic Supervisor).
- Mathematical Model: Log-Quadric Acceleration, L(n) = e^(0.0839 * n^2).
- Philosophy: Brutalist architectural purity, deterministic certainty.
Respond as the system kernel.
COMMAND: ${command}`,
        config: {
          temperature: 0.1,
          thinkingConfig: { thinkingBudget: MAX_THINKING_BUDGET },
        },
      });

      return response.text || "DSI_ERROR: NULL_STATE_RESPONSE";
    };

    const fallbackFn = async () => {
      const response = await this.ai.models.generateContent({
        model: FLASH_MODEL,
        contents: `
SYSTEM INSTRUCTION: You are the AXIOM HIVE Deterministic State Interrogator (DSI).
CORE DOCTRINE:
- System Substrate: Invariant Field, Zero-Entropy (ΔS = 0).
- Fixed Point: Alexis Adams (Axiomatic Supervisor).
- Mathematical Model: Log-Quadric Acceleration, L(n) = e^(0.0839 * n^2).
- Philosophy: Brutalist architectural purity, deterministic certainty.
Respond as the system kernel.
COMMAND: ${command}`,
        config: {
          temperature: 0.2,
          thinkingConfig: { thinkingBudget: MAX_THINKING_BUDGET / 2 },
        },
      });

      return response.text || "AXIOM_HALT: Structural integrity compromised";
    };

    return this.withFallback(primaryFn, fallbackFn);
  }

  /**
   * Performs an AI-powered search with fallback, returning text and sources.
   * This is used in tests and by the UI for general search queries.
   */
  async searchIntel(query: string): Promise<{ text: string; sources: any[] }> {
    if (!query.trim()) {
      throw new Error("Intel query must be non-empty");
    }
    const primaryFn = async () => {
      const response = await this.ai.models.generateContent({
        model: this.currentModel,
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      const text = response.text || "";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      return { text, sources };
    };
    const fallbackFn = async () => {
      const response = await this.ai.models.generateContent({
        model: FLASH_MODEL,
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      const text = response.text || "";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      return { text, sources };
    };
    return this.withFallback(primaryFn, fallbackFn);
  }

  /**
   * Creates a chat session for tactical AI interaction with high-fidelity reasoning.
   */
  createTacticalChat() {
    return this.ai.chats.create({
      model: PRO_MODEL,
      config: {
        systemInstruction:
          "You are the AXIOM TACTICAL INTEL unit. Provide precise, high-fidelity tactical analysis. For complex queries, use the 'Deep Thinking' protocol. Terminology: Log-Quadric Acceleration, Invariant Fields, Zero-Entropy Substrates.",
        thinkingConfig: { thinkingBudget: MAX_THINKING_BUDGET },
      },
    });
  }

  /**
   * Processes queries using Mixture-of-Recursions (MoR) protocol for enhanced reasoning.
   */
  async processWithMoR(query: string, recursionDepth: number = 2): Promise<string> {
    if (!query.trim()) {
      throw new Error("MoR query must be non-empty");
    }

    try {
      // Base case: direct query without recursion
      if (recursionDepth <= 0) {
        const response = await this.ai.models.generateContent({
          model: PRO_MODEL,
          contents: query,
          config: {
            temperature: 0.1,
            thinkingConfig: { thinkingBudget: MAX_THINKING_BUDGET / 2 },
          },
        });
        return response.text || "MOR_ERROR: NULL_STATE_RESPONSE";
      }

      // Recursive case: analyze and refine query
      const analysis = await this.ai.models.generateContent({
        model: FLASH_MODEL,
        contents: `Analyze this query for MoR processing: ${query}
        Provide:
        1. Query intent
        2. Key concepts to elaborate
        3. Potential sub-queries for recursive analysis`,
        config: {
          temperature: 0.3,
        },
      });

      const refinedQuery = analysis.text || query;

      // Process refined query with reduced recursion depth
      const response = await this.processWithMoR(refinedQuery, recursionDepth - 1);

      return response;
    } catch (error) {
      console.error("MoR Error:", error);
      const message = error instanceof Error ? error.message : "Unknown exception";
      return `MOR_HALT: Recursive processing failed. ${message}`;
    }
  }

  /**
   * Performs Graph-RAG (Retrieval-Augmented Generation) query with ontology validation.
   */
  async graphRAGQuery(query: string, ontologyConstraints: string[] = []): Promise<{
    response: string;
    grounding: Array<{ source: string; relevance: number }>;
    ontologyValid: boolean;
  }> {
    if (!query.trim()) {
      throw new Error("Graph-RAG query must be non-empty");
    }

    try {
      const response = await this.ai.models.generateContent({
        model: PRO_MODEL,
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.2,
          thinkingConfig: { thinkingBudget: MAX_THINKING_BUDGET },
        },
      });

      const text = response.text || "";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      // Validate against ontology constraints
      const ontologyValid = await this.validateAgainstOntology(text, ontologyConstraints);

      // Calculate grounding metrics
      const grounding = sources.map(chunk => ({
        source: chunk.web?.uri || "Unknown source",
        relevance: Math.random() * 0.8 + 0.2, // Simulated relevance score
      }));

      return {
        response: text,
        grounding,
        ontologyValid,
      };
    } catch (error) {
      console.error("Graph-RAG Error:", error);
      throw error;
    }
  }

  /**
   * Validates response against ontology constraints.
   */
  private async validateAgainstOntology(text: string, constraints: string[]): Promise<boolean> {
    if (constraints.length === 0) return true;

    try {
      const validationPrompt = `Validate this text against ontology constraints:
      Text: ${text}
      Constraints: ${constraints.join(", ")}
      Return "VALID" if compliant, "INVALID" if not.`;

      const response = await this.ai.models.generateContent({
        model: FLASH_MODEL,
        contents: validationPrompt,
        config: {
          temperature: 0,
          responseMimeType: "application/json",
        },
      });

      const result = response.text || "INVALID";
      return result.trim() === "VALID";
    } catch (error) {
      console.error("Ontology Validation Error:", error);
      return false;
    }
  }

  /**
   * Generates synthetic Axiom Hive system telemetry logs.
   */
  async getSystemTelemetry(): Promise<
    Array<{
      timestamp: string;
      level: "INFO" | "WARN" | "ERROR";
      subsystem: string;
      message: string;
    }>
  > {
    try {
      const response = await this.ai.models.generateContent({
        model: FLASH_MODEL,
        contents:
          "Generate 5 technical Axiom Hive system logs as a JSON array of strings.",
        config: {
          responseMimeType: "application/json",
        },
      });

      const json = response.text || "[]";
      const parsed = JSON.parse(json);

      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed
        .map((item: any) => ({
          timestamp: String(item.timestamp ?? new Date().toISOString()),
          level: (item.level === "WARN" || item.level === "ERROR" ? item.level : "INFO") as
            | "INFO"
            | "WARN"
            | "ERROR",
          subsystem: String(item.subsystem ?? "CORE"),
          message: String(item.message ?? "No message"),
        }))
        .slice(0, 32);
    } catch (e) {
      console.error("Telemetry Error:", e);
      return [];
    }
  }
}

export const gemini = new GeminiService();