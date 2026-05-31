export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="site-footer__copy">
          © {new Date().getFullYear()} 王韋程. Built with React + Vite.
        </p>
      </div>
    </footer>
  );
}
