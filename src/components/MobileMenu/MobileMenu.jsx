import { useState, useEffect } from "react";
import styles from "./MobileMenu.module.css";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import logo from "../../../public/owlGrey.png";
import { useTranslation } from "react-i18next";
import { FaArrowRightLong } from "react-icons/fa6";

const ANIMATION_DURATION = 300;

const MobileMenu = ({ onClose, isOpen, buttonRef }) => {
  const { t } = useTranslation("common");
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });

  // Контроль відкриття/закриття
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else {
      setIsClosing(true);
      setTimeout(() => setShouldRender(false), ANIMATION_DURATION);
    }
  }, [isOpen]);

  // Обчислення позиції після рендеру
  useEffect(() => {
    if (shouldRender && buttonRef?.current) {
      requestAnimationFrame(() => {
        const rect = buttonRef.current.getBoundingClientRect();
        const rightOffset = window.innerWidth - rect.right;
        setMenuPosition({
          top: rect.top - 24,
          right: rightOffset - 24,
        });
      });
    }
  }, [shouldRender, buttonRef]);

  // Заборона скролу
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Закриття з анімацією
  const handleClose = () => {
    if (!isClosing) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, ANIMATION_DURATION);
    }
  };

  // Події: Esc, свайп
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

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

    menuEl?.addEventListener("touchstart", handleTouchStart);
    menuEl?.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      menuEl?.removeEventListener("touchstart", handleTouchStart);
      menuEl?.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleLinkClick = () => handleClose();

  if (!shouldRender) return null;

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div
        className={`${styles.menu} ${isClosing ? styles.closing : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: `${menuPosition.top}px`,
          right: `${menuPosition.right}px`,
        }}
      >
        <div className={styles.btnLang}>
          <LanguageSwitcher variant="white" />
        </div>

        <nav className={styles.nav}>
          <a
            href="#services"
            onClick={handleLinkClick}
            className={styles.navLink}
          >
            {t("services")}
            <FaArrowRightLong size={24}/>
          </a>
          <a href="#about" onClick={handleLinkClick} className={styles.navLink}>
            {t("about")}
            <FaArrowRightLong size={24}/>
          </a>
          <a
            href="#advantages"
            onClick={handleLinkClick}
            className={styles.navLink}
          >
            {t("advantages")}
            <FaArrowRightLong size={24}/>
          </a>
          <a
            href="#contacts"
            onClick={handleLinkClick}
            className={styles.navLink}
          >
            {t("contacts")}
            <FaArrowRightLong size={24}/>
          </a>
        </nav>
        <a href="#consultation" className={styles.consultationBtn} onClick={handleLinkClick}>
          {t("get_consultation")}
        </a>
        <img className={styles.logo} src={logo} alt="Owl logo" />
      </div>
    </div>
  );
};

export default MobileMenu;
