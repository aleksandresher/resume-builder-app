import styled from "styled-components";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import warLogo from "../assets/warning.png";
import { useEffect, useState } from "react";
import line from "../assets/Line.png";
import sucLogo from "../assets/success.png";
import { validate } from "graphql";
import { Link } from "react-router-dom";

function PersonalInfo({ file, changeHandler, updateUserData }) {
  // const [file, setFile] = useState("");

  // function uploadHandler(e) {
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  // useEffect(() => {
  //   localStorage.setItem("image", JSON.stringify(file));
  // }, [file]);

  const {
    register,
    watch,
    setValue,
    getValues,
    getFieldState,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  useFormPersist("storageKey", {
    watch,
    setValue,
    storage: window.localStorage, // default window.sessionStorage
    exclude: ["baz"],
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };

  // const imageMimeType = /image\/(png|jpg|jpeg)/i;

  // const [file, setFile] = useState(null);
  // const [fileDataURL, setFileDataURL] = useState(null);

  // const changeHandler = (e) => {
  //   const file = e.target.files[0];
  //   if (!file.type.match(imageMimeType)) {
  //     alert("Image mime type is not valid");
  //     return;
  //   }
  //   setFile(file);
  // };
  // useEffect(() => {
  //   let fileReader,
  //     isCancel = false;
  //   if (file) {
  //     fileReader = new FileReader();
  //     fileReader.onload = (e) => {
  //       const { result } = e.target;
  //       if (result && !isCancel) {
  //         setFileDataURL(result);
  //         localStorage.setItem("image", result);
  //       }
  //     };
  //     fileReader.readAsDataURL(file);
  //   }
  //   return () => {
  //     isCancel = true;
  //     if (fileReader && fileReader.readyState === 1) {
  //       fileReader.abort();
  //     }
  //   };
  // }, [file]);

  // const data = localStorage.getItem("storageKey");

  return (
    <PersonalInfoContainer>
      <InfoContainer onSubmit={handleSubmit(onSubmit)}>
        <PersonalHeading>
          <MainHeader>პირადი ინფო</MainHeader>
          <PerP>1/4</PerP>
          {/* <button onClick={() => updateUserData(data)} type="button">
            hhhhhh
          </button> */}
        </PersonalHeading>

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
          <ImageLabel>პირადი ფოტოს ატვირთვა</ImageLabel>
          <label htmlFor="imageUpload">
            ატვირთვა
            <ImageInput
              id="imageUpload"
              className="fileUpload"
              type="file"
              name="imageupload"
              {...register("image")}
              onChange={changeHandler}
              placeholder="aird"
            ></ImageInput>
          </label>
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
            first={errors.email?.message}
            second={getFieldState("email").isDirty}
            type="email"
            placeholder="anzorr666@redberry.ge"
            {...register("email", {
              required: "This is required",
              validate: (value) =>
                value.slice(-12) === "@redberry.ge" ||
                "email must end with @redberry.ge",
            })}
          ></EmailInput>

          {errors.email ? <EmailError src={warLogo} /> : ""}
          {getFieldState("email").invalid || !getFieldState("email").isDirty ? (
            ""
          ) : (
            <EmailSuccess src={sucLogo} />
          )}

          <InputParagraph>უნდა მთავრდებოდეს @redberry.ge-ით</InputParagraph>
        </EmailBox>

        <MobileBox>
          <InputLabel>მობილური ნომერი</InputLabel>
          <NumberInput
            type="number"
            first={getFieldState("mobile").invalid}
            second={!getFieldState("mobile").isDirty}
            placeholder="+995 551 12 34 56"
            {...register("mobile", {
              // valueAsNumber: true,
              pattern: {
                value: /^(\+?995)?(79\d{7}|5\d{8})$/,
                message: "invalid patern",
              },
            })}
          />
          {errors.mobile ? <NumberError src={warLogo} /> : ""}
          {getFieldState("mobile").invalid ||
          !getFieldState("mobile").isDirty ? (
            ""
          ) : (
            <NumberSuccess src={sucLogo} />
          )}
          <InputParagraph>
            უნდა აკმაყოფილებდეს ქართული ნომრის ფორმატს
          </InputParagraph>
        </MobileBox>

        <NextButton>
          <Link to={"/Experience"}>
            <NextPage type="button">შემდეგი</NextPage>
          </Link>
        </NextButton>
        <button type="submit">click</button>
      </InfoContainer>
      <LiveInfo>
        <p>{watch("firstName")}</p>
        <p>{watch("lastName")}</p>
        <p>{watch("email")}</p>
        <p>{watch("mobile")}</p>
        <UserImage src={file} />
      </LiveInfo>
    </PersonalInfoContainer>
  );
}
export default PersonalInfo;

const NextButton = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  width: 798px;
  justify-content: end;
`;

const PersonalHeading = styled.div`
  display: flex;
  width: 798px;
  border-bottom: 1px solid #c1c1c1;
  margin-top: 47px;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
`;

const MainHeader = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  font-family: HelveticaNeue;
`;
const PerP = styled.p`
  font-size: 20px;
  font-weight: 400;
  color: #1a1a1a;
  font-family: HelveticaNeue;
`;

const PersonalInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const NameLastNameBox = styled.div`
  margin-top: 69px;
  display: flex;
  gap: 56px;
`;

const EmailError = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 37px;
  left: 815px;
`;

const NumberError = styled.img`
  width: 24px;
  height: 24px;
  position: absolute;
  top: 720px;
  left: 945px;
`;

const EmailSuccess = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 40px;
  left: 775px;
`;

const NumberSuccess = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 725px;
  left: 900px;
`;

const InfoContainer = styled.form`
  padding-left: 126px;
  padding-right: 126px;
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
  font-size: 16px;
  font-family: HelveticaNeue;
  color: #000000;
      padding-left: 16px;
  border: 2px solid
    ${(props) => (props.first || props.second ? "#EF5050" : "green")};

  border-radius: 4px;

   {
    ::placeholder {
      font-family: HelveticaNeue;
      font-size: 16px;
      font-color: rgba(0, 0, 0, 0.6);
    }
  }

   {
    &:focus {
      border: 2px solid #ebebeb;
        
  }
`;

const InputField = styled.input`
  width: 371px;
  padding-left: 16px;
  font-family: HelveticaNeue;
  font-size: 16px;
  color: #000;
  height: 48px;
  border: 1px solid #bcbcbc;
  border-radius: 4px;

   {
    ::placeholder {
      font-family: HelveticaNeue;
      font-size: 16px;
    }
  }
`;

const LiveInfo = styled.div``;

const TextAreaField = styled.textarea`
  width: 798px;
  height: 106px;
  border: 1px solid #bcbcbc;
  padding-left: 16px;
  padding-top: 13px;
  font-family: HelveticaNeue;
  font-size: 16px;
  color: #000;
  border-radius: 4px;
  resize: none;

   {
    ::placeholder {
      font-family: HelveticaNeue;
      font-size: 16px;
      font-color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const UserImage = styled.img`
  outline: none;
  width: 246px;
  height: 246px;
  border-radius: 50%;
`;
const EmailBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 122px;
  width: 798px;
  margin-top: 17px;
  position: relative;
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
  display: flex;
  align-items: center;
  gap: 19px;
  margin-top: 46px;
`;
const ImageLabel = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
  font-family: HelveticaNeue;
`;

const ImgUploadBtn = styled.button`
  width: 107px;
  height: 27px;
  border-radius: 4px;
  border: none;
  background-color: #0e80bf;
  color: #fff;
  font-family: HelveticaNeue;
  font-size: 14px;
`;
const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 41px;
  margin-bottom: 20px;
`;

const NumberInput = styled.input`
  position: relative;
  font-size: 18px;
  font-weight: 400;
  font-family: HelveticaNeue;
  color: #1a1a1a;
  padding-left: 16px;
  height: 48px;
  border: 1px solid #bcbcbc;
  border-radius: 4px;

   {
    ::placeholder {
      font-family: HelveticaNeue;
      font-size: 16px;
      font-color: rgba(0, 0, 0, 0.6);
    }
  }
`;

const ImageInput = styled.input`
  display: none;
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

const NextPage = styled.button`
  width: 151px;
  height: 48px;
  border: none;
  background-color: #6b40e3;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  font-family: HelveticaNeue;
`;
