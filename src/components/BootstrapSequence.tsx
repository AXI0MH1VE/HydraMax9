import React, { useEffect, useState } from "react";

interface BootstrapSequenceProps {
  onComplete: () => void;
}

const STEPS = [
  "INIT_SUBSTRATE_VECTOR_FIELD",
  "MOUNT_ZERO_ENTROPY_KERNEL",
  "VERIFY_LOG_QUADRIC_INVARIANT [β=0.0839]",
  "INITIALIZE_MOR_PROTOCOL",
  "SPIN_UP_HYPERION_TERMINAL",
  "ELEVATE_SUPERVISOR_ALEXIS_ADAMS",
  "LOCK_STATE: ΔS = 0",
  "VERIFY_DETERMINISTIC_BOOTSTRAP",
];

const BootstrapSequence: React.FC<BootstrapSequenceProps> = ({
  onComplete,
}) => {
  const [index, setIndex] = useState(0);
  const [morInitialized, setMorInitialized] = useState(false);
  const [bootstrapVerified, setBootstrapVerified] = useState(false);

  useEffect(() => {
    if (index >= STEPS.length) {
      const timeout = setTimeout(onComplete, 600);
      return () => clearTimeout(timeout);
    }
    
    // Handle MoR initialization at step 3
    if (index === 3) {
      const morTimeout = setTimeout(() => {
        setMorInitialized(true);
        setIndex((i) => i + 1);
      }, 550);
      return () => clearTimeout(morTimeout);
    }
    
    // Handle deterministic verification at step 7
    if (index === 7) {
      const verificationTimeout = setTimeout(() => {
        // Simulate deterministic verification
        const verificationResult = verifyDeterministicBootstrap();
        setBootstrapVerified(verificationResult);
        setIndex((i) => i + 1);
      }, 550);
      return () => clearTimeout(verificationTimeout);
    }
    
    const timeout = setTimeout(() => setIndex((i) => i + 1), 550);
    return () => clearTimeout(timeout);
  }, [index, onComplete]);

  const verifyDeterministicBootstrap = (): boolean => {
    // Simulate deterministic verification
    // In a real implementation, this would check:
    // 1. All system states are reproducible
    // 2. Entropy ΔS = 0 maintained
    // 3. MoR protocol correctly initialized
    // 4. Kernel integrity verified
    
    const checks = [
      morInitialized,
      Math.random() > 0.1, // Simulate state reproducibility check
      Math.random() > 0.05, // Simulate entropy verification
    ];
    
    return checks.every(check => check);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020202] text-[#06af6e]">
      <div className="w-full max-w-xl border border-[#06af6e]/40 bg-black/60 p-6 crt-scanlines">
        <div className="mb-4 text-[10px] font-bold tracking-[0.3em] text-[#06af6e]/70 uppercase">
          AXIOM HIVE // HYDRA Wyrm Bootstrap
        </div>
        <div className="font-mono text-[11px] text-green-300 space-y-1">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="w-3">
                {i < index ? "✔" : i === index ? ">" : " "}
              </span>
              <span
                className={
                  i < index
                    ? "text-[#06af6e]"
                    : i === index
                    ? "text-white"
                    : "text-gray-600"
                }
              >
                {step}
              </span>
            </div>
          ))}
        </div>
        {index === 3 && !morInitialized && (
          <div className="mt-2 text-[8px] text-blue-400 font-mono">
            MOR_PROTOCOL: Initializing recursive reasoning layers...
          </div>
        )}
        {index === 7 && !bootstrapVerified && (
          <div className="mt-2 text-[8px] text-yellow-400 font-mono">
            DETERMINISTIC_VERIFICATION: Checking system integrity...
          </div>
        )}
        {bootstrapVerified && (
          <div className="mt-2 text-[8px] text-green-400 font-mono">
            BOOTSTRAP_VERIFIED: ΔS=0 confirmed. System in axiomatic state.
          </div>
        )}
        <div className="mt-6 text-[9px] text-gray-500 uppercase tracking-[0.3em]">
          STATE_VECTOR_LOADING…
        </div>
      </div>
    </div>
  );
};

export default BootstrapSequence;