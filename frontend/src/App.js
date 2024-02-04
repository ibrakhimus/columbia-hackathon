import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Bills from './pages/Bills';
import BillPage from './pages/BillPage';
import {useState} from "react"
import GraphPage from './pages/GraphPage';
import { useEffect } from 'react';

function App() {
  const [search, setSearch] = useState("")
  const [bill, setBill] = useState(null)

  return (
    <>
    <div class="gradient-bg"></div>
    <Router>
      <Routes>
        <Route path="/" element={<Landing search = {search} setSearch = {setSearch} bill = {bill} setBill = {setBill}/>} />
        <Route path="/bills" element={<Bills search = {search} setSearch = {setSearch} bill = {bill} setBill = {setBill}/>} />
        <Route path="/bill" element={<BillPage search = {search} setSearch = {setSearch} bill = {bill} setBill = {setBill}/>} />
        <Route path="/graph" element={<GraphPage/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;