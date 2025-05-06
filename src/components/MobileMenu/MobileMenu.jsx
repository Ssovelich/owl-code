import { useState, useEffect } from "react";
import styles from "./MobileMenu.module.css";
import { IoMdClose } from "react-icons/io";

const MobileMenu = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

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
        handleClose(); // свайп вліво
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
        <button className={styles.closeBtn} onClick={handleClose}>
          <IoMdClose />
        </button>
        <nav className={styles.nav}>
          <a href="#services" onClick={handleLinkClick}>
            Послуги
          </a>
          <a href="#about" onClick={handleLinkClick}>
            Про нас
          </a>
          <a href="#advantages" onClick={handleLinkClick}>
            Переваги
          </a>
          <a href="#contacts" onClick={handleLinkClick}>
            Контакти
          </a>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
