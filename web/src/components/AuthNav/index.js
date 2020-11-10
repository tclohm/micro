import styled from "styled-components";

const AuthNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 0;
  padding: 3rem 3rem 0;
  width: 100%;

  @media (max-width: 1350px) {
  	width: 80%;
  }

  @media (max-width: 1250px) {
  	width: 75%;
  }

  @media (max-width: 500px) {
    justify-content: flex-start;
    padding: 3rem 2rem;
  }
`

export default AuthNav;