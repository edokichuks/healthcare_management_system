import styled from "styled-components";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;


function Logo() {

  const src= "/cardioll.png";
  return (
    <>
      
      <StyledLogo>
        <h2>Cardiol</h2>
        <Img src={src} alt="Logo" />
      </StyledLogo>
    </>
    
  );
}

export default Logo;
