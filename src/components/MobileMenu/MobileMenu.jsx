import { useState, useEffect } from "react";
import styles from "./MobileMenu.module.css";
import { IoMdClose } from "react-icons/io";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import logo from "../../../public/owlGrey.png";
import { useTranslation } from 'react-i18next';

const MobileMenu = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const { t } = useTranslation();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    let touchStartX = null;
    const menuEl = document.querySelector(`.${styles.menu}`);

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

  const handleLinkClick = () => {
    handleClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div
        className={`${styles.menu} ${isClosing ? styles.closing : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.btnWrapper}>
          <LanguageSwitcher
            variant="black"
          />
          <button className={styles.closeBtn} onClick={handleClose}>
            <IoMdClose />
          </button>
        </div>
        <nav className={styles.nav}>
          <a href="#services" onClick={handleLinkClick}>
            {t("services")}
          </a>
          <a href="#about" onClick={handleLinkClick}>
            {t("about")}
          </a>
          <a href="#advantages" onClick={handleLinkClick}>
            {t("advantages")}
          </a>
          <a href="#contacts" onClick={handleLinkClick}>
            {t("contacts")}
          </a>
        </nav>
        <img src={logo} alt="Owl logo" />
      </div>
    </div>
  );
};

export default MobileMenu;
