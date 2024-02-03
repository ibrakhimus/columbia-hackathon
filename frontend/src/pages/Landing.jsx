import React from "react";
import Nav from "../components/Nav";

const Landing = () => {
  return (
    <section id="hero">
      <video
        src="https://cdn.vidzflow.com/v/H0LDXZjsnq_1080p_1703000142.mp4"
        autoPlay
        loop
        muted
      />
      <div className="hero__inner">
        <Nav />
      </div>
    </section>
  );
};

export default Landing;
