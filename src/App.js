import "./App.css";
import Home from "./Pages/Home";
import PersonalInfo from "./Pages/PersonalInfo";
import Experience from "./Pages/Experience";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Education from "./Pages/Education";
import { StateMachineProvider, createStore } from "little-state-machine";

function App() {
  // const [file, setFile] = useState(localStorage.getItem("image"));

  // function uploadHandler(e) {
  //   setFile(URL.createObjectURL(e.target.files[0]));
  //   localStorage.setItem("image", file);
  // }

  // const [data, setData] = useState();

  // function updateUserData(value) {
  //   setData({ ...data, value });
  // }
  // console.log(data);

  createStore({
    user: {
      name: "",
      surname: "",
      email: "",
      phone_number: "",
      experience: [
        {
          position: "",
          employer: "",
        },
      ],
      education: [
        {
          institute: "",
          degree: "",
        },
      ],
    },
  });

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e) => {
    console.log("clikder");
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
          localStorage.setItem("image", result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  return (
    <StateMachineProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Personal"
            element={
              <PersonalInfo
                // updateUserData={updateUserData}
                changeHandler={changeHandler}
                file={localStorage.getItem("image")}
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
    </StateMachineProvider>
  );
}

export default App;
