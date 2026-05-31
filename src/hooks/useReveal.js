import { useEffect } from "react";

/**
 * 捲動進場動畫:替所有 .reveal 元素加上 IntersectionObserver,
 * 進入視窗時加上 .is-visible。會在 DOM 變動後重新掃描。
 */
export default function useReveal() {
  useEffect(() => {
    const supportsIO = "IntersectionObserver" in window;

    const io = supportsIO
      ? new IntersectionObserver(
          (entries, obs) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12 }
        )
      : null;

    const scan = () => {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
        if (io) io.observe(el);
        else el.classList.add("is-visible");
      });
    };

    scan();
    // 作品篩選會改變 DOM,觀察 body 變動後重新掃描
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      if (io) io.disconnect();
    };
  }, []);
}
