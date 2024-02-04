import React, { useState, useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';
import 'vis-network/styles/vis-network.css';
import networkData from '../data/graph_data.json';
import { Slider } from 'antd';

const formatter = (value) => `${value}%`;

function GraphPage() {
  const [slider, setSlider] = useState(5);
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
        scaling: { min: 20, max: 80 },
        font: { size: 20, face: 'Tahoma' },
      },
      edges: {
        color: { inherit: true },
        width: 0.15,
        smooth: { type: 'continuous' },
      },
      interaction: { hideEdgesOnDrag: true, tooltipDelay: 200 },
      physics: false,
    };

    if (networkContainerRef.current) {
      if (!networkInstanceRef.current) {
        networkInstanceRef.current = new Network(networkContainerRef.current, { nodes: networkData.nodes.map(obj => ({
          ...obj,
          title: obj.label // Set the title to be equal to the label
        })), edges: filteredEdges }, options);
      } else {
        // Update the network data without re-initializing the network
        networkInstanceRef.current.setData({ nodes: networkData.nodes, edges: filteredEdges });
      }
    }
    
  
  }, [filteredEdges]); // Update this effect to depend on `filteredEdges`

  const handleSliderChange = (value) => {
    setSlider(value);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
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
          step = {5}
        />
      </div>
    </div>
  );
}

export default GraphPage;
