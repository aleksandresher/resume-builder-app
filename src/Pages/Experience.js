import useFormPersist from "react-hook-form-persist";
import styled from "styled-components";
import { useFieldArray, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import { useContext } from "react";
import UserContext from "../context/userContext";

function Experience(props) {
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
      experience: [
        {
          position: "",
          employer: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    },
  });
  // const { actions, state } = useStateMachine({
  //   updateAction,
  // });

  // const user = watch("user");

  const { fields, append } = useFieldArray({ control, name: "experience" });

  // const { actions, state } = useStateMachine({
  //   updateAction,
  // });

  // const navigate = useNavigate();
  // const onSubmit = (data) => {
  //   actions.updateAction(data);
  //   navigate("/Education");
  //   // console.log(JSON.stringify(state, null, 2));
  // };

  useFormPersist("storage", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  const onSubmit = (values) => {
    // async request which may result error
    setData({ ...data, experience: values });
    console.log(values);
  };

  // console.log(watch("user"));

  // let userData = watch("user");
  // const experienceData = localStorage.getItem("storage");
  {
    /* <img src={props.image} /> */
  }
  return (
    <ExperienceContainer>
      <ExperienceInputs>
        <ExperienceHeader>
          <ExpHeading>გამოცდილება</ExpHeading>
          <ExpP>2/4</ExpP>
        </ExperienceHeader>

        {fields.map((field, index) => {
          return (
            <ExperienceForm key={field.id} onSubmit={handleSubmit(onSubmit)}>
              <PositionAndEmployerBox>
                <InputLabel htmlFor="firstName">თანამდებობა</InputLabel>
                <PositionAndEmployerInput
                  type="text"
                  placeholder="დეველოპერი, დიზაინერი, ა.შ"
                  {...register(`experience.${index}.position`, {
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
                  {...register(`experience.${index}.employer`, {
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
                    {...register(`experience.${index}.startDate`, {
                      required: true,
                    })}
                  />
                </StartDate>

                <EndDate>
                  <InputLabel>დამთავრების რიცხვი</InputLabel>
                  <EndDateInput
                    type="date"
                    {...register(`experience.${index}.endDate`, {
                      required: true,
                    })}
                  />
                </EndDate>
              </DateContainer>

              <JobDescription>
                <InputLabel>აღწერა</InputLabel>
                <TextAreaField
                  placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                  {...register(`experience.${index}.description`, {
                    required: true,
                  })}
                ></TextAreaField>
              </JobDescription>
              <button type="submit">click to console</button>
            </ExperienceForm>
          );
        })}

        <AppendButton type="button" onClick={() => append()}>
          მეტი გამოცდილების დამატება
        </AppendButton>

        <Buttons>
          <Link to={"/Personal"}>
            <PreBtn type="button">წინა</PreBtn>
          </Link>

          <Link to={"/Education"}>
            <NextBtn
              type="button"
              // onClick={() => props.updateUserData(experienceData)}
            >
              შემდეგი
            </NextBtn>
          </Link>
        </Buttons>
      </ExperienceInputs>
      {/* 
      <LiveInfo>
        {userData?.map(({ positin, employer, index }) => (
          <p key={employer}>{employer}</p>
        ))}

        <img src={props.file} />
      </LiveInfo> */}
    </ExperienceContainer>
  );
}
export default Experience;

const ExperienceContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const ExperienceInputs = styled.div`
  padding-left: 126px;
  padding-right: 126px;
  background-color: #f9f9f9;
`;

const LiveInfo = styled.div``;

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
