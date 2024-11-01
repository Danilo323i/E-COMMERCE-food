import React from "react";
import "../MyFooter/MyFooter.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerSection">
        <h4>Contatti</h4>
        <p>Email: info@tuosito.com</p>
        <p>Telefono: +39 123 456 7890</p>
      </div>
      <div className="footerSection">
        <h4>Link Utili</h4>
        <ul>
          <li><a href="/about">Chi siamo</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/terms">Termini di Servizio</a></li>
        </ul>
      </div>
      <div className="footerSection">
        <h4>Seguici</h4>
        <div className="socialIcons">
          {/* Aggiungi qui le icone social */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
