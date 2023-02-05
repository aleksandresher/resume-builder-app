import styled from "styled-components";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import warLogo from "../assets/warning.png";
import { useEffect, useState } from "react";
import line from "../assets/Line.png";

function PersonalInfo() {
  const [file, setFile] = useState("");

  function uploadHandler(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    localStorage.setItem("image", file);
  }, [file]);
  const {
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  console.log(file);

  return (
    <PersonalInfoContainer>
      <InfoContainer>
        <div>
          <MainHeader>პირადი ინფო</MainHeader>
          <LineSecond src={line} />
        </div>
        <form>
          <NameLastNameBox>
            <InputBox>
              <InputLabel htmlFor="firstName">სახელი</InputLabel>
              <InputField
                type="text"
                placeholder="ანზორ"
                {...register("firstName", {
                  pattern: /^[ა-ჰ]+$/,
                  required: true,
                  minLength: { value: 2 },
                })}
              ></InputField>
              <InputParagraph>მინუმუმ 2 ასო, ქართული ასოები</InputParagraph>
            </InputBox>

            <InputBox>
              <InputLabel htmlFor="lasttName">გვარი</InputLabel>
              <InputField
                type="text"
                placeholder="მუმლაძე"
                {...register("lastName", {
                  pattern: /^[ა-ჰ]+$/,
                  required: true,
                  minLength: { value: 2 },
                })}
              ></InputField>
              <InputParagraph>მინუმუმ 2 ასო, ქართული ასოები</InputParagraph>
            </InputBox>
          </NameLastNameBox>

          <ImageContainer>
            <ImageInput
              className="fileUpload"
              type="file"
              name="imageupload"
              {...register("image")}
              onChange={uploadHandler}
              placeholder="aird"
            ></ImageInput>
          </ImageContainer>

          {/* <p>{errors.lastName ? <img src={warLogo} /> : ""}</p>
          <img src={file} /> */}
          <TextArea>
            <InputLabel>ჩემ შესახებ (არასავალდებულო)</InputLabel>
            <TextAreaField placeholder="ზოგადი ინფო შენ შესახებ"></TextAreaField>
          </TextArea>

          <EmailBox>
            <InputLabel>ელ.ფოსტა</InputLabel>
            <EmailInput
              type="email"
              placeholder="anzorr666@redberry.ge"
              {...register("email", {
                required: "This is required",
                validate: (value) =>
                  value.slice(-12) === "@redberry.ge" ||
                  "email must end with @redberry.ge",
              })}
            ></EmailInput>
            <InputParagraph>უნდა მთავრდებოდეს @redberry.ge-ით</InputParagraph>
          </EmailBox>

          <MobileBox>
            <InputLabel>მობილური ნომერი</InputLabel>
            <NumberInput
              type="number"
              placeholder="+995 551 12 34 56"
              {...register("mobile", {
                // valueAsNumber: true,
                pattern: {
                  value: /^(\+?995)?(79\d{7}|5\d{8})$/,
                  message: "invalid patern",
                },
              })}
            />
            <InputParagraph>
              უნდა აკმაყოფილებდეს ქართული ნომრის ფორმატს
            </InputParagraph>
          </MobileBox>
        </form>
      </InfoContainer>
      <LiveInfo></LiveInfo>
    </PersonalInfoContainer>
  );
}
export default PersonalInfo;

const MainHeader = styled.h1`
  font-size: 24px;
  margin-top: 47px;
  font-weight: 700;
  color: #1a1a1a;
  font-family: HelveticaNeue;
`;

const LineSecond = styled.img`
  width: 798px;
`;

const PersonalInfoContainer = styled.div`
  display: flex;
  width: 100%;
`;

const NameLastNameBox = styled.div`
  margin-top: 69px;
  display: flex;
  gap: 56px;
`;

const InfoContainer = styled.div`
  padding-left: 126px;
  padding-right: 126px;
  width: 1098px;
  background-color: #f9f9f9;
`;

const InputBox = styled.div`
  height: 122px;
  gap: 8px;
  display: flex;
  flex-direction: column;
`;

const EmailInput = styled.input`
  width: 798px;
  height: 48px;
  border: 1px solid #bcbcbc;
  border-radius: 4px;

   {
    ::placeholder {
      font-family: HelveticaNeue;
      font-size: 16px;
      padding-left: 16px;
      font-color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const InputField = styled.input`
  width: 371px;
  height: 48px;
  border: 1px solid #bcbcbc;
  border-radius: 4px;

   {
    ::placeholder {
      font-family: HelveticaNeue;
      font-size: 16px;
      padding-left: 16px;
    }
  }
`;

const LiveInfo = styled.div`
  width: 40%;
`;

const TextAreaField = styled.textarea`
  width: 798px;
  height: 106px;
  border: 1px solid #bcbcbc;
  border-radius: 4px;

   {
    ::placeholder {
      font-family: HelveticaNeue;
      font-size: 16px;
      padding-left: 16px;
      padding-top: 13px;
      font-color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const UserImage = styled.img`
  outline: none;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
const EmailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 122px;
  width: 798px;
  margin-top: 17px;
`;
const MobileBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 122px;
  width: 798px;
  margin-top: 13px;
`;

const ImageContainer = styled.div`
  margin-top: 46px;
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 41px;
`;

const NumberInput = styled.input`
  height: 48px;
  border: 1px solid #bcbcbc;
  border-radius: 4px;

   {
    ::placeholder {
      font-family: HelveticaNeue;
      font-size: 16px;
      padding-left: 16px;
      font-color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const ImageInput = styled.input``;

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
