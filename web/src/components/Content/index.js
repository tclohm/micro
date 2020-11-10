import styled from "styled-components";

const Content = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	overflow: auto;
	width: 60rem;
	height: 100vh;

	@media (max-width: 1350px) {
  		width: 55rem;
  	}

  	@media (max-width: 1250px) {
  		width: 100vw;
  	}

  	@media (max-width: 500px) {
  		width: 40rem;
  		align-items: start;
  	}

    @media (max-width: 400px) {
      width: 35rem;
    }
`

export default Content;