import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Bills from './pages/Bills';
import BillPage from './pages/BillPage';
import {useState} from "react"
import { useEffect } from 'react';

function App() {
  const [search, setSearch] = useState("")
  const [bill, setBill] = useState(null)

  useEffect(() => {
    const blob = document.getElementById("blob");

    window.onpointermove = event => { 
      const { clientX, clientY } = event;

      blob.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
      }, { duration: 3000, fill: "forwards" });
    }
  }, []);
  
  return (
    <>
    <div class="gradient-bg"></div>
    <div id="blob"></div>
    <div id="blur"></div>
    <Router>
      <Routes>
        <Route path="/" element={<Landing search = {search} setSearch = {setSearch} bill = {bill} setBill = {setBill}/>} />
        <Route path="/bills" element={<Bills search = {search} setSearch = {setSearch} bill = {bill} setBill = {setBill}/>} />
        <Route path="/bill" element={<BillPage search = {search} setSearch = {setSearch} bill = {bill} setBill = {setBill}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;