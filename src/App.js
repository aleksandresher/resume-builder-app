import "./App.css";
import Home from "./Pages/Home";
import PersonalInfo from "./Pages/PersonalInfo";
import Experience from "./Pages/Experience";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import Education from "./Pages/Education";
import UserContext from "../src/context/userContext";
// import { StateMachineProvider, createStore } from "little-state-machine";

function App() {
  const [data, setData] = useState();

  console.log(data);

  return (
    <UserContext.Provider value={{ data, setData }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Personal"
            element={
              <PersonalInfo
              // updateUserData={updateUserData}
              // changeHandler={changeHandler}
              // file={localStorage.getItem("image")}
              />
            }
          />
          <Route
            path="/Experience"
            element={
              <Experience
                file={localStorage.getItem("image")}
                // updateUserData={updateUserData}
              />
            }
          />
          <Route path="/Education" element={<Education />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
