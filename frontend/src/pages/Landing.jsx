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
        {/* <div className="home__hero--headline">
            <div className="home__hero-1">
                <div>Not</div>
            </div>
            <div className="home__hero-2">
                <div>Just</div>
            </div>
            <div className="home__hero-3">
                <div>Faster,</div>
            </div>
            <div className="home__hero-4">
                <div>Better.</div>
            </div>
        </div> */}
      </div>
    </section>
  );
};

export default Landing;