import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

import UserContext from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";

function Education({ imageFile }) {
  const { actions, state } = useStateMachine({
    updateAction,
  });
  console.log(imageFile);

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

  const { data, setData } = useContext(UserContext);
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

  const { fields, append } = useFieldArray({ control, name: "educations" });

  useFormPersist("education", {
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
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }
  return (
    <EducationContainer>
      <EducationInformation>
        <EducationHeader>
          <EdHeading>განათლება</EdHeading>
          {/* <button type="button" onClick={updateData}>
            click to update
          </button> */}
          <EdP>2/4</EdP>
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
              <button type="submit">click to console</button>
            </EducationForm>
          );
        })}
        <AppendButton type="button" onClick={() => append()}>
          სხვა სასწავლებლის დამატება
        </AppendButton>
        <button type="button" onClick={handleSending}>
          send Data
        </button>
      </EducationInformation>
      <EducationLive></EducationLive>
    </EducationContainer>
  );
}
export default Education;

const EducationContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;
const EducationInformation = styled.div`
  padding-left: 126px;
  padding-right: 126px;
  background-color: #f9f9f9;
`;
const EducationLive = styled.div``;

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
