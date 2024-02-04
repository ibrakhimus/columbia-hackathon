import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const BillPage = () => {
    const [author, setAuthor] = useState({});

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/get_doc/daca/4')
            .then(response => {
                console.log(response.data)
                setAuthor(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

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
                        <FontAwesomeIcon icon={faEnvelope} />
                        <div className="email__text">billclinton@gmail.com</div>
                    </div>
                    <button className="email__button">Send Email</button>
                </div>

                <div className="bill__middle--container">
                    <h1 className="bill__middle--title">DACA Act</h1>
                    <div className="bill__middle--date">12/12/2020</div>
                    <div className="bill__middle--sponsors">Sponsors: Mahdi Tanzim</div>
                    <div className="bill__middle--summary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero facilis vel necessitatibus temporibus exercitationem perferendis itaque, reiciendis quam corporis labore!</div>
                </div>
                <div className="bill__news">

                </div>
            </div>
        </section>
    );
}

export default BillPage;
