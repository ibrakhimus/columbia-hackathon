import React, { useEffect, useState } from "react";
import Bill from "../components/Bill";
import Searchbar from "../components/Searchbar";
import Nav from "../components/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = "http://127.0.0.1:5000";

const Bills = ({ search, setSearch, bill, setBill }) => {
  const navigate = useNavigate()
  const [billList, setBillList] = useState([])
  const [isLoading, setIsLoading] = useState(false);

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
          var meta = res["metadatas"][0][0];

          var arr = [];
          for (var i = 0; i < 9; i++) {
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

  console.log(billList)
  return (
    <section id="bills">
      <div className="row">
        <Nav />
        <div className="hero__search--outer">
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
