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
    const sectionIds = ["services", "about", "projects", "advantages", "contacts"];
    const offset = 136;

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

    const throttledScroll = () => {
      window.requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttledScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const sections = ["services", "about", "projects", "advantages", "contacts"];

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} role="banner">
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
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeId === id ? styles.active : ""}
            >
              {t(id)}
            </a>
          ))}
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
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <MobileMenu
        id="mobile-menu"
        buttonRef={burgerButtonRef}
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
      />
    </header>
  );
};

export default Header;