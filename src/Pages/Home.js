import styled from "styled-components";
import redberry from "../assets/logo.png";
import line from "../assets/Line.png";
import logo2 from "../assets/logo2.png";

function Home() {
  return (
    <HomeContainer>
      <Redberry src={redberry} />
      <Line src={line} />
      <BackLogo src={logo2} />
      <ButtonBox>
        <ButtonText>რეზიუმეს დამატება</ButtonText>
      </ButtonBox>
    </HomeContainer>
  );
}
export default Home;

const HomeContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;

  align-items: center;
  justify-content: center;
`;

const ButtonBox = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 464px;
  height: 60px;
  border-radius: 8px;
  background-color: black;
`;
const Redberry = styled.img`
  position: absolute;
  top: 25px;
  left: 70px;
`;
const Line = styled.img`
  width: 90%;
  position: absolute;
  top: 89px;
  left: 70px;
`;
const ButtonText = styled.p`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  font-family: HelveticaNeue;
`;
const BackLogo = styled.img`
  position: absolute;
  top: 390px;
  left: 1100px;
`;
