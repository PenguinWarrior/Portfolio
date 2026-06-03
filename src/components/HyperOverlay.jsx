import { useEffect, useMemo, useState } from "react";

const tunnelStars = Array.from({ length: 150 }, (_, i) => ({
  id: i,
  x: `${((i * 37) % 100) - 50}vw`,
  y: `${((i * 61) % 100) - 50}vh`,
  z: -220 - ((i * 181) % 6200),
  size: i % 11 === 0 ? 3 : 2,
}));

const floatingByPage = [
  { label: "PORTFOLIO", meta: "ENTRY GATE", kind: "text", x: "-8vw", y: "-8vh", z: -360, rot: -4 },
  { label: "ABOUT", meta: "IDENTITY PROFILE", kind: "card", x: "28vw", y: "10vh", z: -960, rot: 8 },
  { label: "PROJECTS", meta: "WORK CATALOG", kind: "panel", x: "-31vw", y: "14vh", z: -1580, rot: -10 },
  { label: "SKILLS", meta: "MODULE GRID", kind: "ring", x: "26vw", y: "-17vh", z: -2260, rot: 16 },
  { label: "EXPERIENCE", meta: "TIMELINE TRACE", kind: "panel", x: "31vw", y: "18vh", z: -2960, rot: -12 },
  { label: "CONTACT", meta: "OPEN CHANNEL", kind: "text", x: "0vw", y: "3vh", z: -3720, rot: 0 },
];

export default function HyperOverlay({ active = 0, pages = [], contactOpen = false }) {
  const [metrics, setMetrics] = useState({ velocity: "0.00", coord: "000.000", fps: 60 });
  const layers = useMemo(() => floatingByPage, []);

  useEffect(() => {
    let rafId;
    let lastIndex = active;
    let lastTime = performance.now();
    let smoothVelocity = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const tick = (time) => {
      const deltaTime = Math.max(time - lastTime, 16);
      const instantVelocity = ((active - lastIndex) * 1000) / deltaTime;
      smoothVelocity += (instantVelocity - smoothVelocity) * 0.12;
      const contactBoost = contactOpen ? 0.85 : 0;
      const cameraZ = (active + contactBoost) * 760;
      const fov = Math.max(520, 1120 - Math.abs(smoothVelocity) * 120);
      const tiltX = mouseY * -8 + smoothVelocity * -1.4;
      const tiltY = mouseX * 10;

      document.documentElement.style.setProperty("--scroll-velocity", smoothVelocity.toFixed(3));
      document.documentElement.style.setProperty("--depth-camera-z", `${cameraZ.toFixed(1)}px`);
      document.documentElement.style.setProperty("--depth-perspective", `${fov.toFixed(0)}px`);
      document.documentElement.style.setProperty("--depth-tilt-x", `${tiltX.toFixed(2)}deg`);
      document.documentElement.style.setProperty("--depth-tilt-y", `${tiltY.toFixed(2)}deg`);

      setMetrics({
        velocity: Math.abs(smoothVelocity).toFixed(2),
        coord: String(Math.round((active + contactBoost) * 1000)).padStart(6, "0"),
        fps: Math.round(1000 / deltaTime),
      });

      lastIndex = active;
      lastTime = time;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [active, contactOpen]);

  const currentLabel = contactOpen ? "聯絡我" : pages[active]?.label || "PORTFOLIO";

  return (
    <>
      <div className="hyper-bg" aria-hidden="true">
        <div className="hyper-bg__grid" />
        <div className="hyper-bg__orb hyper-bg__orb--red" />
        <div className="hyper-bg__orb hyper-bg__orb--cyan" />
        {Array.from({ length: 42 }).map((_, i) => (
          <span key={i} className="hyper-star" style={{ "--i": i }} />
        ))}
      </div>

      <div className="hyper-viewport" aria-hidden="true">
        <div className="hyper-world">
          {tunnelStars.map((star) => (
            <span
              key={star.id}
              className="depth-star"
              style={{ "--x": star.x, "--y": star.y, "--z": `${star.z}px`, "--s": star.size }}
            />
          ))}

          {layers.map((layer, index) => (
            <div
              key={layer.label}
              className={`depth-item depth-item--${layer.kind}${index === active || (contactOpen && layer.label === "CONTACT") ? " is-current" : ""}`}
              style={{ "--x": layer.x, "--y": layer.y, "--z": `${layer.z}px`, "--r": `${layer.rot}deg`, "--n": index + 1 }}
            >
              {layer.kind === "ring" ? (
                <div className="depth-ring"><span>{layer.label}</span></div>
              ) : layer.kind === "text" ? (
                <div className="depth-big-text">{layer.label}</div>
              ) : (
                <div className="depth-card">
                  <div className="depth-card__top"><span>ID-{String(index + 1).padStart(3, "0")}</span><i /></div>
                  <strong>{layer.label}</strong>
                  <p>{layer.meta}</p>
                  <div className="depth-card__bottom"><span>Z:{Math.abs(layer.z)}</span><span>ONE-SCROLL</span></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <aside className="hud" aria-hidden="true">
        <div className="hud-top"><span>SYS.READY</span><div className="hud-line" /><span>FPS: <strong>{metrics.fps}</strong></span></div>
        <div className="center-nav">{currentLabel} // DEPTH <strong>{metrics.velocity}</strong></div>
        <div className="hud-bottom"><span>COORD: <strong>{metrics.coord}</strong></span><div className="hud-line" /><span>PORTFOLIO [FULLPAGE]</span></div>
      </aside>
    </>
  );
}
