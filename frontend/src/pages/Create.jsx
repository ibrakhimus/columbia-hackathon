import React from "react";
import Nav from "../components/Nav";
import CreateBill from "../assets/createbill.svg";

const Create = () => {
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
          <form className="create__container--right-form">
            <label className="create__container--label">
              <div className="label-div">Proposed Bill:</div>
              <textarea />
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
