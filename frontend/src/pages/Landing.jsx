import React from "react";
import Nav from "../components/Nav";
import Searchbar from "../components/Searchbar";

const Landing = () => {
  return (
    <section id="hero">
      <video
        src="https://cdn.vidzflow.com/v/H0LDXZjsnq_1080p_1703000142.mp4"
        autoPlay
        loop
        muted
      />
      <div className="herovideo--lighting"></div>
      <div className="heroinner">
        <Nav />
        <div className="divider"></div>
        <div className="herobelow-divider">
          <div className="homehero--headline">
            <div className="homehero-1">
              <div>Simplify</div>
            </div>
            <div className="homehero-2">
              <div>Bills</div>
            </div>
            <div className="homehero-3">
              <div>Amplify,</div>
            </div>
            <div className="homehero-4">
              <div>Insight.</div>
            </div>
          </div>
          <h1 className="heroh1">
            Looking through bills is impossible, we make it easy to see bills
            and see what other people are saying.
          </h1>
          <div className="herosearch--outer">
            <Searchbar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;