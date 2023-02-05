import "./App.css";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
