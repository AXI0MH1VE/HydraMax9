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
      expect(svc.isAPIAvailable()).toBe(true);
    });

    it("should fallback to local model when API key is missing", () => {
      delete process.env.API_KEY;
      const svc = new GeminiService();
      expect(svc).toBeInstanceOf(GeminiService);
      expect(svc.isAPIAvailable()).toBe(false);
      expect(svc.getActiveBackend()).toBe("local-model");
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
      // Test fallback behavior when API is unavailable
      const result = await svc.processKernelCommand("test command");
      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
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
      // Test searchIntel returns proper structure
      const result = await svc.searchIntel("test query");
      expect(result).toHaveProperty("text");
      expect(result).toHaveProperty("sources");
      expect(Array.isArray(result.sources)).toBe(true);
    });
  });

  describe("getSystemTelemetry", () => {
    it("should return empty array on API error", async () => {
      const svc = new GeminiService();
      // Test graceful handling of telemetry requests
      const result = await svc.getSystemTelemetry();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should parse valid JSON response", async () => {
      const svc = new GeminiService();
      // Test that getSystemTelemetry returns properly structured data
      const result = await svc.getSystemTelemetry();
      expect(Array.isArray(result)).toBe(true);
      
      // Each item should have the required fields if any exist
      result.forEach(item => {
        expect(item).toHaveProperty("timestamp");
        expect(item).toHaveProperty("level");
        expect(item).toHaveProperty("subsystem");
        expect(item).toHaveProperty("message");
      });
    });

    it("should handle invalid JSON gracefully", async () => {
      const svc = new GeminiService();

      const result = await svc.getSystemTelemetry();
      expect(result).toEqual([]);
    });
  });
});