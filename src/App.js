import "./App.css";
import Home from "./Pages/Home";
import PersonalInfo from "./Pages/PersonalInfo";
import Experience from "./Pages/Experience";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

function App() {
  const [file, setFile] = useState("");

  function uploadHandler(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Personal"
          element={<PersonalInfo uploadHandler={uploadHandler} file={file} />}
        />
        <Route path="/Experience" element={<Experience image={file} />} />
      </Routes>
    </div>
  );
}

export default App;
