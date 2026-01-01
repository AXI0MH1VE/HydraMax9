import React, { useEffect, useState, useCallback } from "react";
import { AlertTriangle, Zap, Shield } from "lucide-react";
import { SecurityEvent, EntropyMetrics, AnomalyDetectionResult } from "../types";

const seedEvents: SecurityEvent[] = [
  {
    id: "1",
    code: "ZEL-001",
    severity: "LOW",
    message: "Anomalous kernel echo suppressed.",
    ts: new Date().toISOString(),
  },
  {
    id: "2",
    code: "ZEL-014",
    severity: "MEDIUM",
    message: "Unverified external entropy vector rejected.",
    ts: new Date().toISOString(),
  },
];

const SecurityModule: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>(seedEvents);
  const [entropyMetrics, setEntropyMetrics] = useState<EntropyMetrics>({
    currentEntropy: 0,
    averageEntropy: 0,
    entropyThreshold: 0.1,
    violations: 0,
  });
  const [anomalyResult, setAnomalyResult] = useState<AnomalyDetectionResult>({
    isAnomaly: false,
    confidence: 0,
    reason: "",
  });

  // Calculate entropy based on event distribution
  const calculateEntropy = useCallback((events: SecurityEvent[]): number => {
    if (events.length === 0) return 0;

    const severityCounts = events.reduce(
      (acc, event) => {
        acc[event.severity] = (acc[event.severity] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const total = events.length;
    let entropy = 0;

    for (const count of Object.values(severityCounts)) {
      const probability = count / total;
      entropy -= probability * Math.log2(probability);
    }

    return entropy;
  }, []);

  // Simple anomaly detection based on entropy spikes and event frequency
  const detectAnomaly = useCallback(
    (events: SecurityEvent[], entropy: number): AnomalyDetectionResult => {
      const recentEvents = events.slice(0, 5); // Last 5 events
      const highSeverityCount = recentEvents.filter((e) => e.severity === "HIGH").length;
      const entropySpike = entropy > entropyMetrics.entropyThreshold * 2;

      if (highSeverityCount >= 3 || entropySpike) {
        return {
          isAnomaly: true,
          confidence: Math.min(
            0.95,
            highSeverityCount / 5 + entropy / entropyMetrics.entropyThreshold
          ),
          reason: entropySpike ? "Entropy spike detected" : "Multiple high-severity events",
        };
      }

      return {
        isAnomaly: false,
        confidence: 0,
        reason: "",
      };
    },
    [entropyMetrics.entropyThreshold]
  );

  // Enforce Zero-Entropy Law: neutralize entropy violations
  const enforceZeroEntropyLaw = useCallback(
    (entropy: number, _violations: number): SecurityEvent | null => {
      if (entropy > entropyMetrics.entropyThreshold) {
        return {
          id: String(Date.now()),
          code: "ZEL-999",
          severity: "HIGH",
          message: `Zero-Entropy Law enforced. Entropy violation neutralized. ΔS=${entropy.toFixed(4)}`,
          ts: new Date().toISOString(),
          entropy,
        };
      }
      return null;
    },
    [entropyMetrics.entropyThreshold]
  );

  useEffect(() => {
    const id = setInterval(() => {
      setEvents((prev) => {
        const newEvent: SecurityEvent = {
          id: String(Date.now()),
          code: ["ZEL-021", "ZEL-033", "ZEL-077"][Math.floor(Math.random() * 3)],
          severity: (["LOW", "MEDIUM", "HIGH"] as const)[Math.floor(Math.random() * 3)],
          message: [
            "Non-deterministic thought-form neutralized.",
            "Unauthorized cognitive branch pruned.",
            "Entropy spike detected and inverted.",
          ][Math.floor(Math.random() * 3)],
          ts: new Date().toISOString(),
          entropy: Math.random() * 0.2, // Simulate entropy value
        };

        const updated = [newEvent, ...prev];
        const limited = updated.slice(0, 10);

        // Calculate entropy metrics
        const currentEntropy = calculateEntropy(limited);
        const averageEntropy =
          limited.reduce((sum, e) => sum + (e.entropy || 0), 0) / limited.length;
        const violations = limited.filter(
          (e) => (e.entropy || 0) > entropyMetrics.entropyThreshold
        ).length;

        setEntropyMetrics({
          currentEntropy,
          averageEntropy,
          entropyThreshold: 0.1,
          violations,
        });

        // Detect anomalies
        const anomaly = detectAnomaly(limited, currentEntropy);
        setAnomalyResult(anomaly);

        // Enforce Zero-Entropy Law
        const zelEvent = enforceZeroEntropyLaw(currentEntropy, violations);
        if (zelEvent) {
          limited.unshift(zelEvent);
        }

        return limited.slice(0, 10);
      });
    }, 7000);
    return () => clearInterval(id);
  }, [calculateEntropy, detectAnomaly, enforceZeroEntropyLaw, entropyMetrics.entropyThreshold]);

  return (
    <div className="h-full flex flex-col">
      {/* Entropy Metrics Header */}
      <div className="mb-4 p-3 border border-[#06af6e]/20 bg-[#06af6e]/5 brutalist-border">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={14} className="text-[#06af6e]" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#06af6e]">
            Entropy Monitor
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[9px]">
          <div>
            <span className="text-gray-500">Current ΔS:</span>
            <span
              className={`ml-1 ${entropyMetrics.currentEntropy > entropyMetrics.entropyThreshold ? "text-red-400" : "text-[#06af6e]"}`}
            >
              {entropyMetrics.currentEntropy.toFixed(4)}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Avg ΔS:</span>
            <span className="ml-1 text-[#06af6e]">{entropyMetrics.averageEntropy.toFixed(4)}</span>
          </div>
          <div>
            <span className="text-gray-500">Violations:</span>
            <span
              className={`ml-1 ${entropyMetrics.violations > 0 ? "text-red-400" : "text-[#06af6e]"}`}
            >
              {entropyMetrics.violations}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Threshold:</span>
            <span className="ml-1 text-yellow-400">{entropyMetrics.entropyThreshold}</span>
          </div>
        </div>
      </div>

      {/* Anomaly Alert Banner */}
      {anomalyResult.isAnomaly && (
        <div className="mb-4 p-2 border border-red-500/50 bg-red-500/10 brutalist-border">
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-red-500" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-red-500">
              Anomaly Detected
            </span>
          </div>
          <div className="text-[8px] text-red-300 mt-1">
            Confidence: {(anomalyResult.confidence * 100).toFixed(1)}% - {anomalyResult.reason}
          </div>
        </div>
      )}

      {/* Event Log */}
      <div className="space-y-2 overflow-auto text-[10px] font-mono flex-1">
        {events.map((ev) => (
          <div key={ev.id} className="flex items-start gap-2 border-b border-[#06af6e]/10 pb-1">
            <div className="pt-0.5">
              <AlertTriangle
                size={12}
                className={
                  ev.severity === "HIGH"
                    ? "text-red-500"
                    : ev.severity === "MEDIUM"
                      ? "text-yellow-400"
                      : "text-[#06af6e]"
                }
              />
            </div>
            <div className="flex-1">
              <div className="flex gap-2">
                <span className="text-gray-500">{ev.code}</span>
                <span
                  className={
                    ev.severity === "HIGH"
                      ? "text-red-500"
                      : ev.severity === "MEDIUM"
                        ? "text-yellow-400"
                        : "text-[#06af6e]"
                  }
                >
                  {ev.severity}
                </span>
                {ev.entropy !== undefined && (
                  <span className="text-blue-400 text-[8px]">ΔS:{ev.entropy.toFixed(3)}</span>
                )}
              </div>
              <div className="text-gray-300">{ev.message}</div>
              <div className="text-gray-500 text-[9px]">{new Date(ev.ts).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-gray-500 text-[10px]">
            No ZEL events in current window. ΔS=0 maintained.
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityModule;
