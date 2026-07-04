import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__text">Developed by Eric</p>
      <p className="footer__text">&copy; {currentYear}</p>
    </footer>
  );
}

export default Footer;
