import { useState } from "react";
import styles from "./Projects.module.css";
import projects from "./projectsData.json";
import { BsArrowUpRight } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useTranslation( "projects");

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setImageLoaded(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setImageLoaded(false);
  };

  const { image, link } = projects[currentIndex];

  const translatedProject = t(`${currentIndex}`, {
    ns: "projects",
    returnObjects: true,
  });

  if (!translatedProject) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.projects}>
      <div id="projects" className={`container ${styles.projects_container}`}>
        <h2 className={styles.title}>{t("common:projects_title")}</h2>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
  {!imageLoaded && (
    <div className={styles.imageLoader}>
      <Loader />
    </div>
  )}
  <img
    src={image}
    alt={translatedProject.title}
    className={`${styles.image} ${imageLoaded ? styles.loaded : ""}`}
    onLoad={() => setImageLoaded(true)}
  />
</div>
          <div className={styles.info}>
            <h3 className={styles.titleInfo}>{translatedProject.title}</h3>
            <p className={styles.textInfo}>{translatedProject.description}</p>
            <a
              className={styles.linkInfo}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("common:view_project")}
              <BsArrowUpRight className={styles.icon} />
            </a>
          </div>
        </div>

        <div className={styles.controls}>
          <button
            onClick={handlePrev}
            className={`${styles.arrow} ${styles.arrowLeft}`}
          >
            <BsArrowUpRight className={styles.arrowIcon} />
          </button>
          <button onClick={handleNext} className={styles.arrow}>
            <BsArrowUpRight className={styles.arrowIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
