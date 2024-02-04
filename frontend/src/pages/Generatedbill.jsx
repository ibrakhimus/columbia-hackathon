import React from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Nav from "../components/Nav";

const GeneratedBill = () => {
  const location = useLocation();
  // console.log(location.state);
  const responseData = location.state;
  // console.log(responseData)
  return (
    <section className="generated__section">
        <Nav />
      <h1 className="generated__h1">Here is your Bill</h1>
      <div className="response__data">
        <ReactMarkdown>{responseData}</ReactMarkdown>
      </div>
      <div className="generated__drop--buttons">
        <div className="send-gmail">Email</div>
        <div className="send-gmail">Download</div>
        <div className="send-gmail">Share</div>
      </div>
    </section>
  );
};

export default GeneratedBill;