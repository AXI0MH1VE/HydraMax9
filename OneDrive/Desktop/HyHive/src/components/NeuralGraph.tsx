import React, { useEffect, useRef } from "react";

const NeuralGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame: number;

    const nodes = Array.from({ length: 36 }).map((_, _i) => ({
      x: Math.random(),
      y: Math.random(),
      phase: Math.random() * Math.PI * 2,
      speed: 0.2 + Math.random() * 0.4,
      radius: 2 + Math.random() * 2,
    }));

    const render = (timeMs: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#020202";
      ctx.fillRect(0, 0, width, height);

      const t = timeMs / 1000;
      const cx = width / 2;
      const cy = height / 2;

      nodes.forEach((n, idx) => {
        const angle = n.phase + t * n.speed;
        const r = Math.min(width, height) * 0.32;
        const x = cx + Math.cos(angle) * r * (0.6 + n.x * 0.3);
        const y = cy + Math.sin(angle) * r * (0.6 + n.y * 0.3);

        nodes.slice(idx + 1).forEach((m) => {
          const mAngle = m.phase + t * m.speed;
          const mx = cx + Math.cos(mAngle) * r * (0.6 + m.x * 0.3);
          const my = cy + Math.sin(mAngle) * r * (0.6 + m.y * 0.3);
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const alpha = 1 - dist / 140;
            ctx.strokeStyle = `rgba(6,175,110,${0.25 * alpha})`;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        });
      });

      nodes.forEach((n) => {
        const angle = n.phase + t * n.speed;
        const r = Math.min(width, height) * 0.32;
        const x = cx + Math.cos(angle) * r * (0.6 + n.x * 0.3);
        const y = cy + Math.sin(angle) * r * (0.6 + n.y * 0.3);

        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + n.phase);
        const radius = n.radius + pulse * 1.5;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
        gradient.addColorStop(0, "rgba(6,175,110,0.9)");
        gradient.addColorStop(1, "rgba(6,175,110,0.0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#0f172a";
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, radius + 1.5, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationFrame = requestAnimationFrame(render);
    };

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default NeuralGraph;
