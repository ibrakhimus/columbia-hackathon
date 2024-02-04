import React, { useEffect, useState } from "react";
import Bill from "../components/Bill";
import Searchbar from "../components/Searchbar";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';
import arrowRight from "../assets/right-arrow.png";

const backendUrl = "http://127.0.0.1:5000";

const Bills = ({ search, setSearch, bill, setBill }) => {
  const navigate = useNavigate()
  const [billList, setBillList] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const trailer = useRef(null);

  useEffect(() => {
    const animateTrailer = (e, interacting) => {
      const x = e.clientX - trailer.current.offsetWidth / 2,
            y = e.clientY - trailer.current.offsetHeight / 2;
      
      const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${interacting ? 2 : 1})`
      }
      
      trailer.current.animate(keyframes, { 
        duration: 800, 
        fill: "forwards" 
      });
    }


    const handleMouseMove = e => {
      const interactable = e.target.closest(".bill__img--wrapper"),
            interacting = interactable !== null;
      
      animateTrailer(e, interacting);
 
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        } else {
          entry.target.classList.remove('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // Clean up function to disconnect the observer when the component unmounts
    return () => observer.disconnect();

    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  

  useEffect(() => {
    async function fetchData() {
      if (search !== "") {
        try {
          setIsLoading(true); // Start loading
          console.log(`${backendUrl}/get_doc/${search}/9`);
          var res = await axios.get(`${backendUrl}/get_doc/${search}/9`);
          res = res["data"];

          var docs = res["documents"][0];
          var ids = res["ids"][0];
          var meta = res["metadatas"][0];

          var arr = [];
          for (var i = 0; i < 9; i++) {
            var img = await axios.get(`${backendUrl}/get_image/${ids[i]}`);
            console.log(img);
            arr.push({
              "title": docs[i],
              "short_title": ids[i],
              "author": meta[i]["sponsor_name"],
              "party": meta[i]["sponsor_party"],
              "date": meta[i]["latest_major_action_date"],
              "img_url": img["data"],
              "meta": meta[i]
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



  console.log(billList)
  return (
    <section id="bills">
      <div id="trailer" ref={trailer}>
        <img id="trailer-icon" src={arrowRight} alt="" />
      </div>
      <div className="row">
        <Nav classNam ="hidden"/>
        <div className="hero__search--outer hidden">
          <Searchbar search = {search} setSearch={setSearch} />
        </div>
        {isLoading ? "Loading..." :
        <div className="bills__container">
          {billList.map(obj => {
            return <Bill
              img={obj["img_url"]}
              name={obj["short_title"]}
              data={obj["date"]}
              onClick={() => {
                setBill(obj);
                navigate("/bill");
              }}
            />
          })}
        </div>}
      </div>
    </section>
  );
};

export default Bills;
