import styles from "./Footer.module.css";
import logo from "../../../public/ChatGPT Img white.png";
import { useTranslation } from "react-i18next";
import { FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaTelegram } from "react-icons/fa6";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className={styles.footer}>
      <div id="contacts" className={`container ${styles.footer_container}`}>
        <div className={styles.footerWrap}>
          <div className={styles.footerTop}>
            <a href="/" className={styles.logoWrapper}>
              <img className={styles.logoImg} src={logo} alt="Logo" />
            </a>
            <p className={styles.text}>{t("footer_text")}</p>
          </div>

          <nav className={styles.nav}>
            <div className={styles.navColumn}>
              <a href="#services">{t("services")}</a>
              <a href="#about">{t("about")}</a>
            </div>
            <div className={styles.navColumn}>
              <a href="#projects">{t("projects")}</a>
              <a href="#advantages">{t("advantages")}</a>
            </div>
          </nav>

          <ul className={styles.socials}>
            <li className={styles.item}>
              <a href="">
                {" "}
                <FaInstagram className={styles.icon} />
              </a>
            </li>
            <li className={styles.item}>
              <a href="">
                <IoLogoLinkedin className={styles.icon} />
              </a>
            </li>
            <li className={styles.item}>
              <a href="">
                <FaTelegram className={styles.icon} />
              </a>
            </li>
          </ul>
        </div>
        <p className={styles.copyright}>©2025 OwlCode</p>
      </div>
    </footer>
  );
};

export default Footer;
