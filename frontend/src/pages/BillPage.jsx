import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Nav from '../components/Nav';
import axios from 'axios';



const BillPage = () => {


  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = 'DACA Act';
      const amount = 3;
      let url = "http://127.0.0.1:5000/get_news"
      const result = await axios.get(url + "/" + query + "/" + amount);

      setNews(result.data);
      console.log(result.data)
    };

    fetchData();
  }, []);

  const items = [{
    title: "May 1940",
    cardTitle: "Dunkirk",
    url: "http://www.history.com",
    cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
    cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
      type: "IMAGE",
      source: {
        url: "https://preview.redd.it/could-someone-help-me-find-the-original-source-blank-image-v0-j40ek4jtksaa1.jpg?width=640&crop=smart&auto=webp&s=bc6ed7db0f15554843ab62de5ee71cce50435647"
      }
    }
  },
  {
    title: "May 1940",
    cardTitle: "Dunkirk",
    url: "http://www.history.com",
    cardSubtitle: "Men of the British Expeditionary Force (BEF) wade out to..",
    cardDetailedText: "Men of the British Expeditionary Force (BEF) wade out to..",
    media: {
      type: "IMAGE",
      source: {
        url: "https://i.pinimg.com/736x/58/d2/66/58d266f90982b069f528b56ddb13b7f6.jpg"
      }
    }
  },
  ];

  // useEffect(() => {
  //     const fetchData = async () => {
  //       const result = await axios.get('https://api.worldnewsapi.com/search-news', {
  //         params: {
  //           text: 'DACA Act',
  //           language: 'en',
  //           number: 10,
  //           'api-key': '2999e54b97f542f6bdc2ee3c47a754a2',
  //         }
  //       });

  //       setNews(result.data);
  //     };

  //     fetchData();
  //   }, []);


  return (
    <>
      <Nav />
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
                  {/* {news.map((article, index) => (
                  <div key={index}>
                    <h2>{article.title}</h2>
                    <img src={article.image} alt={article.title}/>
                    <p>{article.text.substring(0, 200)}...</p>
                  </div>
                  ))}
                </div>
            <div className="bill__timeline">
                
            </div>
            </div>
        </section>
        </>
    );
}

export default BillPage;
