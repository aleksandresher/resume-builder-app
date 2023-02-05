import "./App.css";
import Home from "./Pages/Home";
import PersonalInfo from "./Pages/PersonalInfo";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Personal" element={<PersonalInfo />} />
      </Routes>
    </div>
  );
}

export default App;
