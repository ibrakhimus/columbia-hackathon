import React from "react";
import Nav from "../components/Nav";
import Searchbar from "../components/Searchbar";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
const Landing = ({ search, setSearch, bill, setBill }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const blob = document.getElementById("blob");
  
    window.onpointermove = event => { 
      const { clientX, clientY } = event;
  
      const adjustedX = Math.min(clientX - blob.offsetWidth / 2, window.innerWidth - blob.offsetWidth);
      const adjustedY = Math.min(clientY - blob.offsetHeight / 2, window.innerHeight - blob.offsetHeight);
  
      blob.animate({
        left: `${adjustedX}px`,
        top: `${adjustedY}px`
      }, { duration: 3000, fill: "forwards" });
    }
  }, []);


  return (
    <section id="hero">
      <div class='blob__container'>
        <div id="blob"></div>
        <div id="blur"></div>
      </div>
      <video
        src="https://cdn.vidzflow.com/v/H0LDXZjsnq_1080p_1703000142.mp4"
        autoPlay
        loop
        muted
      />
      <div className="hero__video--lighting"></div>
      <div className="hero__inner">
        <Nav />
        <div className="divider"></div>
        <div className="hero__below-divider">
          <div className="home__hero--headline">
            <div className="home__hero-1">
              <div>Simplify</div>
            </div>
            <div className="home__hero-2">
              <div>Bills</div>
            </div>
            <div className="home__hero-3">
              <div>Amplify,</div>
            </div>
            <div className="home__hero-4">
              <div className="overflow__none">Insight.</div>
            </div>
          </div>
          <h1 className="hero__h1">
            Looking through bills is impossible, we make it easy to see bills
            and see what other people are saying.
          </h1>
          <div className="hero__search--outer">
            <Searchbar search = {search}  setSearch = {setSearch} nav_funct={() => navigate('/bills')}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
