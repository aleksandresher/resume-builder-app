import "./App.css";
import Home from "./Pages/Home";
import PersonalInfo from "./Pages/PersonalInfo";
import Experience from "./Pages/Experience";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import Education from "./Pages/Education";
import UserContext from "../src/context/userContext";
import { StateMachineProvider, createStore } from "little-state-machine";
// import { StateMachineProvider, createStore } from "little-state-machine";

function App() {
  // const [image, setImage] = useState(localStorage.getItem("imageEnd"));

  // const updateImage = (image) => {
  //   setImage(image);
  //   localStorage.setItem("imageEnd", image);
  // };
  const [imageFile, setImageFile] = useState(localStorage.getItem("imageFile"));

  function updateImageFile(file) {
    setImageFile(file);
    localStorage.setItem("imageFile", file);
  }
  createStore({
    user: {
      name: "",
      image: "",
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
  // const [data, setData] = useState(localStorage.getItem("allValue"));

  // const [allData, setAllData] = useState();
  // useEffect(() => {
  //   localStorage.setItem("datadata", allData);
  // }, [allData]);

  // function updateAllData(allData) {
  //   setAllData(allData);
  // }
  // console.log(allData);

  // console.log(data);

  //   return (
  //     <UserContext.Provider value={{ data, setData }}>
  //       <div className="App">
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route
  //             path="/Personal"
  //             element={
  //               <PersonalInfo
  //                 updateAllData={updateAllData}
  //                 // updateUserData={updateUserData}
  //                 // changeHandler={changeHandler}
  //                 // file={localStorage.getItem("image")}
  //               />
  //             }
  //           />
  //           <Route
  //             path="/Experience"
  //             element={
  //               <Experience
  //                 updateAllData={updateAllData}
  //                 file={localStorage.getItem("image")}
  //                 // updateUserData={updateUserData}
  //               />
  //             }
  //           />
  //           <Route
  //             path="/Education"
  //             element={
  //               <Education
  //                 updateAllData={updateAllData}
  //                 fullData={localStorage.getItem("datadata")}
  //               />
  //             }
  //           />
  //         </Routes>
  //       </div>
  //     </UserContext.Provider>
  //   );
  // }

  return (
    <StateMachineProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Personal"
            element={
              <PersonalInfo
                updateImageFile={updateImageFile}
                // imagepath={image}
                // updatImage={updateImage}
                // updateAllData={updateAllData}
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
                // updateAllData={updateAllData}
                file={localStorage.getItem("image")}
                // updateUserData={updateUserData}
              />
            }
          />
          <Route
            path="/Education"
            element={
              <Education
                // updateAllData={updateAllData}
                imageFile={imageFile}
                fullData={localStorage.getItem("datadata")}
              />
            }
          />
        </Routes>
      </div>
    </StateMachineProvider>
  );
}

export default App;
