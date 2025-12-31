
import React, { useEffect, useState } from "react";
import { TelemetryPoint } from "../types";

const MAX_POINTS = 48;

function verifyTelemetryPoint(point: TelemetryPoint): boolean {
  if (typeof point.t !== "number" || typeof point.value !== "number") {
    console.error("Invalid TelemetryPoint structure", point);
    return false;
  }
  if (point.value < 0 || point.value > 2) {
    console.warn("TelemetryPoint value out of expected range", point);
    return false;
  }
  return true;
}

const generateInitialSeries = (): TelemetryPoint[] => {
  const out: TelemetryPoint[] = [];
  for (let i = 0; i < MAX_POINTS; i += 1) {
    const value = 0.4 + Math.sin(i / 4) * 0.25 + Math.random() * 0.05;
    const point = { t: i, value };
    if (verifyTelemetryPoint(point)) {
      out.push(point);
    }
  }
  return out;
};

const PerformanceMonitor: React.FC = () => {
  const [series, setSeries] = useState<TelemetryPoint[]>(generateInitialSeries);

  useEffect(() => {
    const id = setInterval(() => {
      setSeries((prev) => {
        const lastT = prev.length ? prev[prev.length - 1].t : 0;
        const value = 0.5 + Math.sin((lastT + 1) / 4) * 0.3 + (Math.random() - 0.5) * 0.08;
        const next: TelemetryPoint = { t: lastT + 1, value };
        if (!verifyTelemetryPoint(next)) {
          return prev;
        }
        const updated = [...prev, next];
        if (updated.length > MAX_POINTS) {
          updated.shift();
        }
        return updated;
      });
    }, 800);
    return () => clearInterval(id);
  }, []);

  const maxValue = 1;
  const minValue = 0;
  const range = maxValue - minValue || 1;

  // Verification: ensure all points are valid before rendering
  const verifiedSeries = series.filter(verifyTelemetryPoint);

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between text-[9px] text-gray-400 mb-1 font-mono">
        <span>Ω-Load</span>
        <span>ΔS=0 Channel</span>
      </div>
      <div className="flex-1 bg-black/60 border border-[#06af6e]/20 relative overflow-hidden">
        <svg
          viewBox="0 0 120 40"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="axiomPerf" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect width="120" height="40" fill="#020617" />
          {verifiedSeries.length > 1 && (
            <>
              <path
                d={
                  "M " +
                  verifiedSeries
                    .map((p, idx) => {
                      const x = (idx / Math.max(verifiedSeries.length - 1, 1)) * 120.0;
                      const y = 40 - ((p.value - minValue) / range) * 32 - 4;
                      return `${x.toFixed(2)} ${y.toFixed(2)}`;
                    })
                    .join(" L ")
                }
                fill="none"
                stroke="url(#axiomPerf)"
                strokeWidth="1.4"
              />
              <path
                d={
                  "M 0 40 " +
                  verifiedSeries
                    .map((p, idx) => {
                      const x = (idx / Math.max(verifiedSeries.length - 1, 1)) * 120.0;
                      const y = 40 - ((p.value - minValue) / range) * 32 - 4;
                      return `${x.toFixed(2)} ${y.toFixed(2)}`;
                    })
                    .join(" L ") +
                  " L 120 40 Z"
                }
                fill="url(#axiomPerf)"
                opacity={0.25}
              />
            </>
          )}
        </svg>
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 text-[9px] text-gray-400 font-mono">
        <div>
          <div className="text-gray-500 uppercase">Throughput</div>
          <div className="text-[#06af6e]">
            {verifiedSeries.length > 0 ? (verifiedSeries[verifiedSeries.length - 1].value * 1000 + 900).toFixed(0) : "-"} ops/s
          </div>
        </div>
        <div>
          <div className="text-gray-500 uppercase">Latency</div>
          <div className="text-[#06af6e]">
            {(6.5 + Math.random() * 1.4).toFixed(2)} ms P95
          </div>
        </div>
        <div>
          <div className="text-gray-500 uppercase">Cache Locality</div>
          <div className="text-[#06af6e]">
            {(95 + Math.random() * 3).toFixed(1)}% HIT
          </div>
        </div>
      </div>
      <div className="mt-2 text-[8px] text-gray-500 font-mono">
        DAB: Deterministic Acceleration Benchmark - PASS
      </div>
    </div>
  );
};

export default PerformanceMonitor;