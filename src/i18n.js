import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import ua from "./locales/ua.json";
import servicesEn from "./locales/servicesEn.json";
import servicesUa from "./locales/servicesUa.json";
import advantagesEn from "./locales/advantegesEn.json";
import advantagesUa from "./locales/advantegesUA.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en, services: servicesEn, advantages: advantagesEn },
    ua: { translation: ua, services: servicesUa, advantages: advantagesUa },
  },
  lng: localStorage.getItem("language") || "ua",
  fallbackLng: "ua",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
