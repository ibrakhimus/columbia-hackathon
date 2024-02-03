import React from "react";

const Landing = () => {
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <video
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src="https://cdn.vidzflow.com/v/H0LDXZjsnq_1080p_1703000142.mp4"
        autoPlay
        loop
        muted
      />
      <div style={{ position: "relative" }}>{/* Your content goes here */}</div>
    </div>
  );
};

export default Landing;

// <section id="hero">
//   <video
//     src="https://app.vidzflow.com/v/H0LDXZjsnq?dq=576&ap=true&muted=true&loop=true&ctp=false&bc=%234E5FFD&controls="
//     autoPlay
//     loop
//     muted
//   ></video>
//   <div>

//   </div>
// </section>
