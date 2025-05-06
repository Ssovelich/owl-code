import './App.css'
import { useEffect, useState } from "react";

import Header from './header/Header.jsx';
import Hero from "./Hero/Hero.jsx";
import Services from './Services/Services.jsx';
import Footer from "./Footer/Footer.jsx";
// import Loader from "./Loader/Loader.jsx";



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
        <Header scrolled={scrolled}/>
        <main className="content">
         
            <Hero scrolled={scrolled}/>
            <Services/> 
          
         </main>
        <Footer />
      </div>
     )
}

export default App
