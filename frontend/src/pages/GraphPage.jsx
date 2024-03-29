import React, { useState, useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';
import 'vis-network/styles/vis-network.css';
import networkData from '../data/graph_data.json';
import { Slider } from "antd"
import Nav from '../components/Nav';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const backendUrl = "http://127.0.0.1:5000";
const formatter = (value) => `${value}%`;

function GraphPage({setBill}) {
  var navigate = useNavigate()
  const [slider, setSlider] = useState(10);
  const [filteredEdges, setFilteredEdges] = useState([]);
  const networkContainerRef = useRef(null);
  const networkInstanceRef = useRef(null); // Ref to store the network instance

  useEffect(() => {
    const filtered = filterEdgesByRandomPercentage(networkData.edges, slider);
    setFilteredEdges(filtered);
  }, [slider]);

  function filterEdgesByRandomPercentage(edges, percentage) {
    const countToKeep = Math.floor((percentage / 100) * edges.length);
    const shuffled = shuffleArray([...edges]); // Create a copy to shuffle
    return shuffled.slice(0, countToKeep);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    const options = {
      nodes: {
        shape: 'dot',
        scaling: { min: 20, max: 100 },
        font: { size: 20, face: 'Tahoma', color: 'rgba(0,0,0,0.7)'},
      },
      edges: {
        color: { inherit: true },
        width: 0.25,
        smooth: { type: 'continuous' },
      },
      interaction: { hideEdgesOnDrag: true, tooltipDelay: 200 },
      physics: false,
    };

    if (networkContainerRef.current) {
      if (!networkInstanceRef.current) {
        networkInstanceRef.current = new Network(networkContainerRef.current, {
          nodes: networkData.nodes.map(obj => ({
            ...obj,
            title: obj.label // Set the title to be equal to the label
          })), edges: filteredEdges
        }, options);
      } else {
        // Update the network data without re-initializing the network
        networkInstanceRef.current.setData({ nodes: networkData.nodes, edges: filteredEdges });
      }
    }

    async function traverse(text){
      var res = await axios.get(`${backendUrl}/get_doc/${text}/1`)
      res = res["data"]
      console.log(res)

      var meta = res["metadatas"][0][0];

      
      var total_obj = {
        "title": meta["title"],
        "short_title": meta["short_title"],
        "author": meta["sponsor_name"],
        "party": meta["sponsor_party"],
        "date": meta["latest_major_action_date"],
        "img_url": "",
        "meta": meta
      }

      setBill(total_obj)
      navigate("/bill")
      

    }


    networkInstanceRef.current.on("click", function(params) {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0]; // Get the first node's ID
        const node = networkData.nodes.find(node => node.id === nodeId); // Find the node object by its ID
        if (node) {
          console.log("Clicked node label:", node.title); // Log the label of the node
          traverse()
        }
      }
    });
  


  }, [filteredEdges]); // Update this effect to depend on `filteredEdges`

  const handleSliderChange = (value) => {
    setSlider(value);
  };

  return (
    <div>
      <Nav />

      <div style={{ position: 'relative', height: '80vh', width: '100%' }}>
        <div ref={networkContainerRef} id="mynetwork" style={{ height: '100%', width: '100%' }} />
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: "0",
          right: "0",
          margin: "auto",
          width: "300px",
          boxShadow: "4px 4px 8px rgba(70, 70, 70, 1.0)",
          borderRadius: "8px",
          backgroundColor: "lightgray",
          opacity: 0.5
        }}>
          <Slider
            value={slider}
            onChange={handleSliderChange}
            tooltipVisible
            tipFormatter={formatter}
            step={10}
          />
        </div>
      </div>
    </div>
  );
}

export default GraphPage;
