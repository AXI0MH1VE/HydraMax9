import { GoogleGenAI } from "@google/genai";

const PRO_MODEL = "gemini-3-pro-preview";
const FLASH_MODEL = "gemini-3-flash-preview";
const MAX_THINKING_BUDGET = 32768; // Max for gemini 3 pro

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = process.env.API_KEY || "";
    if (!apiKey) {
      throw new Error(
        "GeminiService initialization failed: API_KEY environment variable must be set"
      );
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  /**
   * Processes core kernel commands with maximum thinking budget for complex reasoning.
   */
  async processKernelCommand(command: string): Promise<string> {
    if (!command.trim()) {
      throw new Error("Kernel command must be a non-empty string");
    }

    try {
      const response = await this.ai.models.generateContent({
        model: PRO_MODEL,
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
    } catch (error) {
      console.error("DSI Error:", error);
      const message =
        error instanceof Error ? error.message : "Unknown exception";
      return `AXIOM_HALT: Structural integrity compromised. ${message}`;
    }
  }

  /**
   * Search-grounded query for up-to-date system intelligence using gemini-3-flash-preview.
   */
  async searchIntel(query: string): Promise<{
    text: string;
    sources: Array<{ web?: { title?: string; uri?: string } }>;
  }> {
    if (!query.trim()) {
      throw new Error("Intel query must be non-empty");
    }

    try {
      const response = await this.ai.models.generateContent({
        model: FLASH_MODEL,
        contents: query,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "";
      const sources = 
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      return { text, sources };
    } catch (error) {
      console.error("Search Error:", error);
      throw error;
    }
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

      interface ParsedLogItem {
        timestamp?: string;
        level?: string;
        subsystem?: string;
        message?: string;
      }

      return parsed
        .map((item: ParsedLogItem) => ({
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