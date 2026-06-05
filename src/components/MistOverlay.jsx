import { useEffect, useRef, useState } from "react";
import "../styles/mist-overlay.css";

export default function MistOverlay({ isActive }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const circleRef = useRef({ x: 0, y: 0, radius: 80, targetRadius: 80 });
  const animationRef = useRef(null);
  const isExpandingRef = useRef(false);
  const hasExpandedRef = useRef(false);
  const timeRef = useRef(0);
  const particlesRef = useRef([]);

  // 簡單的噪聲函數
  const noise = (x, y, t = 0) => {
    const n = Math.sin(x * 0.01 + t * 0.05) * Math.cos(y * 0.01 + t * 0.03);
    return n * 0.5 + 0.5;
  };

  // 邊緣扭曲效果
  const getEdgeDisplacement = (angle, radius, time) => {
    const distortion =
      Math.sin(angle * 3 + time * 0.05) * 8 +
      Math.sin(angle * 7 + time * 0.08) * 5 +
      Math.cos(angle * 2.3 + time * 0.06) * 6;
    return distortion;
  };

  // 生成邊緣點
  const generateEdgePoints = (
    centerX,
    centerY,
    radius,
    pointCount = 64,
    applyDistortion = false,
  ) => {
    const points = [];
    const time = timeRef.current;

    for (let i = 0; i < pointCount; i++) {
      const angle = (i / pointCount) * Math.PI * 2;
      const displacement = applyDistortion
        ? getEdgeDisplacement(angle, radius, time)
        : 0;
      const r = radius + displacement;

      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;

      points.push({ x, y, angle });
    }

    return points;
  };

  // 繪製迷霧遮罩
  const drawMist = (ctx, width, height, mouseX, mouseY, radius) => {
    // 清空 canvas
    ctx.clearRect(0, 0, width, height);

    // 背景黑霧
    ctx.fillStyle = "rgba(0, 0, 0, 0.87)";
    ctx.fillRect(0, 0, width, height);

    // 只有在擴展後才應用邊緣扭曲
    const applyDistortion = hasExpandedRef.current;
    const edgePoints = generateEdgePoints(
      mouseX,
      mouseY,
      radius,
      64,
      applyDistortion,
    );

    // 繪製內部圓形（透明）
    ctx.save();
    ctx.globalCompositeOperation = "destination-out";

    // 主圓形
    const gradient = ctx.createRadialGradient(
      mouseX,
      mouseY,
      0,
      mouseX,
      mouseY,
      radius * 1.2,
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    gradient.addColorStop(0.7, "rgba(0, 0, 0, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(edgePoints[0].x, edgePoints[0].y);
    for (let i = 1; i < edgePoints.length; i++) {
      ctx.lineTo(edgePoints[i].x, edgePoints[i].y);
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // 邊緣效果（只在擴展後顯示）
    if (applyDistortion) {
      // 邊緣 glow 效果
      ctx.save();
      ctx.strokeStyle = `rgba(100, 150, 200, ${noise(mouseX, mouseY, timeRef.current) * 0.3})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(edgePoints[0].x, edgePoints[0].y);
      for (let i = 1; i < edgePoints.length; i++) {
        ctx.lineTo(edgePoints[i].x, edgePoints[i].y);
      }
      ctx.closePath();
      ctx.stroke();

      // 邊緣粒子效果
      ctx.fillStyle = `rgba(150, 180, 220, ${noise(mouseX * 0.5, mouseY * 0.5) * 0.5})`;
      for (let i = 0; i < edgePoints.length; i += 4) {
        const point = edgePoints[i];
        const size = Math.random() * 2 + 1;
        ctx.fillRect(point.x - size / 2, point.y - size / 2, size, size);
      }

      ctx.restore();
    }

    // 繪製 "wayne" 文字（初始圓形時顯示）
    if (!applyDistortion) {
      ctx.save();
      ctx.font = "bold 48px 'Noto Sans TC', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fillText("wayne", mouseX, mouseY);
      ctx.restore();
    }
  };

  // 動畫循環
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    timeRef.current += 1;

    // 更新圓形擴展
    if (isExpandingRef.current) {
      circleRef.current.targetRadius += 40;
      if (circleRef.current.targetRadius > Math.max(width, height) * 1.2) {
        isExpandingRef.current = false;
        // 保持擴展狀態，不重置
      }
    }

    // 平滑過渡圓形半徑
    circleRef.current.radius +=
      (circleRef.current.targetRadius - circleRef.current.radius) * 0.12;

    // 更新圓形位置（跟隨滑鼠）
    circleRef.current.x += (mouseRef.current.x - circleRef.current.x) * 0.18;
    circleRef.current.y += (mouseRef.current.y - circleRef.current.y) * 0.18;

    // 繪製遮罩
    drawMist(
      ctx,
      width,
      height,
      circleRef.current.x,
      circleRef.current.y,
      circleRef.current.radius,
    );

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // 設置 canvas 尺寸
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // 初始化圓形位置
      circleRef.current.x = window.innerWidth / 2;
      circleRef.current.y = window.innerHeight / 2;
    };

    updateCanvasSize();

    // 滑鼠移動事件
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // 點擊事件 - 觸發擴展動畫
    const onClick = (e) => {
      circleRef.current.x = e.clientX;
      circleRef.current.y = e.clientY;
      circleRef.current.targetRadius = 120;
      isExpandingRef.current = true;
      hasExpandedRef.current = true;
      timeRef.current = 0;
    };

    // 視窗調整
    const onResize = () => {
      updateCanvasSize();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    // 開始動畫
    animate();

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div ref={containerRef} className="mist-overlay">
      <canvas ref={canvasRef} className="mist-canvas" />
    </div>
  );
}
