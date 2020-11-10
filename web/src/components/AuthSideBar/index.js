import styled from "styled-components";

const AuthSidebar = styled.section`
  background: ${props => props.inputSidebarColor || '#4d4891'};
  color: #fff;
  height: 100vh;
  width: 32rem;

  @media (max-width: 1350px) {
  	width: 28rem;
  }

  @media (max-width: 1250px) {
  	display: none;
  }
`

export default AuthSidebar;