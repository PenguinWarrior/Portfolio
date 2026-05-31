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

    // ✅ 新增：全版拖曳狀態，模擬參考網站拖曳 camera 的感覺
    const drag = {
      isDown: false,
      lastX: 0,
      lastY: 0,
      offsetX: 0,
      offsetY: 0,
      targetX: 0,
      targetY: 0,
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

              size: Math.random() * 1.2 + 0.45,
              color: `rgba(${r}, ${g}, ${b}, ${(alpha / 255) * getThemeDim()})`,
            });
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // ✅ 放開後回彈，對應參考網站 camera 回中心
      if (!drag.isDown) {
        drag.targetX = 0;
        drag.targetY = 0;
      }

      drag.offsetX += (drag.targetX - drag.offsetX) * 0.07;
      drag.offsetY += (drag.targetY - drag.offsetY) * 0.07;

      particles.forEach((p) => {
        // ✅ 粒子慢慢聚合到人物位置
        p.x += (p.tx - p.x) * 0.04;
        p.y += (p.ty - p.y) * 0.04;

        // ✅ 靠近滑鼠時微微浮動，增加互動感
        let mousePushX = 0;
        let mousePushY = 0;

        if (pointer.x !== undefined && pointer.y !== undefined) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 70) {
            const force = (70 - distance) / 70;
            mousePushX = -dx * force * 0.08;
            mousePushY = -dy * force * 0.08;
          }
        }

        ctx.beginPath();
        ctx.arc(
          p.x + drag.offsetX + mousePushX,
          p.y + drag.offsetY + mousePushY,
          p.size,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = p.color;
        ctx.fill();
      });

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
      canvas.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      if (!drag.isDown) return;

      const dx = event.clientX - drag.lastX;
      const dy = event.clientY - drag.lastY;

      drag.lastX = event.clientX;
      drag.lastY = event.clientY;

      // ✅ 模擬參考網站拖曳 camera，整個人物粒子層偏移
      drag.targetX = Math.max(-90, Math.min(90, drag.targetX + dx * 0.35));
      drag.targetY = Math.max(-70, Math.min(70, drag.targetY + dy * 0.35));
    };

    const handlePointerUp = (event) => {
      drag.isDown = false;
      canvas.releasePointerCapture?.(event.pointerId);
    };

    const handleResize = () => {
      buildParticles();
    };

    const handleThemeChange = () => {
      buildParticles();
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);
    window.addEventListener("resize", handleResize);

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      mounted = false;
      cancelAnimationFrame(animationId);

      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
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
