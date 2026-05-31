import { useEffect, useRef } from "react";

export default function StarsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let stars = [];

    // ✅ Step 8 新增：滑鼠位置，用於讓靠近滑鼠的星點變大
    const mouse = {
      x: undefined,
      y: undefined,
    };

    // ✅ Step 8 新增：依目前主題取得星點顏色
    const getColors = () => {
      const theme = document.documentElement.getAttribute("data-theme");

      if (theme === "light") {
        return ["#191713", "#b87522", "#238b64", "#c94740"];
      }

      return [
        "#4c1a22",
        "#5d6268",
        "#1f2e37",
        "#474848",
        "#542619",
        "#ead8cf",
        "#d6b9b1",
        "#964a47",
      ];
    };

    // ✅ Step 8 新增：依視窗大小重新建立星點
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const colors = getColors();
      const count = window.innerWidth < 760 ? 220 : 520;

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: (Math.random() - 0.5) * 0.45,
        dy: (Math.random() - 0.7) * 0.45,
        radius: Math.random() * 0.7 + 0.25,
        minRadius: Math.random() * 0.7 + 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      stars.forEach((star) => {
        if (star.x > window.innerWidth || star.x < 0) star.dx *= -1;
        if (star.y > window.innerHeight || star.y < 0) star.dy *= -1;

        star.x += star.dx;
        star.y += star.dy;

        // ✅ Step 8 新增：靠近滑鼠時星點放大
        if (
          mouse.x !== undefined &&
          mouse.y !== undefined &&
          Math.abs(mouse.x - star.x) < 55 &&
          Math.abs(mouse.y - star.y) < 55
        ) {
          star.radius = Math.min(star.radius + 0.12, 1.7);
        } else {
          star.radius = Math.max(star.radius - 0.05, star.minRadius);
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleThemeChange = () => {
      // ✅ Step 8 新增：主題切換後重新套用星點顏色
      resize();
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    // ✅ Step 8 新增：監聽 html[data-theme] 變化，讓星空跟著主題換色
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return <canvas className="stars-canvas" ref={canvasRef} aria-hidden="true" />;
}
