import "./App.css";
import Home from "./Pages/Home";
import PersonalInfo from "./Pages/PersonalInfo";
import Experience from "./Pages/Experience";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import Education from "./Pages/Education";

function App() {
  const [file, setFile] = useState(localStorage.getItem("image"));

  function uploadHandler(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    localStorage.setItem("image", file);
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
        <Route path="/Education" element={<Education />} />
      </Routes>
    </div>
  );
}

export default App;
