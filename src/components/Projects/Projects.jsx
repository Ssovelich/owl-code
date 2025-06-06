import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./Projects.module.css";
import projects from "./projectsData.json";
import { useTranslation } from "react-i18next";
import Loader from "../Loader/Loader";
import { BsArrowUpRight } from "react-icons/bs";
import { useMediaQuery } from "../../utils/useMediaQuery";

const ANIMATION_DURATION = 600;

const Projects = () => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [cardAnimation, setCardAnimation] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("right");
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  const { t } = useTranslation("projects");
  const isMobileOrTablet = useMediaQuery("(max-width: 1023px)");

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // === Memoized handlers ===
  const handleChangeProject = useCallback(
    (newIndex, dir) => {
      if (isAnimating || newIndex === currentIndex) return;

      setIsAnimating(true);
      setDirection(dir);
      setCardAnimation(
        dir === "right" ? styles.cardExitLeft : styles.cardExitRight
      );

      setTimeout(() => {
        setCurrentIndex(newIndex);
        setImageLoaded(false);
        setCardAnimation(
          dir === "right" ? styles.cardEnterFromRight : styles.cardEnterFromLeft
        );
      }, ANIMATION_DURATION);

      setTimeout(() => {
        setCardAnimation("");
        setIsAnimating(false);
      }, ANIMATION_DURATION * 2);
    },
    [isAnimating, currentIndex]
  );

  const handlePrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    handleChangeProject(newIndex, "left");
  }, [currentIndex, handleChangeProject]);

  const handleNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    handleChangeProject(newIndex, "right");
  }, [currentIndex, handleChangeProject]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 50) {
      setShowSwipeHint(false); // hide hint after swipe
      distance > 0 ? handleNext() : handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [handleNext, handlePrev]);

  const { image, link } = projects[currentIndex];

  const translatedProject = t(`${currentIndex}`, {
    ns: "projects",
    returnObjects: true,
  });

  // preload image
  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, [image]);

  // add keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // show swipe hint only when section is in viewport (mobile/tablet)
  useEffect(() => {
    if (!isMobileOrTablet || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSwipeHint(true); // показати підказку

          observer.disconnect(); // лише один раз
        }
      },
      {
        threshold: 0.3, // коли хоча б 30% секції видно
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [isMobileOrTablet]);

  return (
    <div className={styles.projects}>
      <div
        id="projects"
        ref={sectionRef}
        className={`container ${styles.projects_container}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h2 className={styles.title}>{t("common:projects_title")}</h2>

        {showSwipeHint && (
          <div className={styles.swipeHint}>
            <span
              className={styles.swipeFinger}
              onAnimationEnd={() => setShowSwipeHint(false)}
            >
              👆
            </span>
          </div>
        )}

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

        {isMobileOrTablet ? (
          <div className={styles.pagination}>
            {projects.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.activeDot : ""
                }`}
                onClick={() =>
                  handleChangeProject(
                    index,
                    index > currentIndex ? "right" : "left"
                  )
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
