import { useState } from "react";
import styled from "styled-components";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import Select from "react-select";

function Education() {
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
          degree: "",
          due_date: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({ control, name: "educations" });

  useFormPersist("storage", {
    watch,
    setValue,
    storage: window.localStorage,
  });
  const [degree, setDegree] = useState();
  const [error, setError] = useState();

  //   console.log(degree);
  //   console.log(error);

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
    } catch (error) {
      setError(error.message);
    }
  }
  console.log(degree);

  return (
    <EducationContainer>
      <EducationInformation>
        <EducationHeader>
          <EdHeading>განათლება</EdHeading>
          <EdP>2/4</EdP>
        </EducationHeader>

        {fields.map((field, index) => {
          return (
            <EducationForm key={field.id}>
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

              <DegreeAndDateContainer>
                <Degree>
                  <InputLabel>ხარისხი</InputLabel>
                  <select
                    onClick={getDegree}
                    {...register(`educations.${index}.degree`)}
                  >
                    <option value="">აირჩიე ხარისხი</option>
                    {degree?.map(({ id, title }) => (
                      <option key={id} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
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
                  {...register(`educations${index}.description`, {
                    required: true,
                  })}
                ></TextAreaField>
              </EducationDescription>
            </EducationForm>
          );
        })}
        <AppendButton type="button" onClick={() => append()}>
          სხვა სასწავლებლის დამატება
        </AppendButton>
      </EducationInformation>
      <EducationLive></EducationLive>
    </EducationContainer>
  );
}
export default Education;

const EducationContainer = styled.div`
  display: flex;
  width: 100%;
`;
const EducationInformation = styled.div`
  padding-left: 126px;
  padding-right: 126px;
  width: 1098px;
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
