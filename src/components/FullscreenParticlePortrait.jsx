import { useEffect, useRef, useState } from "react";

const avatar = `${import.meta.env.BASE_URL}avatar.svg`;

export default function FullscreenParticlePortrait() {
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const image = new Image();

    let particles = [];
    let animationId;
    let mounted = true;

    // ✅ 新增：全版拖曳狀態，用於計算局部粒子拉扯
    const drag = {
      isDown: false,
      lastX: 0,
      lastY: 0,
      moveX: 0,
      moveY: 0,
    };

    const pointer = {
      x: undefined,
      y: undefined,
    };

    // ✅ 新增：人物圖像實際繪製尺寸
    const portrait = {
      width: 420,
      height: 560,
    };

    image.crossOrigin = "anonymous";
    image.src = avatar;

    const getThemeDim = () => {
      return document.documentElement.getAttribute("data-theme") === "light"
        ? 1
        : 0.86;
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildParticles = () => {
      resizeCanvas();

      const temp = document.createElement("canvas");
      const tempCtx = temp.getContext("2d");

      temp.width = portrait.width;
      temp.height = portrait.height;

      tempCtx.drawImage(image, 0, 0, portrait.width, portrait.height);

      let imageData;

      try {
        imageData = tempCtx.getImageData(0, 0, portrait.width, portrait.height);
      } catch (error) {
        setFailed(true);
        return;
      }

      const data = imageData.data;
      particles = [];

      // ✅ 效能優化：全版 canvas 粒子數不要太高
      const sampleGap = window.innerWidth < 760 ? 8 : 6;

      // ✅ 新增：參考網站的概念是全版 canvas，但人物座標偏右
      const baseX =
        window.innerWidth < 900
          ? window.innerWidth * 0.58
          : window.innerWidth * 0.67;

      const baseY = window.innerHeight * 0.5;

      for (let y = 0; y < portrait.height; y += sampleGap) {
        for (let x = 0; x < portrait.width; x += sampleGap) {
          const index = (y * portrait.width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 80) {
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];

            particles.push({
              // ✅ 初始位置從人物右側附近散開，比較有聚合感
              x: baseX + (Math.random() - 0.5) * 280,
              y: baseY + (Math.random() - 0.5) * 360,

              // ✅ 目標位置：全版 canvas 裡的右側人物座標
              tx: baseX + x - portrait.width / 2,
              ty: baseY + y - portrait.height / 2,

              vx: 0,
              vy: 0,
              size: Math.random() * 1.2 + 0.45,
              color: `rgba(${r}, ${g}, ${b}, ${(alpha / 255) * getThemeDim()})`,
            });
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const isDragging = drag.isDown;

      particles.forEach((p) => {
        // ✅ 若正在拖曳，對附近粒子施加拉扯力
        if (isDragging && pointer.x !== undefined && pointer.y !== undefined) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const radius = 160;

          if (distance < radius) {
            const strength = (radius - distance) / radius;
            p.vx += drag.moveX * strength * 0.055;
            p.vy += drag.moveY * strength * 0.055;
          }
        }

        // ✅ 粒子回到其原始目標位置，形成彈性回彈感
        p.vx += (p.tx - p.x) * 0.0022;
        p.vy += (p.ty - p.y) * 0.0022;

        p.vx *= 0.88;
        p.vy *= 0.88;

        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // ✅ 拖曳移動量逐漸衰減，避免拖曳停止後持續作用
      drag.moveX *= 0.2;
      drag.moveY *= 0.2;

      animationId = requestAnimationFrame(animate);
    };

    image.onload = () => {
      if (!mounted) return;
      buildParticles();
      animate();
    };

    image.onerror = () => {
      setFailed(true);
    };

    const handlePointerDown = (event) => {
      drag.isDown = true;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      drag.moveX = 0;
      drag.moveY = 0;
    };

    const handlePointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!drag.isDown) return;

      const dx = event.clientX - drag.lastX;
      const dy = event.clientY - drag.lastY;

      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.moveX = dx * 0.95;
      drag.moveY = dy * 0.95;
    };

    drag.moveX = 0;
    drag.moveY = 0;
    const handlePointerUp = (event) => {
      drag.isDown = false;
      pointer.x = undefined;
      pointer.y = undefined;
    };

    const handleResize = () => {
      buildParticles();
    };

    const handleThemeChange = () => {
      buildParticles();
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(animationId);

      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  if (failed) return null;

  return (
    <canvas
      className="fullscreen-particle-portrait"
      ref={canvasRef}
      aria-hidden="true"
    />
  );
}
