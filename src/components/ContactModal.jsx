import { useEffect } from "react";

const CONTACT_TEXT = {
  zh: {
    title: "聯絡我",
    subtitle: "如果你對我的作品或經驗有興趣，歡迎透過以下方式聯繫。",
    emailLabel: "Email",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    close: "關閉",
  },
  en: {
    title: "Contact Me",
    subtitle:
      "If you are interested in my work or experience, feel free to reach out.",
    emailLabel: "Email",
    githubLabel: "GitHub",
    linkedinLabel: "LinkedIn",
    close: "Close",
  },
};

export default function ContactModal({ isOpen, onClose, lang = "zh" }) {
  const t = CONTACT_TEXT[lang];

  useEffect(() => {
    // ✅ Step 6 新增：彈窗開啟時，可按 ESC 關閉
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="contact-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* ✅ Step 6 新增：點擊背景遮罩可關閉彈窗 */}
      <button
        type="button"
        className="contact-modal__backdrop"
        aria-label={t.close}
        onClick={onClose}
      ></button>

      <div className="contact-modal__panel reveal is-visible">
        <button
          type="button"
          className="contact-modal__close"
          onClick={onClose}
          aria-label={t.close}
        >
          ×
        </button>

        <p className="contact-modal__eyebrow">CONTACT</p>

        <h2 className="contact-modal__title" id="contact-modal-title">
          {t.title}
        </h2>

        <p className="contact-modal__subtitle">{t.subtitle}</p>

        <div className="contact-modal__links">
          <a href="mailto:you@example.com">
            <span>{t.emailLabel}</span>
            <strong>you@example.com</strong>
          </a>

          <a
            href="https://github.com/PenguinWarrior"
            target="_blank"
            rel="noopener"
          >
            <span>{t.githubLabel}</span>
            <strong>PenguinWarrior</strong>
          </a>

          <a
            href="https://linkedin.com/in/your-id"
            target="_blank"
            rel="noopener"
          >
            <span>{t.linkedinLabel}</span>
            <strong>your-id</strong>
          </a>
        </div>
      </div>
    </div>
  );
}
