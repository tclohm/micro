import { Anchor } from "grommet";
import styled from "styled-components";

const StyledAccentAnchor = styled(Anchor)`
	font-family: Gilbert;
	color: ${props => props.inputColor || 'gray'};
`;

export default StyledAccentAnchor;