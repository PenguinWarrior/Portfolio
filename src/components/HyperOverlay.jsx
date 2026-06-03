import { useEffect, useState } from "react";

export default function HyperOverlay() {
  const [metrics, setMetrics] = useState({ velocity: "0.00", coord: "000.000", fps: 60 });

  useEffect(() => {
    let rafId;
    let lastScroll = window.scrollY;
    let lastTime = performance.now();
    let smoothVelocity = 0;

    const tick = (time) => {
      const currentScroll = window.scrollY;
      const deltaTime = Math.max(time - lastTime, 16);
      const instantVelocity = ((currentScroll - lastScroll) / deltaTime) * 16;
      smoothVelocity += (instantVelocity - smoothVelocity) * 0.16;

      document.documentElement.style.setProperty("--scroll-velocity", smoothVelocity.toFixed(3));
      document.documentElement.style.setProperty("--scroll-y", currentScroll.toFixed(0));

      setMetrics({
        velocity: Math.abs(smoothVelocity).toFixed(2),
        coord: String(Math.round(currentScroll)).padStart(6, "0"),
        fps: Math.round(1000 / deltaTime),
      });

      lastScroll = currentScroll;
      lastTime = time;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <div className="hyper-bg" aria-hidden="true">
        <div className="hyper-bg__grid" />
        <div className="hyper-bg__orb hyper-bg__orb--red" />
        <div className="hyper-bg__orb hyper-bg__orb--cyan" />
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} className="hyper-star" style={{ "--i": i }} />
        ))}
      </div>
      <div className="scanlines" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <aside className="hud" aria-hidden="true">
        <div className="hud-top">
          <span>SYS.READY</span>
          <div className="hud-line" />
          <span>FPS: <strong>{metrics.fps}</strong></span>
        </div>
        <div className="center-nav">
          SCROLL VELOCITY // <strong>{metrics.velocity}</strong>
        </div>
        <div className="hud-bottom">
          <span>COORD: <strong>{metrics.coord}</strong></span>
          <div className="hud-line" />
          <span>PORTFOLIO [HYPER]</span>
        </div>
      </aside>
    </>
  );
}
