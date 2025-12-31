import { GeminiService } from "../services/geminiService";

describe("Enhanced AXIOM HIVE Features", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, API_KEY: "test-api-key-12345" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("GeminiService - Model Switching", () => {
    it("should initialize with pro model by default", () => {
      const svc = new GeminiService();
      expect(svc.getCurrentModel()).toBe("gemini-3-pro-preview");
    });

    it("should switch to flash model", () => {
      const svc = new GeminiService();
      svc.switchModel("flash");
      expect(svc.getCurrentModel()).toBe("gemini-3-flash-preview");
    });

    it("should switch to pro model explicitly", () => {
      const svc = new GeminiService();
      svc.switchModel("pro");
      expect(svc.getCurrentModel()).toBe("gemini-3-pro-preview");
    });
  });

  describe("GeminiService - MoR Support", () => {
    it("should throw error for empty MoR query", async () => {
      const svc = new GeminiService();
      await expect(svc.processWithMoR("")).rejects.toThrow(
        "MoR query must be non-empty"
      );
    });

    it("should handle base case (recursion depth = 0)", async () => {
      const svc = new GeminiService();
      jest.spyOn(svc["ai"].models, "generateContent").mockResolvedValue({
        text: "Test response",
        data: {},
        functionCalls: [],
        executableCode: undefined,
        codeExecutionResult: undefined,
      });

      const result = await svc.processWithMoR("test", 0);
      expect(result).toBe("Test response");
    });

    it("should handle recursive case", async () => {
      const svc = new GeminiService();
      const mockGenerate = jest.spyOn(svc["ai"].models, "generateContent");
      mockGenerate.mockResolvedValueOnce({
        text: "Analysis: query intent is X, key concepts: A, B, C",
        data: {},
        functionCalls: [],
        executableCode: undefined,
        codeExecutionResult: undefined,
      });
      mockGenerate.mockResolvedValueOnce({
        text: "Final response",
        data: {},
        functionCalls: [],
        executableCode: undefined,
        codeExecutionResult: undefined,
      });

      const result = await svc.processWithMoR("test", 1);
      expect(result).toBe("Final response");
      expect(mockGenerate).toHaveBeenCalledTimes(2);
    });

    it("should handle MoR errors gracefully", async () => {
      const svc = new GeminiService();
      jest.spyOn(svc["ai"].models, "generateContent").mockRejectedValue(
        new Error("API error")
      );

      const result = await svc.processWithMoR("test");
      expect(result).toContain("MOR_HALT");
      expect(result).toContain("Recursive processing failed");
    });
  });

  describe("GeminiService - Graph-RAG", () => {
    it("should throw error for empty Graph-RAG query", async () => {
      const svc = new GeminiService();
      await expect(svc.graphRAGQuery("")).rejects.toThrow(
        "Graph-RAG query must be non-empty"
      );
    });

    it("should return valid Graph-RAG response", async () => {
      const svc = new GeminiService();
      jest.spyOn(svc["ai"].models, "generateContent").mockResolvedValue({
        text: "Test response text",
        candidates: [{
          groundingMetadata: {
            groundingChunks: [
              {
                web: { title: "Test Source", uri: "https://test.com" },
              },
            ],
          },
        }],
        data: {},
        functionCalls: [],
        executableCode: undefined,
        codeExecutionResult: undefined,
      });
      jest.spyOn(svc as any, "validateAgainstOntology").mockResolvedValue(true);

      const result = await svc.graphRAGQuery("test query");
      expect(result.response).toBe("Test response text");
      expect(result.grounding).toHaveLength(1);
      expect(result.ontologyValid).toBe(true);
    });

    it("should handle Graph-RAG errors", async () => {
      const svc = new GeminiService();
      jest.spyOn(svc["ai"].models, "generateContent").mockRejectedValue(
        new Error("API error")
      );

      await expect(svc.graphRAGQuery("test")).rejects.toThrow("API error");
    });
  });

  describe("GeminiService - Ontology Validation", () => {
    it("should return true for empty constraints", async () => {
      const svc = new GeminiService();
      const result = await svc["validateAgainstOntology"]("test text", []);
      expect(result).toBe(true);
    });

    it("should validate against ontology constraints", async () => {
      const svc = new GeminiService();
      jest.spyOn(svc["ai"].models, "generateContent").mockResolvedValue({
        text: "VALID",
        data: {},
        functionCalls: [],
        executableCode: undefined,
        codeExecutionResult: undefined,
      });

      const result = await (svc as any)["validateAgainstOntology"](
        "test text",
        ["constraint1", "constraint2"]
      );
      expect(result).toBe(true);
    });

    it("should return false for invalid ontology", async () => {
      const svc = new GeminiService();
      jest.spyOn(svc["ai"].models, "generateContent").mockResolvedValue({
        text: "INVALID",
        data: {},
        functionCalls: [],
        executableCode: undefined,
        codeExecutionResult: undefined,
      });

      const result = await (svc as any)["validateAgainstOntology"](
        "test text",
        ["constraint1"]
      );
      expect(result).toBe(false);
    });

    it("should handle ontology validation errors", async () => {
      const svc = new GeminiService();
      jest.spyOn(svc["ai"].models, "generateContent").mockRejectedValue(
        new Error("Validation error")
      );

      const result = await svc["validateAgainstOntology"](
        "test text",
        ["constraint1"]
      );
      expect(result).toBe(false);
    });
  });

  describe("GeminiService - Fallback Mechanism", () => {
    it("should use primary function when successful", async () => {
      const svc = new GeminiService();
      const primaryFn = jest.fn().mockResolvedValue("Primary result");
      const fallbackFn = jest.fn().mockResolvedValue("Fallback result");

      const result = await svc["withFallback"]<string>(primaryFn, fallbackFn);
      expect(result).toBe("Primary result");
      expect(primaryFn).toHaveBeenCalled();
      expect(fallbackFn).not.toHaveBeenCalled();
    });

    it("should use fallback function when primary fails", async () => {
      const svc = new GeminiService();
      const primaryFn = jest.fn().mockRejectedValue(new Error("Primary failed"));
      const fallbackFn = jest.fn().mockResolvedValue("Fallback result");

      const result = await svc["withFallback"]<string>(primaryFn, fallbackFn);
      expect(result).toBe("Fallback result");
      expect(primaryFn).toHaveBeenCalled();
      expect(fallbackFn).toHaveBeenCalled();
    });

    it("should handle fallback errors", async () => {
      const svc = new GeminiService();
      const primaryFn = jest.fn().mockRejectedValue(new Error("Primary failed"));
      const fallbackFn = jest.fn().mockRejectedValue(new Error("Fallback failed"));

      await expect(
        svc["withFallback"]<string>(primaryFn, fallbackFn)
      ).rejects.toThrow("Fallback failed");
    });
  });

  describe("GeminiService - Enhanced Methods with Fallback", () => {
    it("should use fallback in processKernelCommand", async () => {
      const svc = new GeminiService();
      const mockGenerate = jest.spyOn(svc["ai"].models, "generateContent");
      mockGenerate.mockRejectedValueOnce(new Error("Primary failed"));
      mockGenerate.mockResolvedValueOnce({
        text: "Fallback response",
        data: {},
        functionCalls: [],
        executableCode: undefined,
        codeExecutionResult: undefined,
      });

      const result = await svc.processKernelCommand("test command");
      expect(result).toBe("Fallback response");
      expect(mockGenerate).toHaveBeenCalledTimes(2);
    });

    it("should use fallback in searchIntel", async () => {
      const svc = new GeminiService();
      const mockGenerate = jest.spyOn(svc["ai"].models, "generateContent");
      mockGenerate.mockRejectedValueOnce(new Error("Primary failed"));
      mockGenerate.mockResolvedValueOnce({
        text: "Fallback response",
        candidates: [],
        data: {},
        functionCalls: [],
        executableCode: undefined,
        codeExecutionResult: undefined,
      });

      const result = await svc.searchIntel("test query");
      expect(result.text).toBe("Fallback response");
      expect(mockGenerate).toHaveBeenCalledTimes(2);
    });
  });
});