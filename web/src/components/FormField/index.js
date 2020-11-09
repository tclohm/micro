import styled from "styled-components";

const FormField = styled.div`
  position: relative;
  width: ${props => props.inputWidth || '48%'};
  display: flex;
  flex-direction: column;
`;

export default FormField;