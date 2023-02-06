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
          startDate: 0,
          endDate: 0,
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
      <form>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <PositionAndEmployerBox>
                <InputLabel htmlFor="firstName">თანამდებობა</InputLabel>
                <PositionAndEmployerInput
                  type="text"
                  placeholder="დეველოპერი, დიზაინერი, ა.შ"
                  {...register(`user.${index}.position`, {
                    required: true,
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
                  })}
                ></PositionAndEmployerInput>

                <InputParagraph>მინუმუმ 2 სიმბოლო</InputParagraph>
              </PositionAndEmployerBox>
            </div>
          );
        })}
        <button type="button" onClick={() => append()}>
          მეტი გამოცდილების დამატება
        </button>
      </form>
    </div>
  );
}
export default Experience;

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
  border: 2px solid
    ${(props) => (props.first && props.second ? "#EF5050" : "#ebebeb")};

  border-radius: 4px;

   {
    ::placeholder {
      font-family: HelveticaNeue;
      font-size: 16px;
      padding-left: 16px;
      font-color: rgba(0, 0, 0, 0.6);
    }
  }

   {
    &:focus {
      border: 2px solid #ebebeb;
        
  }
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
