// App.js
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Module from "./components/Module";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/module" element={<Module />}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
