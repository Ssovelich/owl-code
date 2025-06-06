import styles from "./Header.module.css";
import logo from "../../../public/ChatGPT Img white.png";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";

const Header = ({ scrolled }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const { t } = useTranslation("common");

  const burgerButtonRef = useRef(null);

  useEffect(() => {
    const sectionIds = [
      "services",
      "about",
      "projects",
      "advantages",
      "contacts",
    ];
    const offset = 136; // висота хедера

    const handleScroll = () => {
      let currentSectionId = "";

      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();

          if (rect.top <= offset && rect.bottom > offset) {
            currentSectionId = id;
            break;
          }
        }
      }

      setActiveId(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div
        className={`container ${styles.header_container} ${
          scrolled ? styles.withElements : ""
        }`}
      >
        <a
          href="/"
          className={`${styles.logoWrapper} ${
            scrolled ? styles.moveLogo : styles.hide
          }`}
        >
          <img className={styles.logoImg} src={logo} alt="Logo" />
        </a>

        <nav className={styles.nav}>
          <a
            href="#services"
            className={activeId === "services" ? styles.active : ""}
          >
            {t("services")}
          </a>
          <a
            href="#about"
            className={activeId === "about" ? styles.active : ""}
          >
            {t("about")}
          </a>
          <a
            href="#projects"
            className={activeId === "projects" ? styles.active : ""}
          >
            {t("projects")}
          </a>
          <a
            href="#advantages"
            className={activeId === "advantages" ? styles.active : ""}
          >
            {t("advantages")}
          </a>
          <a
            href="#contacts"
            className={activeId === "contacts" ? styles.active : ""}
          >
            {t("contacts")}
          </a>
        </nav>

        <a
          href="#consultation"
          className={`${styles.consultationBtn} ${
            scrolled ? styles.showBtn : styles.hide
          }`}
        >
          {t("consultation")}
        </a>
        <div className={styles.headerLangPosition}>
          <LanguageSwitcher variant="white" className="headerLangPosition" />
        </div>

        <button
          ref={burgerButtonRef}
          className={`${styles.burger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <MobileMenu
        buttonRef={burgerButtonRef}
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
};

export default Header;
