import { useState, useEffect } from "react";
import styles from "./MobileMenu.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import logo from "../../../public/owlGrey.png";
import { useTranslation } from "react-i18next";
import { FaArrowRightLong } from "react-icons/fa6";

const ANIMATION_DURATION = 400;

const MobileMenu = ({ onClose, isOpen }) => {
  const { t } = useTranslation("common");
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  // Показ/приховування меню
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
    }
  }, [isOpen]);

  // Блокування скролу і збереження відступу для scrollbar
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // Закриття по таймеру
  useEffect(() => {
    if (isClosing) {
      const timeout = setTimeout(() => {
        onClose();
      }, ANIMATION_DURATION);
      return () => clearTimeout(timeout);
    }
  }, [isClosing, onClose]);

  // Esc + swipe закриття
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const menuEl = document.querySelector(`.${styles.menu}`);
    let touchStartX = null;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      if (touchStartX && touchStartX - touchEndX > 50) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    menuEl?.addEventListener("touchstart", handleTouchStart);
    menuEl?.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      menuEl?.removeEventListener("touchstart", handleTouchStart);
      menuEl?.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleClose = () => {
    if (!isClosing) {
      setIsClosing(true);
    }
  };

  const handleLinkClick = () => handleClose();

  if (!shouldRender) return null;

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div
        className={`${styles.menu} ${isClosing ? styles.closing : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.btnLang}>
          <LanguageSwitcher variant="white" />
        </div>

        <nav className={styles.nav}>
          <a href="#services" onClick={handleLinkClick} className={styles.navLink}>
            {t("services")}
            <FaArrowRightLong size={24} />
          </a>
          <a href="#about" onClick={handleLinkClick} className={styles.navLink}>
            {t("about")}
            <FaArrowRightLong size={24} />
          </a>
          <a href="#advantages" onClick={handleLinkClick} className={styles.navLink}>
            {t("advantages")}
            <FaArrowRightLong size={24} />
          </a>
          <a href="#contacts" onClick={handleLinkClick} className={styles.navLink}>
            {t("contacts")}
            <FaArrowRightLong size={24} />
          </a>
        </nav>

        <a href="#consultation" className={styles.consultationBtn} onClick={handleLinkClick}>
          {t("get_consultation")}
        </a>

        {/* <img className={styles.logo} src={logo} alt="Owl logo" /> */}
      </div>
    </div>
  );
};

export default MobileMenu;
