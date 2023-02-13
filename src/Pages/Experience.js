import useFormPersist from "react-hook-form-persist";
import styled from "styled-components";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import email_icon from "../assets/emailIcon.png";
import mobile_icon from "../assets/MobIcon.png";
import arrow from "../assets/arrow.png";

import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";

function Experience(updateUserData, file) {
  const { actions, state } = useStateMachine({
    updateAction,
  });

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
      experiences: [
        {
          position: "",
          employer: "",
          start_date: "",
          due_date: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  useFormPersist("storage", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  const navigate = useNavigate();

  const onSubmit = (values) => {
    navigate("/Education");
    actions.updateAction(values);
  };

  let exp = watch("experiences");

  const test = localStorage.getItem("storage");

  function clearStorage() {
    localStorage.clear("storageKey");
    localStorage.clear("storage");
    navigate("/");
  }

  return (
    <ExperienceContainer>
      <ExperienceInputs>
        <ExperienceHeader>
          <BackToHome src={arrow} onClick={clearStorage} />
          <ExpHeading>გამოცდილება</ExpHeading>
          <ExpP>2/4</ExpP>
        </ExperienceHeader>

        {fields.map((field, index) => {
          return (
            <ExperienceForm
              key={field.id}
              onSubmit={handleSubmit(onSubmit)}
              id="myform"
            >
              <PositionAndEmployerBox>
                <InputLabel htmlFor="firstName">თანამდებობა</InputLabel>
                <PositionAndEmployerInput
                  type="text"
                  placeholder="დეველოპერი, დიზაინერი, ა.შ"
                  {...register(`experiences.${index}.position`, {
                    required: true,
                    minLength: { value: 2, message: "error in value" },
                  })}
                ></PositionAndEmployerInput>
                <InputParagraph>მინუმუმ 2 სიმბოლო</InputParagraph>
              </PositionAndEmployerBox>
              <PositionAndEmployerBox>
                <InputLabel htmlFor="firstName">დამსაქმებელი</InputLabel>
                <PositionAndEmployerInput
                  type="text"
                  placeholder="დამსაქმებელი"
                  {...register(`experiences.${index}.employer`, {
                    required: true,
                    minLength: { value: 2 },
                  })}
                ></PositionAndEmployerInput>
                <InputParagraph>მინუმუმ 2 სიმბოლო</InputParagraph>
              </PositionAndEmployerBox>

              <DateContainer>
                <StartDate>
                  <InputLabel>დაწყების რიცხვი</InputLabel>
                  <StartDateInput
                    type="date"
                    {...register(`experiences.${index}.start_date`, {
                      required: true,
                    })}
                  />
                </StartDate>

                <EndDate>
                  <InputLabel>დამთავრების რიცხვი</InputLabel>
                  <EndDateInput
                    type="date"
                    {...register(`experiences.${index}.due_date`, {
                      required: true,
                    })}
                  />
                </EndDate>
              </DateContainer>

              <JobDescription>
                <InputLabel>აღწერა</InputLabel>
                <TextAreaField
                  placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                  {...register(`experiences.${index}.description`, {
                    required: true,
                  })}
                ></TextAreaField>
              </JobDescription>
              {/* <button type="submit">click to console</button> */}
              <RemoveBtn type="button" onClick={() => remove(index)}>
                ფორმის წაშლა
              </RemoveBtn>
            </ExperienceForm>
          );
        })}

        <AppendButton type="button" onClick={() => append()}>
          მეტი გამოცდილების დამატება
        </AppendButton>

        <Buttons>
          <Link to={"/Personal"}>
            <PreBtn type="button">უკან</PreBtn>
          </Link>

          {/* <Link to={"/Education"}> */}
          <NextBtn
            type="submit"
            form="myform"
            // onClick={() => updateUserData(experienceData)}
          >
            შემდეგი
          </NextBtn>
          {/* </Link> */}
        </Buttons>
      </ExperienceInputs>
      <LiveInfo>
        <PersonalInfo>
          <NameSurname>
            <Name>{state.name}</Name>
            <Name>{state.surname}</Name>
          </NameSurname>
          <Box>
            <Icon src={email_icon} />
            <Generic>{state.email}</Generic>
            {/* <p>{state.educations.description}</p> */}
          </Box>

          <Box>
            <Icon src={mobile_icon} />
            <Generic>{state.phone_number}</Generic>
          </Box>

          {state.about_me ? <P>ჩემ შესახებ</P> : ""}
          <About>{state.about_me}</About>

          <UserImage src={localStorage.getItem("imageBase64")} />
        </PersonalInfo>
        <ExperienceLive>
          <ExpHeader>გამოცდილება</ExpHeader>
          {watch("experiences").map(
            (
              { index, position, employer, start_date, due_date, description },
              idx
            ) => (
              <Exp key={idx}>
                <PosAndEmp key={idx}>
                  {position}, {employer}
                </PosAndEmp>
                <DateBox key={idx}>
                  {start_date} - {due_date}
                </DateBox>
                <p>{description}</p>
              </Exp>
            )
          )}
        </ExperienceLive>
      </LiveInfo>
    </ExperienceContainer>
  );
}
export default Experience;

const BackToHome = styled.img`
  position: absolute;
  left: 48px;
`;

const ExperienceContainer = styled.div`
  display: grid;
  grid-template-columns: 1028px 900px;
`;

const ExperienceInputs = styled.div`
  padding-left: 126px;
  padding-right: 126px;
  background-color: #f9f9f9;
`;

const LiveInfo = styled.div`
  margin-right: 0px;
  width: 822px;
  padding-top: 68px;
  padding-left: 80px;
  padding-bottom: 80px;
`;

const ExperienceHeader = styled.div`
  display: flex;
  width: 798px;
  height: 48px;
  border-bottom: 1px solid #c1c1c1;
  align-items: center;
  padding-bottom: 12px;
  margin-top: 47px;
  justify-content: space-between;
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

const ExpHeading = styled.h1`
  font-size: 24px;
  font-weight: 700;
  font-family: HelveticaNeue;
  color: #1a1a1a;
`;

const ExpP = styled.p`
  font-size: 20px;
  font-family: HelveticaNeue;
  color: #1a1a1a;
`;

const ExperienceForm = styled.form`
  width: 798px;
  border-bottom: 1px solid #c1c1c1;
  padding-bottom: 50px;
  margin-bottom: 50px;
  margin-top: 69px;
`;

const PositionAndEmployerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 122px;
  width: 846px;
  margin-top: 17px;
`;

const PositionAndEmployerInput = styled.input`
  width: 798px;
  height: 48px;
  padding: 13px 16px;
  color: rgba(0, 0, 0, 0.6);
 
 
  font-size: 16px;
  font-family: HelveticaNeue;
    // ${(props) => (props.first && props.second ? "#EF5050" : "#ebebeb")};

  border-radius: 4px;

   {
    ::placeholder {
      font-family: HelveticaNeue;
      font-size: 16px;
      
      font-color: rgba(0, 0, 0, 0.6);
    }
  }

//    {
//     &:focus {
//       border: 2px solid #ebebeb;
        
//   }
`;

const InputLabel = styled.label`
  color: #000;
  font-weight: 500;
  font-size: 16px;
  font-family: HelveticaNeue;
`;

const InputParagraph = styled.p`
  font-size: 14px;
  font-family: HelveticaNeue;
  color: #2e2e2e;
`;

const DateContainer = styled.div`
  width: 846px;
  display: flex;
  gap: 56px;
  margin-top: 10px;
`;

const StartDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EndDate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const StartDateInput = styled.input`
  width: 371px;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  padding: 16px;
  font-family: HelveticaNeue;
`;

const EndDateInput = styled.input`
  width: 371px;
  height: 48px;
  border-radius: 4px;
  font-size: 16px;
  padding: 16px;
  font-family: HelveticaNeue;
`;

const JobDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 25px;
  width: 846px;
`;
const TextAreaField = styled.textarea`
  resize: none;
  height: 123px;
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

const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #c8c8c8;
  height: 360px;
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
const Company = styled.p``;

const ExperienceLive = styled.div``;

const Exp = styled.div`
  margin-bottom: 15px;
  padding-bottom: 30px;
`;

const ExpHeader = styled.p`
  font-family: HelveticaNeue;
  color: #f93b1d;
  font-size: 18px;
  font-weight: 700;
  margin-top: 24px;
`;

const PosAndEmp = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  font-family: HelveticaNeue;
  margin-bottom: 7px;
  margin-top: 15px;
`;

const DateBox = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #909090;
  font-family: HelveticaNeue;
  margin-bottom: 16px;
`;
