import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = ({ variant = 'white', className = '' }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLang === 'ua' ? 'en' : 'ua';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
    // window.location.reload();
  };

  return (
    <button
      className={`
        ${styles.switcher}
        ${variant === 'white' ? styles.white : ''}
        ${variant === 'black' ? styles.black : ''}
        ${className}
      `}
      onClick={toggleLanguage}
    >
      {currentLang === 'ua' ? 'EN' : 'UA'}
    </button>
  );
};

export default LanguageSwitcher;
