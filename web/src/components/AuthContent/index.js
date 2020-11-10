import styled from "styled-components";

const AuthContent = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 3rem 6rem 0;
	margin: 2rem 0 0 0;
	width: 70%;

	@media (max-width: 500px) {
  		width: 55%;
  		margin: 2rem;
  		padding: 0;
  	}
`;

export default AuthContent;