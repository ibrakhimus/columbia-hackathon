import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Bills from './pages/Bills';
import BillPage from './pages/BillPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/bill" element={<BillPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;