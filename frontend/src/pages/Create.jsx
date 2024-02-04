import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import Nav from "../components/Nav";
import CreateBill from "../assets/createbill.svg";

const backendUrl = "http://127.0.0.1:5000";

const Create = () => {
  const [billInfo, setBillInfo] = useState("");
  const [billOpinion, setBillOpinion] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const onSubmit = async (e) => {
    // console.log("I was called")
    e.preventDefault();
    // console.log(billInfo, billOpinion, additionalInfo)
    
    const response = await axios.post(`${backendUrl}/gen_bill_proposal`, {
      "bill_info": billInfo,
      "bill_opinion": billOpinion,
      "additional_info": additionalInfo,
    });
    console.log(response.data);
  };

  return (
    <section>
      <Nav />
      <div className="divider2"></div>
      <div className="create__container">
        <div className="create__container--left">
          <figure className="create__container__img-outer">
            <img className="create__container__img" src={CreateBill} alt="" />
          </figure>
          <h1 className="create__container--h1">Submit a Bill Yourself</h1>
        </div>
        <div className="create__container--right">
          <form className="create__container--right-form" onSubmit={e => onSubmit(e)}>
            <label className="create__container--label">
              <div className="label-div">Proposed Bill:</div>
              <textarea value={billInfo} onChange={e => setBillInfo(e.target.value)} />
            </label>
            <label className="create__container--label">
              <div className="label-div">Opinion:</div>
              <textarea value={billOpinion} onChange={e => setBillOpinion(e.target.value)} />
            </label>
            <label className="create__container--label">
              <div className="label-div">Additional Information:</div>
              <textarea value={additionalInfo} onChange={e => setAdditionalInfo(e.target.value)} />
            </label>
            <input
              className="create__container--input"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Create;
