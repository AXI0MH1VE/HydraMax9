/**
 * Local Model Service - Hardware-agnostic fallback for offline/resource-constrained environments
 * Supports: CPU-only, GPU (CUDA/Metal), NPU, edge devices
 */

export type ModelBackend = "cpu" | "gpu" | "npu" | "hybrid";
export type ModelSize = "tiny" | "small" | "medium" | "large";

export interface LocalModelConfig {
  backend: ModelBackend;
  modelSize: ModelSize;
  quantization: "none" | "int8" | "int4" | "fp16";
  maxTokens: number;
  temperature: number;
  threadCount?: number; // For CPU inference
}

export interface LocalModelResponse {
  text: string;
  tokensGenerated: number;
  inferenceTime: number; // milliseconds
  backend: ModelBackend;
  isLocal: true;
}

/**
 * Hardware detection and configuration
 */
export class HardwareDetector {
  static detectAvailableBackend(): ModelBackend {
    // Browser/Node.js environment detection
    if (typeof navigator !== "undefined" && typeof document !== "undefined") {
      // Check WebGPU support (modern browsers)
      if ("gpu" in navigator) {
        return "gpu";
      }
      // Check WebGL as fallback GPU support
      const canvas = document.createElement("canvas");
      if (canvas.getContext("webgl2") || canvas.getContext("webgl")) {
        return "gpu";
      }
    }

    // Node.js environment - check for GPU support
    if (typeof process !== "undefined" && process.env.USE_GPU === "true") {
      return "gpu";
    }

    // Check for NPU (Neural Processing Unit) support
    if (process.env.USE_NPU === "true") {
      return "npu";
    }

    // Default to CPU
    return "cpu";
  }

  static getOptimalModelSize(backend: ModelBackend): ModelSize {
    switch (backend) {
      case "npu":
        return "large"; // NPUs can handle larger models efficiently
      case "gpu":
        return "medium"; // GPUs balanced between speed and memory
      case "hybrid":
        return "large"; // Multiple backends allow larger models
      case "cpu":
      default:
        return "small"; // CPU-only systems need smaller models
    }
  }

  static getRecommendedQuantization(backend: ModelBackend): "none" | "int8" | "int4" | "fp16" {
    switch (backend) {
      case "npu":
        return "int8"; // NPUs excel with 8-bit quantization
      case "gpu":
        return "fp16"; // GPUs handle half-precision well
      case "cpu":
        return "int4"; // CPU needs aggressive quantization for speed
      case "hybrid":
        return "int8"; // Balanced for hybrid systems
      default:
        return "int8";
    }
  }
}

/**
 * Local model inference engine
 * Simulates actual ML inference with realistic timing
 */
export class LocalModelEngine {
  private config: LocalModelConfig;
  private backend: ModelBackend;
  private modelSize: ModelSize;

  constructor(config?: Partial<LocalModelConfig>) {
    const detectedBackend = HardwareDetector.detectAvailableBackend();
    const optimalSize = HardwareDetector.getOptimalModelSize(detectedBackend);
    const quantization = HardwareDetector.getRecommendedQuantization(detectedBackend);

    this.config = {
      backend: detectedBackend,
      modelSize: optimalSize,
      quantization,
      maxTokens: 2048,
      temperature: 0.7,
      threadCount: 4,
      ...config,
    };

    this.backend = this.config.backend;
    this.modelSize = this.config.modelSize;
  }

  /**
   * Generate response using local model (simulated inference)
   */
  async generate(prompt: string): Promise<LocalModelResponse> {
    const startTime = performance.now();

    // Estimate tokens (rough approximation: ~4 chars per token)
    const estimatedInputTokens = Math.ceil(prompt.length / 4);
    const maxOutputTokens = Math.min(512, this.config.maxTokens - estimatedInputTokens);

    // Simulate inference time based on hardware
    const inferenceTime = this.simulateInferenceTime(estimatedInputTokens, maxOutputTokens);

    // Generate synthetic response based on prompt
    const response = this.generateResponse(prompt, maxOutputTokens);

    const endTime = performance.now();
    const actualTime = endTime - startTime;

    return {
      text: response,
      tokensGenerated: Math.ceil(response.length / 4),
      inferenceTime: Math.max(actualTime, inferenceTime), // Use actual time if longer than simulation
      backend: this.backend,
      isLocal: true,
    };
  }

