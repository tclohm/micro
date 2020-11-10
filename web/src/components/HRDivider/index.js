import styled from "styled-components";

const HRDivider = styled.hr`
  overflow: visible;
  padding: 0;
  margin: 2rem 0;
  border: none;
  border-top: 0.1rem solid #e0e0e0;
  color: #6e6d7a;
  text-align: center;
  width: 100%;

  ::after {
	content: 'or';
	display: inline-block;
	position: relative;
	top: -0.7rem;
	padding: 0 1.6rem;
	background: #fff;
  }
`

export default HRDivider;