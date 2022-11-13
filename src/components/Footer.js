import "../blocks/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__name-content">
        <p className="footer__text">Developed by Miguel González | 2022</p>
      </div>
      <div className="footer__text">
        Powered by{" "}
        <a href="https://www.weatherapi.com/" title="Weather API">
          WeatherAPI.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
