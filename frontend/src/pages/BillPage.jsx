import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Nav from '../components/Nav';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const backendUrl = "http://127.0.0.1:5000";

const BillPage = ({ search, setSearch, bill, setBill }) => {

  const navigate = useNavigate()
  const [billList, setBillList] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [img, setImg]  = useState("")
  const [similarBills, setSimilarBills] = useState([]);
  const [currentBillId, setCurrentBillId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const numImg = 3;
      if (search !== "") {
        try {
          setIsLoading(true); // Start loading
          console.log(`${backendUrl}/get_doc/${search}/${numImg}`);
          var res = await axios.get(`${backendUrl}/get_doc/${search}/${numImg}`);
          res = res["data"];

          var docs = res["documents"][0];
          var ids = res["ids"][0];
          var meta = res["metadatas"][0][0];
          setCurrentBillId(ids[0]) // not too sure if thats the proper path

          var arr = [];
          for (var i = 0; i < numImg; i++) { 
            var img = await axios.get(`${backendUrl}/get_image/${ids[i]}`);
            console.log(img);
            arr.push({
              "title": docs[i],
              "short_title": ids[i],
              "author": meta["sponsor_name"],
              "party": meta["sponsor_party"],
              "date": meta["latest_major_action_date"],
              "img_url": img["data"],
              "meta": meta
            });
          }
          setBillList(arr);
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle any errors here
        }
        setIsLoading(false); // End loading
      }
    }
    fetchData();
  }, [search]);



  useEffect(() => {  
    // Fetch the similar bills
    fetch(`${backendUrl}/search?term=${search}`)
      .then((response) => response.json())
      .then((data) => {
        const filteredBills = data.filter((bill) => bill.id !== currentBillId);
        setSimilarBills(filteredBills.slice(0, 3));
      });
  }, [search, setBill]);

  // const blobRef = useRef(null);

  // useEffect(() => {
  //   const handlePointerMove = event => {
  //     const { clientX, clientY } = event;
      
  //     blobRef.current.style.left = `${clientX}px`;
  //     blobRef.current.style.top = `${clientY}px`;
  //   };

  //   window.addEventListener('pointermove', handlePointerMove);

  //   // Clean up function to remove the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('pointermove', handlePointerMove);
  //   };
  // }, []);

  useEffect(() => {
    const search = bill.search; // Replace with the actual property name in the bill object
    const currentBillId = bill.id; // Replace with the actual property name in the bill object
  
    // Fetch the current bill...
  
    // Fetch the similar bills
    fetch(`${backendUrl}/search?term=${search}`)
      .then((response) => response.json())
      .then((data) => {
        const filteredBills = data.filter((bill) => bill.id !== currentBillId);
        setSimilarBills(filteredBills.slice(0, 3));
      });
  }, [bill]); // Add bill to the dependency array


  if (bill == null) {
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
  }
  else {
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
  ];}

  function constructEmail(name, house) {
    // Convert the name to lowercase and replace spaces with dots
    const emailName = name.toLowerCase().replace(/\s+/g, '.');
    // Construct the email address
    const email = `${emailName}@mail.${house.toLowerCase()}.gov`;
    return email;
  }

  const sendEmail = (emailAddress, emailSubject, emailBody) => {
    // Encode subject and body to handle special characters
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailBody);

    // Construct the mailto link
    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
    console.log(mailtoLink)
    // Use window.location.href for compatibility with all browsers
    window.location.href = mailtoLink;
  };

  async function sendMail() {
    if (bill) {
      console.log(`${backendUrl}/support_email/${bill["short_title"]}`)
      var response = await axios.get(`${backendUrl}/support_email/${bill["short_title"]}`)
      var res = response["data"]["obj"]
      console.log(res)
      sendEmail(res[0], res[2] ,res[1])
      
    }
    
  }


  return (
    <div id='zind'>
      <Nav />
      <section id="bill">
        <button className="back">Back</button>
        <h1 className="bill__middle--title">{bill ? bill["short_title"] : "DACA Act"}</h1>
        <div className="bill__middle--date">{bill ? bill["date"] : "12/12/2020"}</div>
        <div className="billpage__container">
        <div className="bill__author--container">
            <figure className="author__img--wrapper">
              <img className="author__img" src={img} alt="author" />
            </figure>
            <div className="author__name">{bill ? bill["author"] : "Bill Clinton"}</div>
            <div className="author__wing">{bill ? (bill["meta"]["sponsor_party"] == "D"? "Democrat": "Republican"): "Republican"}</div>
            <div className="line"></div>
            <div className="email__container">
              <div className="email__text">{bill ? constructEmail(bill["author"], (bill["meta"]["number"][0] == "S"?"Senate" : "House")) : "billclinton@gmail.com"}</div>
            </div>
            <button onClick = {() => sendMail()}className="email__button">Send Email</button>
          </div>
          <div className="bill__middle--container">
          <div className="summary__container">
            <h1 className='summary_h1'>Summary</h1>
            <div className="bill__middle--summary">{bill? bill["title"] :"Summary" }</div>
          </div>
            <div className="latest__action--container">
              <div className="latest__action--title">Latest Action</div>
            <div className="bill__middle--sponsors">{bill ? (bill["meta"]["latest_major_action"] == "" ? bill["meta"]["latest_major_action"] : "Not yet before committee") : ""}</div>
            </div>
          </div>
        </div>
        <div className="bill__news">
          {news.map((article, index) => (
            <div className='article' key={index}>
              <figure className="article__img--wrapper">
                <img className='article__img' src={article.image} alt={article.title} />
              </figure>
              <h2 className='article__title'>{article.title}</h2>
              <p className='article__text'>{article.text.substring(0, 200)}...</p>
            </div>
          ))}
        </div>


        <div className="similar__bills--container">
            <h1 className="similar__bills--title">Similar Bills</h1>
            <div className="similar__bills--wrapper">
              <div className="bill">
              <button onClick = {() => sendMail()}className="email__button">Send Email</button>
                <figure className="bill__img--wrapper" onClick={bill.onClick}>
                    <img className="bill__img" src={bill.img} alt={bill.name}/>
                </figure>
                <div className="bill__description">
                    <h3 className="bill__title">{bill.name.length > 45 ? bill.name.substring(0, 45) + '...' : bill.name}</h3>
                    <p className="bill__para">{bill.date}</p>
                </div>
            </div>
            </div>
        </div>
      </section>
    </div>
  );
}

export default BillPage;
