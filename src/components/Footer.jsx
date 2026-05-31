export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <h2 className="section__title">一起合作吧</h2>
        <p className="section__subtitle">有專案或職缺想聊聊?歡迎來信。</p>
        <a href="mailto:you@example.com" className="btn btn--primary btn--lg">
          you@example.com
        </a>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} Your Name. Built with React + Vite.
        </p>
      </div>
    </footer>
  );
}
