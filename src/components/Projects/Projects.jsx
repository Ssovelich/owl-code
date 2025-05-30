import { useEffect, useState } from "react";
import styles from "./Projects.module.css";
import projects from "./projectsData.json";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
import { BsArrowUpRight } from "react-icons/bs";
import { useMediaQuery } from "../../utils/useMediaQuery";

const ANIMATION_DURATION = 600;

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cardAnimation, setCardAnimation] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const { t } = useTranslation("projects");
  const isMobile = useMediaQuery("(max-width: 743px)");

  const handleChangeProject = (newIndex, dir) => {
  if (isAnimating || newIndex === currentIndex) return;

  setIsAnimating(true);
  setDirection(dir);
  setCardAnimation(dir === "right" ? styles.cardExitLeft : styles.cardExitRight);

  setTimeout(() => {
    setCurrentIndex(newIndex);
    setImageLoaded(false);
    setCardAnimation(dir === "right" ? styles.cardEnterFromRight : styles.cardEnterFromLeft);
  }, ANIMATION_DURATION);

  setTimeout(() => {
    setCardAnimation("");
    setIsAnimating(false);
  }, ANIMATION_DURATION * 2);
};



  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    handleChangeProject(newIndex, "left");
  };

  const handleNext = () => {
    const newIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    handleChangeProject(newIndex, "right");
  };

  const { image, link } = projects[currentIndex];

  const translatedProject = t(`${currentIndex}`, {
    ns: "projects",
    returnObjects: true,
  });

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, [image]);

  return (
    <div className={styles.projects}>
      <div id="projects" className={`container ${styles.projects_container}`}>
        <h2 className={styles.title}>{t("common:projects_title")}</h2>

        <div className={`${styles.card} ${cardAnimation}`}>
          <div className={styles.imageWrapper}>
            <a
              className={styles.linkInfo}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.arrowLink}>
                <BsArrowUpRight className={styles.iconLink} />
              </span>
              <span className={styles.tooltip}>{t("common:view_project")}</span>
            </a>

            {!imageLoaded ? (
              <div className={styles.imageLoader}>
                <Loader />
              </div>
            ) : (
              <img
                src={image}
                alt={translatedProject.title}
                className={`${styles.image} ${
                  imageLoaded ? styles.loaded : ""
                }`}
              />
            )}
          </div>
          <div className={styles.info}>
            <h3 className={styles.titleInfo}>{translatedProject.title}</h3>
            <p className={styles.textInfo}>{translatedProject.description}</p>
          </div>
        </div>

        {isMobile ? (
          <div className={styles.pagination}>
            {projects.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ""
                }`}
                onClick={() =>
                  handleChangeProject(index, index > currentIndex ? "right" : "left")
                }
              />
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Projects;
