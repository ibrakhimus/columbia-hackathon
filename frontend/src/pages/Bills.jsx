import React from 'react';
import Bill from '../components/Bill';

const Bills = ({ policies }) => {
    return (
        <section id='bills'>
            <div className="row">
                <h1>Search</h1>

                <div className="bills__container">
                    <Bill
                    pic="https://www.senate.gov/general/resources/images/legislative_process.jpg"
                    name="Bill 1"
                    date="12/12/2020"
                    />
                </div>
            </div>
        </section>
    );
}

export default Bills;
