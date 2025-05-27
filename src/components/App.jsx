import "./App.css";
import { useEffect, useState } from "react";

import Header from "./header/Header.jsx";
import Hero from "./Hero/Hero.jsx";
import Services from "./Services/Services.jsx";
import Footer from "./Footer/Footer.jsx";
// import Loader from "./Loader/Loader.jsx";
import Consultation from "./Consultation/Consultation.jsx";
import Advantages from "./Advantages/Advantages.jsx";
import Projects from "./Projects/Projects.jsx";
import Processes from "./Processes/Processes.jsx";
import About from "./About/About.jsx";

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="wrapper">
      <Header scrolled={scrolled} />
      <main className="content">
        <Hero scrolled={scrolled} />
        <Services />
        <Processes />
        <About />
        <Projects />
        <Advantages />
        <Consultation />
      </main>
      <Footer />
    </div>
  );
}

export default App;
