export type AxiomLogLevel = "INFO" | "WARN" | "ERROR";

export interface AxiomSystemLog {
  timestamp: string;
  level: AxiomLogLevel;
  subsystem: string;
  message: string;
}

export interface GeminiIntelResult {
  text: string;
  sources: {
    web?: {
      title?: string;
      uri?: string;
    };
    [key: string]: unknown;
  }[];
}

export interface TelemetryPoint {
  t: number;
  value: number;
}

export interface SecurityEvent {
  id: string;
  code: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  message: string;
  ts: string;
  entropy?: number; // Optional entropy value for monitoring
}

export interface EntropyMetrics {
  currentEntropy: number;
  averageEntropy: number;
  entropyThreshold: number;
  violations: number;
}

export interface AnomalyDetectionResult {
  isAnomaly: boolean;
  confidence: number;
  reason: string;
}

export type PageId = "overview" | "tactical" | "intel" | "kernel";
