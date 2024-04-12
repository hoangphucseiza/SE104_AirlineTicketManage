import React from "react";
import "../styles/footer.css";
import Logo from "../images/logo_ver.png";
import Regulations from "../utils/Regulations";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-slogan">
        <img src={Logo} alt="Logo" />
        <div>
          <p
            style={{
              color: "var(--primary-color)",
            }}
          >
            Dreamers Airlines tự hào là hãng hàng không quốc tế 4 sao
          </p>
          <p>Xin trân trọng cảm ơn sự đồng hành của Quý khách và bạn hàng!</p>
        </div>
      </div>
      <div className="footer-regulations">
        <div className="footer-regulations-intro">
          {Regulations.map((regulation, index) => (
            <div key={index} className="footer-regulations-intro-block">
              <h6>{regulation.title}</h6>
              {regulation.contents.map((content, id) => (
                <a key={id} href={content.link}>
                  {content.text}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-regulations-contact">
          <div>
            <div className="d-flex align-items-center mb-3">
              <span className="me-3">Theo dõi tại: </span>
              <i className="fa-brands fa-square-facebook" />
              <i className="fa-brands fa-square-instagram" />
              <i className="fa-brands fa-square-twitter" />
              <i className="fa-brands fa-youtube" />
              <i className="fa-brands fa-linkedin" />
            </div>
            <p className="fw-medium"> © 2024 Dreamers Airlines UIT</p>
          </div>
          <div>
            <div className="d-flex align-items-center mb-3">
              <i className="fa-solid fa-phone" />
              <span>Liên hệ: 1900 1100</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-envelope" />
              <span>Email: dreamersairline@gmail.com </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
