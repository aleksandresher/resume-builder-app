import styled from "styled-components";
import email_icon from "../assets/emailIcon.png";
import mobile_icon from "../assets/MobIcon.png";
import { useId } from "react";

function ResultPage({ resultData }) {
  const randomId = useId();
  return (
    <div>
      {resultData ? (
        <CVContainer>
          <PerInfoContainer>
            <NameSurname>
              <UserImage
                src={`https://resume.redberryinternship.ge${resultData.image}`}
              />
              <Name>{resultData.name}</Name>
              <Surname>{resultData.surname}</Surname>
            </NameSurname>
            <EmailContainer>
              <EmailIcon src={email_icon} />
              <Email>{resultData.email}</Email>
            </EmailContainer>
            <NumberContainer>
              <NumberIcon src={mobile_icon} />
              <Number>{resultData.phone_number}</Number>
            </NumberContainer>
            <AboutMe>
              <MeHeader>ჩემ შესახებ</MeHeader>
              <MeText>{resultData.about_me}</MeText>
            </AboutMe>
          </PerInfoContainer>

          <Experience>
            <ExpHeader>გამოცდილება</ExpHeader>
            {resultData.experiences.map(
              ({
                index,
                position,
                employer,
                start_date,
                due_date,
                description,
              }) => (
                <div key={Math.random()}>
                  <PositionAndEmployer key={Math.random()}>
                    <Position key={Math.random()}>{position},</Position>
                    <Employer key={Math.random()}>{employer}</Employer>
                  </PositionAndEmployer>

                  <Date key={Math.random()}>
                    {start_date} - {due_date}
                  </Date>

                  <ExpDescription key={Math.random()}>
                    {description}
                  </ExpDescription>
                </div>
              )
            )}
          </Experience>

          <Experience>
            <ExpHeader>განათლება</ExpHeader>
            {resultData.educations.map(
              ({ index, institute, degree_id, due_date, description }) => (
                <div key={Math.random()}>
                  <PositionAndEmployer key={Math.random()}>
                    <Position key={Math.random()}>{institute},</Position>
                    <Employer key={Math.random()}>{degree_id}</Employer>
                  </PositionAndEmployer>

                  <Date key={Math.random()}>{due_date}</Date>

                  <ExpDescription key={Math.random()}>
                    {description}
                  </ExpDescription>
                </div>
              )
            )}
          </Experience>
        </CVContainer>
      ) : (
        ""
      )}
    </div>
  );
}
export default ResultPage;

const CVContainer = styled.div`
  width: 822px;
  height: 1080px;
  border: 0.8px solid #000000;
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 68px;
`;

const PerInfoContainer = styled.div`
  width: 662px;
  border-bottom: 1px solid #c8c8c8;
`;

const NameSurname = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const EmailContainer = styled.div`
  display: flex;
  margin-top: 17px;
  gap: 10px;
  align-items: center;
`;

const NumberContainer = styled.div`
  display: flex;
  margin-top: 17px;
  gap: 10px;
  align-items: center;
`;

const NumberIcon = styled.img``;
const Number = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #1a1a1a;
  font-family: HelveticaNeue;
`;

const Name = styled.p`
  font-family: HelveticaNeue;
  color: #f93b1d;
  font-size: 34px;
  font-weight: 700;
`;
const Surname = styled.p`
  font-family: HelveticaNeue;
  color: #f93b1d;
  font-size: 34px;
  font-weight: 700;
`;

const Email = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #1a1a1a;
  font-family: HelveticaNeue;
`;
const EmailIcon = styled.img``;

const AboutMe = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;

  gap: 15px;
  margin-top: 34px;
  margin-bottom: 19px;
  max-width: 65ch;
`;

const MeHeader = styled.p`
  font-family: HelveticaNeue;
  color: #f93b1d;
  font-size: 18px;
  font-weight: 700;
`;
const MeText = styled.p`
  font-size: 16px;
  font-weight: 400;
  font-family: HelveticaNeue;
  color: #000;
  inline-size: 440px;
  overflow-wrap: break-word;
`;

const Experience = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  padding-bottom: 32px;
  border-bottom: 1px solid #c8c8c8;
`;
const ExpHeader = styled.p`
  font-family: HelveticaNeue;
  color: #f93b1d;
  font-size: 18px;
  font-weight: 700;
`;

const PositionAndEmployer = styled.div`
  display: flex;
  gap: 7px;
  margin-bottom: 7px;
`;

const Position = styled.p`
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;
  font-family: HelveticaNeue;
`;

const Employer = styled.p`
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 500;
  font-family: HelveticaNeue;
`;

const Date = styled.p`
  font-size: 16px;
  color: #909090;
  style: italic;
  font-weight: 400;
  font-family: HelveticaNeue;
  margin-top: 7px;
`;

const ExpDescription = styled.p`
  font-size: 16px;
  color: #000;
  font-family: HelveticaNeue;
  margin-top: 16px;
  inline-size: 662x;
  overflow-wrap: break-word;
`;

const UserImage = styled.img`
  width: 246px;
  height: 246px;
  border-radius: 50%;
  position: absolute;
  top: 48px;
  left: 500px;
  object-fit: fill;
`;
