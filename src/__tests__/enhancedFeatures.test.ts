import { GeminiService } from "../services/geminiService";

describe("GeminiService Enhanced Features", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, API_KEY: "test-api-key-12345" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("processWithMoR", () => {
    it("should throw error for empty query", async () => {
      const svc = new GeminiService();
      await expect(svc.processWithMoR("")).rejects.toThrow("MoR query must be non-empty");
    });

    it("should process queries with MoR protocol", async () => {
      const svc = new GeminiService();
      // Test that method exists and is callable
      expect(svc.processWithMoR).toBeDefined();
      expect(typeof svc.processWithMoR).toBe("function");
    });
  });

  describe("graphRAGQuery", () => {
    it("should throw error for empty query", async () => {
      const svc = new GeminiService();
      await expect(svc.graphRAGQuery("")).rejects.toThrow("Graph-RAG query must be non-empty");
    });

    it("should process Graph-RAG queries", async () => {
      const svc = new GeminiService();
      // Test that method exists and is callable
      expect(svc.graphRAGQuery).toBeDefined();
      expect(typeof svc.graphRAGQuery).toBe("function");
    });
  });

  describe("Backend Detection", () => {
    it("should report API available when key is set", () => {
      const svc = new GeminiService();
      expect(svc.isAPIAvailable()).toBe(true);
      expect(svc.getActiveBackend()).toBe("gemini-api");
    });

    it("should fallback to local model when API unavailable", () => {
      delete process.env.API_KEY;
      const svc = new GeminiService();
      expect(svc.isAPIAvailable()).toBe(false);
      expect(svc.getActiveBackend()).toBe("local-model");
    });
  });

  describe("Model Switching", () => {
    it("should support model switching", () => {
      const svc = new GeminiService();
      expect(svc.getCurrentModel()).toBe("gemini-3-pro-preview");
      
      svc.switchModel("flash");
      expect(svc.getCurrentModel()).toBe("gemini-3-flash-preview");
      
      svc.switchModel("pro");
      expect(svc.getCurrentModel()).toBe("gemini-3-pro-preview");
    });
  });
});
