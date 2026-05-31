import { useEffect, useRef, useState } from "react";

const avatar = `${import.meta.env.BASE_URL}avatar.svg`;

export default function ParticlePortrait({ alt = "avatar" }) {
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

    // ✅ Step 8 補強新增：拖曳狀態
    const drag = {
      isDown: false,
      lastX: 0,
      lastY: 0,

      // 目前實際偏移位置
      offsetX: 0,
      offsetY: 0,

      // 拖曳目標偏移位置
      targetX: 0,
      targetY: 0,
    };

    image.crossOrigin = "anonymous";
    image.src = avatar;

    image.onload = () => {
      if (!mounted) return;

      const width = 360;
      const height = 520;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const temp = document.createElement("canvas");
      const tempCtx = temp.getContext("2d");

      temp.width = width;
      temp.height = height;

      tempCtx.drawImage(image, 0, 0, width, height);

      let imageData;

      try {
        imageData = tempCtx.getImageData(0, 0, width, height);
      } catch (error) {
        setFailed(true);
        return;
      }

      const data = imageData.data;
      particles = [];

      // ✅ Step 8：每 4px 取樣一次，把 avatar 轉成粒子
      // ✅ 效能優化：取樣間距加大，粒子數下降，畫面仍保留粒子感
      const sampleGap = window.innerWidth < 760 ? 8 : 6;

      for (let y = 0; y < height; y += sampleGap) {
        for (let x = 0; x < width; x += sampleGap) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 80) {
            particles.push({
              x: Math.random() * width,
              y: Math.random() * height,
              tx: x,
              ty: y,
              size: Math.random() * 1.25 + 0.35,
              color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${alpha / 255})`,
            });
          }
        }
      }

      animate();
    };

    image.onerror = () => {
      setFailed(true);
    };

    const animate = () => {
      ctx.clearRect(0, 0, 360, 520);

      // ✅ Step 8 補強新增：放開滑鼠後，目標位置回到中心
      if (!drag.isDown) {
        drag.targetX = 0;
        drag.targetY = 0;
      }

      // ✅ Step 8 補強新增：目前偏移慢慢追上目標偏移，形成柔和拖曳 / 回彈
      drag.offsetX += (drag.targetX - drag.offsetX) * 0.08;
      drag.offsetY += (drag.targetY - drag.offsetY) * 0.08;

      particles.forEach((p) => {
        // ✅ Step 8：粒子慢慢聚合到原始目標位置
        p.x += (p.tx - p.x) * 0.045;
        p.y += (p.ty - p.y) * 0.045;

        ctx.beginPath();

        // ✅ Step 8 補強修改：繪製時加上拖曳偏移
        ctx.arc(p.x + drag.offsetX, p.y + drag.offsetY, p.size, 0, Math.PI * 2);

        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    // ✅ Step 8 補強新增：取得滑鼠 / 觸控座標
    const getPointer = (event) => {
      const rect = canvas.getBoundingClientRect();

      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    // ✅ Step 8 補強新增：開始拖曳
    const handlePointerDown = (event) => {
      const point = getPointer(event);

      drag.isDown = true;
      drag.lastX = point.x;
      drag.lastY = point.y;

      canvas.setPointerCapture?.(event.pointerId);
    };

    // ✅ Step 8 補強新增：拖曳中
    const handlePointerMove = (event) => {
      if (!drag.isDown) return;

      const point = getPointer(event);

      const dx = point.x - drag.lastX;
      const dy = point.y - drag.lastY;

      drag.lastX = point.x;
      drag.lastY = point.y;

      // ✅ Step 8 補強新增：拖曳幅度限制，避免人物被拖太遠
      drag.targetX = Math.max(-80, Math.min(80, drag.targetX + dx * 0.75));
      drag.targetY = Math.max(-60, Math.min(60, drag.targetY + dy * 0.75));
    };

    // ✅ Step 8 補強新增：結束拖曳，animate 會自動讓 target 回 0
    const handlePointerUp = (event) => {
      drag.isDown = false;
      canvas.releasePointerCapture?.(event.pointerId);
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);

    return () => {
      mounted = false;
      cancelAnimationFrame(animationId);

      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
    };
  }, []);

  if (failed) {
    return (
      <img
        className="particle-portrait-fallback"
        src={avatar}
        alt={alt}
        loading="lazy"
      />
    );
  }

  return (
    <canvas
      className="particle-portrait"
      ref={canvasRef}
      aria-label={alt}
      role="img"
    />
  );
}
