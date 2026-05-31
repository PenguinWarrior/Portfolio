export default function LoadingScreen() {
  return (
    <div className="loading-screen" aria-label="Loading">
      {/* ✅ Step 7 新增：初始載入動畫，使用 15 條 span 做波浪 loading */}
      <div className="loader">
        {Array.from({ length: 15 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
    </div>
  );
}
