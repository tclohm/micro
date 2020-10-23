import { Button } from "grommet";
import styled from "styled-components";

export const StyledAccentButton = styled(Button)`
  display: inline-block;
  border-radius: 0.3rem;
  height: ${props => props.inputHeight || 'auto'};
  width: ${props => props.inputWidth || 'auto'};
  padding: ${props => props.inputPadding || '0.5rem 0'};
  margin: ${props => props.inputMargin || '0 1rem 0 1rem' };
  width: ${props => props.inputWidth || '11rem'};
  background: ${props => props.inputBGColor || 'lightgray'};
  color: ${props => props.inputColor || 'gray'};
  font-size: 0.85rem;
  border: ${props => props.inputBorder || '2px solid lightgray'};

  :hover {
    background: ${props => props.inputHoverColor || 'gray'};
    box-shadow: ${props => `0 0 0 0px ${props.inputHoverColor}` || 'gray'};
    border-color: ${props => props.inputHoverColor || 'gray'};
    cursor: pointer;
  }
`;

export default StyledAccentButton;