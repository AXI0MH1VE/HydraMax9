import React, { useEffect, useState } from "react";

interface BootstrapSequenceProps {
  onComplete: () => void;
}

const STEPS = [
  "INIT_SUBSTRATE_VECTOR_FIELD",
  "MOUNT_ZERO_ENTROPY_KERNEL",
  "VERIFY_LOG_QUADRIC_INVARIANT [β=0.0839]",
  "SPIN_UP_HYPERION_TERMINAL",
  "ELEVATE_SUPERVISOR_ALEXIS_ADAMS",
  "LOCK_STATE: ΔS = 0",
];

const BootstrapSequence: React.FC<BootstrapSequenceProps> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= STEPS.length) {
      const timeout = setTimeout(onComplete, 600);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setIndex((i) => i + 1), 550);
    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020202] text-[#06af6e]">
      <div className="w-full max-w-xl border border-[#06af6e]/40 bg-black/60 p-6 crt-scanlines">
        <div className="mb-4 text-[10px] font-bold tracking-[0.3em] text-[#06af6e]/70 uppercase">
          AXIOM HIVE // HYDRA Wyrm Bootstrap
        </div>
        <div className="font-mono text-[11px] text-green-300 space-y-1">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="w-3">{i < index ? "✔" : i === index ? ">" : " "}</span>
              <span
                className={
                  i < index ? "text-[#06af6e]" : i === index ? "text-white" : "text-gray-600"
                }
              >
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 text-[9px] text-gray-500 uppercase tracking-[0.3em]">
          STATE_VECTOR_LOADING…
        </div>
      </div>
    </div>
  );
};

export default BootstrapSequence;
