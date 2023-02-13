import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import email_icon from "../assets/emailIcon.png";
import mobile_icon from "../assets/MobIcon.png";
import arrow from "../assets/arrow.png";

import UserContext from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import ResultPage from "./ResultPage";
import { useNavigate, Link } from "react-router-dom";

function Education({ imageFile, sendData, updateResultData }) {
  const { actions, state } = useStateMachine({
    updateAction,
  });
  console.log(imageFile);
  const navigate = useNavigate();
  // const [resultError, setResultError] = useState(false);

  function controlFunc(res) {
    if (res.request.statusText === "Created") {
      updateResultData(res.data);
      console.log("good job");
      navigate("/ResultPage");
    }
  }
  useEffect(() => {
    fetch(imageFile)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        console.log(file);
        actions.updateAction({ image: file });
      });
  }, [actions]);
  console.log(state);

  const [AllData, setAllData] = useState();

  // AllData ?  /> : setResultError(true);

  // console.log(AllData);
  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      educations: [
        {
          institute: "",
          degree_id: "",
          due_date: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  useFormPersist("educations", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  let forUpdate = watch("educations");
  const onSubmit = (values) => {
    actions.updateAction(values);
  };

  const [degree, setDegree] = useState();
  const [error, setError] = useState();

  async function getDegree() {
    try {
      const response = await fetch(
        "https://resume.redberryinternship.ge/api/degrees"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      setDegree(data);
      localStorage.setItem("degree", degree);
      // localStorage.setItem("dgr", degree);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleSending(event) {
    event.preventDefault();
    navigate("/ResultPage");
    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const url = "https://resume.redberryinternship.ge/api/cvs";

    axios
      .post(url, state, config)
      .then(
        (res) => controlFunc(res)
        // res.request.statusText === "Created" ? setAllData(res.data) : ""
      )

      .catch((err) => console.log(err));
  }
  return (
    <EducationContainer>
      <EducationInformation>
        <EducationHeader>
          <BackToHome src={arrow} />
          <EdHeading>განათლება</EdHeading>
          {/* <button type="button" onClick={updateData}>
            click to update
          </button> */}
          <EdP>3/4</EdP>
        </EducationHeader>

        {fields.map((field, index) => {
          return (
            <EducationForm
              key={field.id}
              id="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <InstituteBox>
                <InputLabel htmlFor="firstName">სასწავლებელი</InputLabel>
                <InstituteInput
                  type="text"
                  placeholder="სასწავლებელი"
                  {...register(`educations.${index}.institute`, {
                    required: true,
                    minLength: { value: 2 },
                  })}
                ></InstituteInput>
                <InputParagraph>მინუმუმ 2 სიმბოლო</InputParagraph>
              </InstituteBox>

              {/* <select {...register(`educations.${index}.gender`)}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
              </select> */}

              <DegreeAndDateContainer>
                <Degree>
                  <InputLabel>ხარისხი</InputLabel>
                  <DegreeSelect
                    onClick={getDegree}
                    {...register(`educations.${index}.degree_id`)}
                  >
                    <option value="">აირჩიე ხარისხი</option>
                    {degree?.map(({ id, title }) => (
                      <DegreeOption key={id} value={id}>
                        {title}
                      </DegreeOption>
                    ))}
                  </DegreeSelect>
                </Degree>

                <EndDate>
                  <InputLabel>დამთავრების თარიღი</InputLabel>
                  <EndDateInput
                    type="date"
                    {...register(`educations.${index}.due_date`, {
                      required: true,
                    })}
                  />
                </EndDate>
              </DegreeAndDateContainer>

              <EducationDescription>
                <InputLabel>აღწერა</InputLabel>
                <TextAreaField
                  placeholder="განათლების აღწერა"
                  {...register(`educations.${index}.description`, {
                    required: true,
                  })}
                ></TextAreaField>
              </EducationDescription>
              <RemoveBtn type="button" onClick={() => remove(index)}>
                ფორმის წაშლა
              </RemoveBtn>
            </EducationForm>
          );
        })}
        <AppendButton type="button" onClick={() => append()}>
          სხვა სასწავლებლის დამატება
        </AppendButton>
        <button type="button" onClick={handleSending}>
          send Data
        </button>
        <Buttons>
          <Link to={"/Experience"}>
            <PreBtn type="button">უკან</PreBtn>
          </Link>
          <NextBtn type="button" onClick={handleSending}>
            დასრულება
          </NextBtn>
        </Buttons>
      </EducationInformation>
      <LiveInfo>
        <PerInfoContainer>
          <NameSurname>
            <Name>{state.name}</Name>
            <Name>{state.surname}</Name>
          </NameSurname>
          <Box>
            <Icon src={email_icon} />
            <Generic>{state.email}</Generic>
          </Box>

          <Box>
            <Icon src={mobile_icon} />
            <Generic>{state.phone_number}</Generic>
          </Box>

          {state.about_me ? <P>ჩემ შესახებ</P> : ""}
          <About>{state.about_me}</About>

          <UserImage src={localStorage.getItem("imageBase64")} />
        </PerInfoContainer>

        <ExperienceContainer>
          <ExpTitle>გამოცდილება</ExpTitle>
          {state.experiences.map(
            (
              { position, employer, start_date, due_date, description },
              idx
            ) => (
              <div key={idx}>
                <ExpEmp>
                  {position} , {employer}
                </ExpEmp>
                <ExpDate>
                  {start_date} -{due_date}
                </ExpDate>
                <ExpDesc>{description}</ExpDesc>
              </div>
            )
          )}
        </ExperienceContainer>
        <EducationLiveContainer>
          <EdTitle>განათლება</EdTitle>
          {watch("educations").map(
            ({ institute, degree_id, due_date, description }, idx) => (
              <div key={idx}>
                <Institute key={idx}>
                  {institute}
                  {degree_id}
                </Institute>
                <EdDate key={idx}>{due_date}</EdDate>
                <EdDescription key={idx}>{description}</EdDescription>
              </div>
            )
          )}
        </EducationLiveContainer>
      </LiveInfo>
    </EducationContainer>
  );
}
export default Education;

const EducationLiveContainer = styled.div``;

const BackToHome = styled.img`
  position: absolute;
  left: 48px;
`;

const EdTitle = styled.p`
  font-family: HelveticaNeue;
  color: #f93b1d;
  font-size: 18px;
  font-weight: 700;
  margin-top: 24px;
`;
const EdDescription = styled.p`
  font-size: 16px;
  color: #000;
  font-family: HelveticaNeue;
  margin-top: 16px;
  inline-size: 662x;
  overflow-wrap: break-word;
`;

const EdDate = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #909090;
  font-family: HelveticaNeue;
  margin-bottom: 16px;
`;
const Institute = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  font-family: HelveticaNeue;
  margin-bottom: 7px;
  margin-top: 15px;
`;
const ExpDesc = styled.p`
  font-size: 16px;
  color: #000;
  font-family: HelveticaNeue;
  margin-top: 16px;
  inline-size: 662x;
  overflow-wrap: break-word;
`;

const ExpTitle = styled.p`
  font-family: HelveticaNeue;
  color: #f93b1d;
  font-size: 18px;
  font-weight: 700;
  margin-top: 24px;
`;

const ExpDate = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #909090;
  font-family: HelveticaNeue;
  margin-bottom: 16px;
`;

const ExpEmp = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  font-family: HelveticaNeue;
  margin-bottom: 7px;
  margin-top: 15px;
`;

const EducationContainer = styled.div`
  display: grid;
  grid-template-columns: 1028px 900px;
`;

const ExperienceContainer = styled.div`
  padding-bottom: 20px;
  border-bottom: 1px solid #c8c8c8;
`;

const PerInfoContainer = styled.div`
  height: 300px;
  border-bottom: 1px solid #c8c8c8;
`;
const EducationInformation = styled.div`
  padding-left: 126px;
  padding-right: 126px;
  background-color: #f9f9f9;
`;
const EducationLive = styled.div``;

const LiveInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 0px;
  width: 822px;
  padding-top: 68px;
  padding-left: 80px;
`;

const EducationHeader = styled.div`
  display: flex;
  width: 798px;
  height: 48px;
  border-bottom: 1px solid #c1c1c1;
  align-items: center;
  padding-bottom: 12px;
  margin-top: 47px;
  justify-content: space-between;
`;

const EdHeading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  font-family: HelveticaNeue;
  color: #1a1a1a;
`;

const EdP = styled.p`
  font-size: 20px;
  font-family: HelveticaNeue;
  color: #1a1a1a;
`;

const EducationForm = styled.form`
  border-bottom: 1px solid #c1c1c1;
  width: 798px;
  padding-bottom: 50px;
  margin-bottom: 50px;
  margin-top: 69px;
`;

const InstituteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 122px;
  width: 846px;
  margin-top: 17px;
`;
const InputLabel = styled.label`
  color: #000;
  font-weight: 500;
  font-size: 16px;
  font-family: HelveticaNeue;
`;

const InstituteInput = styled.input`
  width: 798px;
  height: 48px;
  padding: 13px 16px;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.6);
`;

const InputParagraph = styled.p`
  font-size: 14px;
  font-family: HelveticaNeue;
  color: #2e2e2e;
`;

const DegreeAndDateContainer = styled.div`
  width: 846px;
  display: flex;
  gap: 56px;
  margin-top: 10px;
`;

const DegreeSelect = styled.select`
  width: 371px;
  height: 48px;
  border-radius: 4px;
`;

const DegreeOption = styled.option`
  font-size: 16px;
`;

const Degree = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const DegreeInput = styled.select`
  width: 371px;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  padding: 16px;
  font-family: HelveticaNeue;
`;

const EndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EndDateInput = styled.input`
  width: 371px;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  padding: 16px;
  font-family: HelveticaNeue;
`;

const EducationDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 25px;
  width: 846px;
`;

const TextAreaField = styled.textarea`
  resize: none;
  height: 179px;
  width: 798px;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.6);
  padding: 13px 16px 80px 16px;
  font-size: 16px;
  font-family: HelveticaNeue;
`;
const AppendButton = styled.button`
  width: 289px;
  height: 48px;
  background-color: #62a1eb;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  color: #fff;
  font-family: HelveticaNeue;
  font-weight: 500;
`;

const P = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #f93b1d;
  font-family: HelveticaNeue;
  margin-top: 34px;
  margin-bottom: 15px;
`;

const About = styled.p`
  font-size: 16px;
  font-weight: 400;
  font-family: HelveticaNeue;
  color: #000;
  inline-size: 440px;
  overflow-wrap: break-word;
`;

const Icon = styled.img``;

const Generic = styled.p`
  font-size: 18px;
  font-weight: 400px;
  color: #1a1a1a;
  font-family: HelveticaNeue;
`;
const UserImage = styled.img`
  outline: none;
  width: 246px;
  height: 246px;
  border-radius: 50%;
  position: absolute;
  left: 1530px;
  top: 80px;
`;

const NameSurname = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 17px;
`;
const Name = styled.p`
  font-size: 34px;
  font-weight: 700;
  font-family: HelveticaNeue;
  color: #f93b1d;
`;

const Box = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;
const RemoveBtn = styled.button`
  width: 140px;
  height: 30px;
  color: #fff;
  font-size: 16px;
  font-family: HelveticaNeue;
  border: none;
  margin-top: 10px;
  background-color: #ef5050;
  border-radius: 4px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 115px;
  width: 798;
  height: 48px;
  margin-bottom: 65px;
`;

const PreBtn = styled.button`
  color: #fff;
  font-size: 16px;
  font-family: HelveticaNeue;
  width: 113px;
  height: 48px;
  border: none;
  background-color: #6b40e3;
  border-radius: 4px;
`;

const NextBtn = styled.button`
  width: 151px;
  height: 48px;
  color: #fff;
  font-size: 16px;
  font-family: HelveticaNeue;
  border: none;
  background-color: #6b40e3;
  border-radius: 4px;
`;
