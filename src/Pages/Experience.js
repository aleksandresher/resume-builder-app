import useFormPersist from "react-hook-form-persist";
import styled from "styled-components";
import { useFieldArray, useForm } from "react-hook-form";

function Experience(props) {
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
      user: [
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

  const { fields, append } = useFieldArray({ control, name: "user" });

  useFormPersist("storage", {
    watch,
    setValue,
    storage: window.localStorage,
  });

  {
    /* <img src={props.image} /> */
  }
  return (
    <div>
      <div>
        <ExperienceHeader>
          <ExpHeading>გამოცდილება</ExpHeading>
          <ExpP>2/4</ExpP>
        </ExperienceHeader>
        {fields.map((field, index) => {
          return (
            <ExperienceForm key={field.id}>
              <PositionAndEmployerBox>
                <InputLabel htmlFor="firstName">თანამდებობა</InputLabel>
                <PositionAndEmployerInput
                  type="text"
                  placeholder="დეველოპერი, დიზაინერი, ა.შ"
                  {...register(`user.${index}.position`, {
                    required: true,
                    minLength: { value: 2 },
                  })}
                ></PositionAndEmployerInput>

                <InputParagraph>მინუმუმ 2 სიმბოლო</InputParagraph>
              </PositionAndEmployerBox>
              <PositionAndEmployerBox>
                <InputLabel htmlFor="firstName">დამსაქმებელი</InputLabel>
                <PositionAndEmployerInput
                  type="text"
                  placeholder="დამსაქმებელი"
                  {...register(`user.${index}.employer`, {
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
                    {...register(`user.${index}.startDate`, {
                      required: true,
                    })}
                  />
                </StartDate>

                <EndDate>
                  <InputLabel>დამთავრების რიცხვი</InputLabel>
                  <EndDateInput
                    type="date"
                    {...register(`user.${index}.endDate`, {
                      required: true,
                    })}
                  />
                </EndDate>
              </DateContainer>

              <JobDescription>
                <InputLabel>აღწერა</InputLabel>
                <TextAreaField
                  placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                  {...register(`user${index}.description`, {
                    required: true,
                  })}
                ></TextAreaField>
              </JobDescription>
            </ExperienceForm>
          );
        })}
      </div>
      <AppendButton type="button" onClick={() => append()}>
        მეტი გამოცდილების დამატება
      </AppendButton>
    </div>
  );
}
export default Experience;

const ExperienceHeader = styled.div`
  display: flex;
  width: 798px;
  height: 48px;
  border-bottom: 1px solid #c1c1c1;
  align-items: center;
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
  border-bottom: 1px solid #c1c1c1;
  padding-bottom: 50px;
  margin-bottom: 50px;
`;

const PositionAndEmployerBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 122px;
  width: 798px;
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
