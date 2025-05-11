import logo from '../../../public/ChatGPT Img white.png';
import styles from './Hero.module.css';
import { useTranslation } from 'react-i18next';

const Hero = ({ scrolled }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.hero}>
      <div className={`container ${styles.hero_container}`}>
        <img
          src={logo}
          className={`${styles.logo} ${scrolled ? styles.hide : ''}`}
          alt="Owl logo"
        />
        <h1 className={styles.title}>{t('hero_title')}</h1>
        <a
          href="#consultation"
          className={`${styles.consultationBtn} ${scrolled ? styles.hide : ''}`}
        >
          {t('get_consultation')}
        </a>
      </div>
    </div>
  );
};

export default Hero;