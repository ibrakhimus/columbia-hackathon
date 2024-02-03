import React from "react";
import Bill from "../components/Bill";
import Searchbar from "../components/Searchbar";
import Nav from "../components/Nav";

const Bills = ({ policies }) => {
  return (
    <section id="bills">
      <div className="row">
        <Nav />
        <Searchbar />

        <div className="bills__container">
          <Bill
            img="https://cmsny.org/wp-content/uploads/2022/12/shutterstock_717304567.jpg"
            name="Bill 1"
            date="12/12/2020"
          />

          <Bill
            img="https://cmsny.org/wp-content/uploads/2022/12/shutterstock_717304567.jpg"
            name="Bill 1"
            date="12/12/2020"
          />

          <Bill
            img="https://cmsny.org/wp-content/uploads/2022/12/shutterstock_717304567.jpg"
            name="Bill 1"
            date="12/12/2020"
          />
        </div>
      </div>
    </section>
  );
};

export default Bills;
