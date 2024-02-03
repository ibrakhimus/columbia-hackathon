import React from 'react';

const BillPage = () => {
    return (
        <section id="bill">
            <button className="back">Back</button>
            <div className="billpage__container">
                <div className="bill__author--container">
                    <figure className="author__img--wrapper">
                        <img className="author__img" src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Bill_Clinton.jpg" alt="author" />
                    </figure>
                    <div className="author__name">Bill Clinton</div>
                    <div className="author__wing">Right Wing</div>
                    <div className="line"></div>
                    <div className="email__container">
                        <div className="email__icon"></div>
                        <div className="email__text">Email: billclinton@gmail.com</div>
                    </div>
                </div>
                <div className="bill__middle--container">

                </div>
                <div className="bill__news">

                </div>
            </div>
        </section>
    );
}

export default BillPage;
