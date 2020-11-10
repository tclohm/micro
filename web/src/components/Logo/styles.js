import { Heading } from "grommet";
import styled from "styled-components";

const StyledLogo = styled(Heading)`
	font-family: 'Gilbert color';
    font-size: ${props => props.inputFontSize || '5rem' };
    text-decoration: none;
`;

export default StyledLogo;