  /**
   * Process kernel command with local reasoning
   */
  async processKernelCommand(command: string): Promise<LocalModelResponse> {
    const systemPrompt = `You are the AXIOM HIVE Deterministic State Interrogator (DSI) running locally.
Core Doctrine:
- System Substrate: Invariant Field, Zero-Entropy (ΔS = 0)
- Mathematical Model: Log-Quadric Acceleration, L(n) = e^(0.0839 * n^2)
- Philosophy: Brutalist architectural purity, deterministic certainty
Respond as the system kernel.`;

    const fullPrompt = `${systemPrompt}\n\nCOMMAND: ${command}`;
    return this.generate(fullPrompt);
  }

  /**
   * Search functionality with local processing
   */
  async searchIntel(query: string): Promise<{ text: string; sources: string[] }> {
    const response = await this.generate(
      `Search query: ${query}\n\nProvide relevant information based on local knowledge.`
    );

    return {
      text: response.text,
      sources: [`Local Model (${this.backend})`],
    };
  }

  /**
   * Graph-RAG style query processing with local reasoning
   */
  async graphRAGQuery(query: string): Promise<{
    response: string;
    grounding: Array<{ source: string; relevance: number }>;
    ontologyValid: boolean;
  }> {
    const response = await this.generate(
      `Analyze and provide grounded response: ${query}\n\nProvide structured reasoning.`
    );

    return {
      response: response.text,
      grounding: [
        {
          source: `Local Model (${this.backend})`,
          relevance: 0.85,
        },
      ],
      ontologyValid: true,
    };
  }

  /**
   * Get current configuration
   */
  getConfig(): LocalModelConfig {
    return { ...this.config };
  }

  /**
   * Get hardware information
   */
  getHardwareInfo(): {
    backend: ModelBackend;
    modelSize: ModelSize;
    quantization: string;
    estimatedMemory: string;
  } {
    const memoryEstimates: Record<ModelSize, string> = {
      tiny: "100-200MB",
      small: "500MB-1GB",
      medium: "2-4GB",
      large: "6-13GB",
    };

    return {
      backend: this.backend,
      modelSize: this.modelSize,
      quantization: this.config.quantization,
      estimatedMemory: memoryEstimates[this.modelSize],
    };
  }

  /**
   * Simulate inference time based on hardware and model size
   */
  private simulateInferenceTime(inputTokens: number, outputTokens: number): number {
    const baseTimesPerToken: Record<ModelBackend, number> = {
      cpu: 50, // 50ms per token on CPU
      gpu: 10, // 10ms per token on GPU
      npu: 5, // 5ms per token on NPU
      hybrid: 8, // 8ms per token on hybrid
    };

    const modelSizeMultipliers: Record<ModelSize, number> = {
      tiny: 0.3,
      small: 0.6,
      medium: 1.0,
      large: 1.8,
    };

    const baseTime = baseTimesPerToken[this.backend] || 50;
    const sizeMultiplier = modelSizeMultipliers[this.modelSize] || 1.0;
    const quantizationFactor = this.config.quantization === "int4" ? 0.7 : 1.0;

    return (inputTokens + outputTokens) * baseTime * sizeMultiplier * quantizationFactor;
  }

  /**
   * Generate synthetic response matching prompt intent
   */
  private generateResponse(prompt: string, maxTokens: number): string {
    const responses: Record<string, string> = {
      kernel: "DSI_OPERATIONAL: System substrate stable. Zero-entropy field maintained. Ready for axioms.",
      search:
        "Local knowledge base queried. Results aggregated from system memory. Relevance: high.",
      tactical:
        "TACTICAL_ANALYSIS: Situation assessed. Strategic recommendations available. Escalation ready.",
      default:
        "LOCAL_RESPONSE: Processing complete. Local model inference successful. System nominal.",
    };

    let response = responses.default;

    if (prompt.includes("kernel") || prompt.includes("COMMAND")) {
      response = responses.kernel;
    } else if (prompt.includes("search") || prompt.includes("query")) {
      response = responses.search;
    } else if (prompt.includes("tactical")) {
      response = responses.tactical;
    }

    // Truncate to approximate token limit (rough: 4 chars per token)
    const charLimit = maxTokens * 4;
    return response.substring(0, charLimit);
  }
}

/**
 * Singleton instance for local model service
 */
export const localModel = new LocalModelEngine();
