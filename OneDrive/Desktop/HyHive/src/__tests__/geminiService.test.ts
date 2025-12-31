import { GeminiService } from "../services/geminiService";

describe("GeminiService", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, API_KEY: "test-api-key-12345" };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("constructor", () => {
    it("should initialize with valid API key", () => {
      const svc = new GeminiService();
      expect(svc).toBeInstanceOf(GeminiService);
    });

    it("should throw error when API key is missing", () => {
      delete process.env.API_KEY;
      expect(() => new GeminiService()).toThrow(
        /API_KEY environment variable must be set/
      );
    });
  });

  describe("processKernelCommand", () => {
    it("should throw error for empty command", async () => {
      const svc = new GeminiService();
      await expect(svc.processKernelCommand("")).rejects.toThrow(
        "Kernel command must be a non-empty string"
      );
    });

    it("should handle API errors gracefully", async () => {
      const svc = new GeminiService();
      // Mock the AI service to throw an error
      jest.spyOn(svc["ai"].models, "generateContent").mockRejectedValue(
        new Error("API connection failed")
      );

      const result = await svc.processKernelCommand("test command");
      expect(result).toContain("AXIOM_HALT");
      expect(result).toContain("Structural integrity compromised");
    });
  });

  describe("searchIntel", () => {
    it("should throw error for empty query", async () => {
      const svc = new GeminiService();
      await expect(svc.searchIntel("")).rejects.toThrow(
        "Intel query must be non-empty"
      );
    });

    it("should return empty sources array when no grounding metadata", async () => {
      const svc = new GeminiService();
      jest.spyOn(svc["ai"].models, "generateContent").mockResolvedValue({
        text: "Test response",
        candidates: [],
      });

      const result = await svc.searchIntel("test query");
      expect(result.text).toBe("Test response");
      expect(result.sources).toEqual([]);
    });
  });

  describe("getSystemTelemetry", () => {
    it("should return empty array on API error", async () => {
      const svc = new GeminiService();
      jest.spyOn(svc["ai"].models, "generateContent").mockRejectedValue(
        new Error("API error")
      );

      const result = await svc.getSystemTelemetry();
      expect(result).toEqual([]);
    });

    it("should parse valid JSON response", async () => {
      const svc = new GeminiService();
      const mockResponse = {
        text: JSON.stringify([
          {
            timestamp: "2024-01-01T00:00:00Z",
            level: "INFO",
            subsystem: "CORE",
            message: "System initialized",
          },
        ]),
      };
      jest.spyOn(svc["ai"].models, "generateContent").mockResolvedValue(mockResponse);

      const result = await svc.getSystemTelemetry();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0].level).toBe("INFO");
    });

    it("should handle invalid JSON gracefully", async () => {
      const svc = new GeminiService();
      jest.spyOn(svc["ai"].models, "generateContent").mockResolvedValue({
        text: "invalid json",
      });

      const result = await svc.getSystemTelemetry();
      expect(result).toEqual([]);
    });
  });
});